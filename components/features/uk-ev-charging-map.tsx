import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuantumCard } from "@/components/ui/quantum-card";
import { 
  MapPin, 
  Navigation, 
  Zap, 
  Loader2,
  Search,
  Locate
} from "lucide-react";

// Load Leaflet dynamically
declare global {
  interface Window {
    L: any;
  }
}

interface ChargingStation {
  id: string;
  title: string;
  address: string;
  postcode: string;
  latitude: number;
  longitude: number;
  network: string;
  connections: any[];
  distance?: number;
}

export function UKEVChargingMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [stations, setStations] = useState<ChargingStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const markersRef = useRef<any[]>([]);

  const OPEN_CHARGE_MAP_API_KEY = "366c64cb-0102-427f-acd2-b642d96cd3b9";

  // Load Leaflet CSS and JS
  useEffect(() => {
    const loadLeaflet = async () => {
      if (window.L) return;

      // Load CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(cssLink);

      // Load JS
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        initializeMap();
      };
      document.head.appendChild(script);
    };

    loadLeaflet();
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || map) return;

    // Default to London coordinates
    const defaultLat = 51.5074;
    const defaultLng = -0.1278;

    const newMap = window.L.map(mapRef.current).setView([defaultLat, defaultLng], 11);
    
    // Add OpenStreetMap tiles
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(newMap);

    setMap(newMap);
    fetchChargingStations(defaultLat, defaultLng, newMap);
  };

  const fetchChargingStations = async (lat: number, lng: number, mapInstance?: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://api.openchargemap.io/v3/poi?key=${OPEN_CHARGE_MAP_API_KEY}&latitude=${lat}&longitude=${lng}&distance=25&maxresults=100&compact=true&verbose=false`
      );
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      const transformedStations: ChargingStation[] = data
        .filter((station: any) => station.AddressInfo?.Latitude && station.AddressInfo?.Longitude)
        .map((station: any) => ({
          id: station.ID?.toString() || Math.random().toString(),
          title: station.AddressInfo?.Title || "Charging Station",
          address: station.AddressInfo?.AddressLine1 || "",
          postcode: station.AddressInfo?.Postcode || "",
          latitude: station.AddressInfo.Latitude,
          longitude: station.AddressInfo.Longitude,
          network: station.OperatorInfo?.Title || "Unknown",
          connections: station.Connections || [],
          distance: station.Distance
        }));
      
      setStations(transformedStations);
      
      if (mapInstance || map) {
        addMarkersToMap(transformedStations, mapInstance || map);
      }
    } catch (err) {
      console.error("Failed to fetch charging stations:", err);
      setError("Failed to load charging stations from Open Charge Map API");
    } finally {
      setLoading(false);
    }
  };

  const addMarkersToMap = (stationData: ChargingStation[], mapInstance: any) => {
    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstance.removeLayer(marker);
    });
    markersRef.current = [];

    // Add new markers
    stationData.forEach(station => {
      const maxPower = station.connections.length > 0 
        ? Math.max(...station.connections.map((c: any) => c.PowerKW || 0))
        : 0;
      
      const connectorTypes = station.connections
        .map((c: any) => c.ConnectionType?.Title)
        .filter(Boolean)
        .join(", ");

      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold;">${station.title}</h3>
          <p style="margin: 4px 0; color: #666;">${station.address}</p>
          ${station.postcode ? `<p style="margin: 4px 0; color: #666;">${station.postcode}</p>` : ''}
          <p style="margin: 4px 0;"><strong>Network:</strong> ${station.network}</p>
          ${maxPower > 0 ? `<p style="margin: 4px 0;"><strong>Max Power:</strong> ${maxPower}kW</p>` : ''}
          ${connectorTypes ? `<p style="margin: 4px 0;"><strong>Connectors:</strong> ${connectorTypes}</p>` : ''}
          <div style="margin-top: 8px;">
            <a href="https://www.openchargemap.org/site/poi/${station.id}" target="_blank" style="color: #0066cc; text-decoration: none;">View Details</a>
          </div>
        </div>
      `;

      const marker = window.L.marker([station.latitude, station.longitude])
        .addTo(mapInstance)
        .bindPopup(popupContent);
      
      markersRef.current.push(marker);
    });
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserLocation({ lat, lng });
        
        if (map) {
          map.setView([lat, lng], 12);
          fetchChargingStations(lat, lng);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        setError("Unable to get your location. Using London as default.");
        setLoading(false);
      }
    );
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    try {
      setLoading(true);
      // Use Nominatim for geocoding UK locations
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}&countrycodes=gb&limit=1`
      );
      
      const data = await response.json();
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        
        if (map) {
          map.setView([lat, lng], 12);
          fetchChargingStations(lat, lng);
        }
      } else {
        setError("Location not found. Please try a different search term.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      setError("Failed to search location");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          UK EV Charging Map
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Interactive map showing live charging stations across the UK powered by Open Charge Map
        </p>
        {error && (
          <div className="mt-2 text-yellow-600 dark:text-yellow-400 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Controls */}
      <QuantumCard className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex gap-2">
            <Input
              placeholder="Search UK location (e.g., Manchester, M1 1AA)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch}
              disabled={loading || !searchTerm.trim()}
              className="px-4"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            onClick={getUserLocation}
            disabled={loading}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Locate className="h-4 w-4" />
            Use My Location
          </Button>
        </div>
      </QuantumCard>

      {/* Map Container */}
      <QuantumCard className="p-0 overflow-hidden">
        <div className="relative">
          {loading && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-[hsl(var(--quantum-500))]" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Loading stations...</span>
            </div>
          )}
          <div 
            ref={mapRef} 
            className="w-full h-[500px] bg-slate-100 dark:bg-slate-800"
            style={{ minHeight: '500px' }}
          />
        </div>
      </QuantumCard>

      {/* Station Count */}
      {!loading && stations.length > 0 && (
        <div className="text-center text-slate-600 dark:text-slate-400">
          <div className="flex items-center justify-center gap-2">
            <Zap className="h-4 w-4" />
            <span>Showing {stations.length} charging stations from Open Charge Map</span>
          </div>
        </div>
      )}
    </div>
  );
}