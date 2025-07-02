import { useEffect, useState } from "react";

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  totalComponents: number;
}

// Lightweight performance monitor for production optimization
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    const startTime = performance.now();
    
    // Monitor initial load performance
    window.addEventListener('load', () => {
      const loadTime = performance.now() - startTime;
      
      requestAnimationFrame(() => {
        const renderTime = performance.now() - startTime;
        
        setMetrics({
          loadTime: Math.round(loadTime),
          renderTime: Math.round(renderTime),
          totalComponents: document.querySelectorAll('[data-component]').length
        });
      });
    });
  }, []);

  return metrics;
}

// Lazy loading utility for heavy components
export function useLazyComponent<T>(
  importFn: () => Promise<{ default: T }>,
  delay: number = 0
) {
  const [Component, setComponent] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const loadComponent = async () => {
    if (Component || loading) return;
    
    setLoading(true);
    
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    try {
      const { default: LoadedComponent } = await importFn();
      setComponent(LoadedComponent);
    } catch (error) {
      console.error('Failed to load component:', error);
    } finally {
      setLoading(false);
    }
  };

  return { Component, loading, loadComponent };
}