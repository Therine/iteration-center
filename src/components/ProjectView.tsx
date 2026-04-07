'use client';
import React from 'react';
import TaskCard from './TaskCard';

interface ProjectViewProps {
  tasks: any[];
  projects: any[];
  teamMembers: any[];
  deleteTask: (id: string) => void;
  toggleComplete: (id: string, status: boolean) => void;
  updateTask: (id: string, data: any) => void;
}

export default function ProjectView({ 
  tasks, 
  projects, 
  teamMembers, 
  deleteTask, 
  toggleComplete, 
  updateTask 
}: ProjectViewProps) {
  return (
    <div className="space-y-12 pb-20">
      {projects.map((project) => {
        // Filter tasks linked to THIS project
        const projectTasks = tasks.filter((t) => 
          t.task_project_links?.some((link: any) => link.projects?.id === project.id)
        );

        if (projectTasks.length === 0) return null;

        return (
          <div key={project.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-2 bg-blue-600 rounded-full"></div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                {project.name}
              </h3>
              <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-1 rounded-full font-black">
                {projectTasks.length} {projectTasks.length === 1 ? 'TASK' : 'TASKS'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectTasks.map((t) => (
                <TaskCard 
                  key={t.id} 
                  task={t} 
                  teamMembers={teamMembers}
                  allProjects={projects}
                  allTasks={tasks}
                  onDelete={deleteTask}
                  onToggleComplete={toggleComplete}
                  onUpdate={updateTask}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}