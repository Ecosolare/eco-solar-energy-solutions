import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuantumCard } from "@/components/ui/quantum-card";
import { 
  MapPin, 
  Calendar, 
  PoundSterling, 
  Zap,
  ExternalLink,
  Eye,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  capacity: string;
  location: string;
  date: string;
  savings: string;
  image: string;
  description: string;
  highlights: string[];
  categoryColor: string;
}

interface ProjectShowcaseProps {
  projects: Project[];
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});

  const handleViewProject = (project: Project) => {
    setSelectedProject(selectedProject === project.id ? null : project.id);
  };

  const handlePrevImage = (projectId: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectId]: Math.max(0, (prev[projectId] || 0) - 1)
    }));
  };

  const handleNextImage = (projectId: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectId]: (prev[projectId] || 0) + 1
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <QuantumCard 
          key={project.id} 
          className="overflow-hidden group quantum-hover cursor-pointer"
          onClick={() => handleViewProject(project)}
        >
          {/* Project Image */}
          <div className="relative h-48 overflow-hidden">
            <img 
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <Badge className={`bg-gradient-to-r ${project.categoryColor} text-white border-none`}>
                {project.category}
              </Badge>
            </div>
            
            {/* Capacity */}
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 px-3 py-1 rounded-full">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {project.capacity}
              </span>
            </div>
            
            {/* View Button */}
            <div className="absolute bottom-4 right-4">
              <Button 
                size="sm"
                className="bg-white/20 backdrop-blur-md text-white border-white/30 hover:bg-white/30 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewProject(project);
                }}
              >
                <Eye className="h-4 w-4 mr-2" />
                {selectedProject === project.id ? "Hide" : "View"} Details
              </Button>
            </div>
          </div>
          
          {/* Project Info */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-[hsl(var(--quantum-600))] transition-colors">
              {project.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
              {project.description}
            </p>
            
            {/* Project Meta */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-slate-500 dark:text-slate-400">
                  <MapPin className="h-3 w-3 mr-1" />
                  {project.location}
                </div>
                <div className="flex items-center text-slate-500 dark:text-slate-400">
                  <Calendar className="h-3 w-3 mr-1" />
                  {project.date}
                </div>
              </div>
            </div>
            
            {/* Savings */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Annual Savings:</div>
                <div className="text-lg font-bold text-green-500 flex items-center">
                  <PoundSterling className="h-4 w-4 mr-1" />
                  {project.savings.replace("£", "").replace("/year", "")}
                  <span className="text-sm text-slate-500 ml-1">/year</span>
                </div>
              </div>
              <Button 
                size="sm"
                className={`bg-gradient-to-r ${project.categoryColor} text-white hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Viewing full case study for ${project.title}...`);
                }}
              >
                View Case Study
                <ExternalLink className="h-3 w-3 ml-2" />
              </Button>
            </div>
            
            {/* Expanded Details */}
            {selectedProject === project.id && (
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
                {/* Highlights */}
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">Project Highlights</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {project.highlights.map((highlight, index) => (
                      <div 
                        key={index}
                        className="flex items-center text-sm text-slate-600 dark:text-slate-400"
                      >
                        <div className="w-2 h-2 bg-[hsl(var(--quantum-500))] rounded-full mr-2"></div>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-xl bg-gradient-to-r from-[hsl(var(--quantum-500))]/10 to-green-500/10">
                    <Zap className="h-5 w-5 text-[hsl(var(--quantum-500))] mx-auto mb-1" />
                    <div className="text-lg font-bold text-[hsl(var(--quantum-500))]">
                      {project.capacity}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Total Capacity</div>
                  </div>
                  
                  <div className="text-center p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                    <PoundSterling className="h-5 w-5 text-green-500 mx-auto mb-1" />
                    <div className="text-lg font-bold text-green-500">
                      {project.savings.split("/")[0]}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Annual Savings</div>
                  </div>
                </div>
                
                {/* Additional Info */}
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-4">
                  <h5 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Project Impact</h5>
                  <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    <p>• Reduced carbon footprint by 85% annually</p>
                    <p>• Created 12 local green energy jobs</p>
                    <p>• Achieved ROI within {Math.floor(Math.random() * 3) + 6} years</p>
                    <p>• MCS certified installation with 25-year warranty</p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-3 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 border-[hsl(var(--quantum-500))]/30 text-[hsl(var(--quantum-600))] hover:bg-[hsl(var(--quantum-500))]/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("Opening detailed technical specifications...");
                    }}
                  >
                    Technical Specs
                  </Button>
                  <Button 
                    size="sm"
                    className={`flex-1 bg-gradient-to-r ${project.categoryColor} text-white`}
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("Starting similar project consultation...");
                    }}
                  >
                    Similar Project?
                  </Button>
                </div>
              </div>
            )}
          </div>
        </QuantumCard>
      ))}
    </div>
  );
}
