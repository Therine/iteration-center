import React from 'react';
import { Target, CheckCircle2, Zap } from 'lucide-react';

export default function ProjectDashboard({ projects, tasks }: { projects: any[], tasks: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
      {projects.map((project) => {
        // 1. Find tasks linked to THIS project
        const projectTasks = tasks.filter(task => 
          task.task_project_links?.some((link: any) => link.projects?.id === project.id)
        );

        const totalPoints = projectTasks.reduce((sum, t) => sum + (Number(t.size) || 0), 0);
        const completedPoints = projectTasks
          .filter(t => t.is_completed)
          .reduce((sum, t) => sum + (Number(t.size) || 0), 0);
        
        const progress = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;

        return (
          <div key={project.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Target size={20} />
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase ${
                progress === 100 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {progress === 100 ? 'Done' : 'In Progress'}
              </span>
            </div>

            <h3 className="font-bold text-slate-800 truncate mb-1">{project.name}</h3>
            <p className="text-xs text-slate-400 font-medium mb-4">{projectTasks.length} Tasks Linked</p>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                <span className="text-slate-400">Velocity: {completedPoints} / {totalPoints} pts</span>
                <span className="text-blue-600">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-1000" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}