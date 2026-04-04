import React from 'react';
import { ExternalLink, Link2, AlertCircle, CheckCircle2 } from 'lucide-react';

const TaskCard = ({ task }) => {
  // task = { title, size, driveUrl, driveFileName, isBlocked, status }

  return (
    <div className={`group relative p-4 mb-3 rounded-lg border bg-white transition-all hover:shadow-md 
      ${task.isBlocked ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200 hover:border-blue-400'}`}>
      
      {/* Header: Fibonacci Size & Status */}
      <div className="flex justify-between items-start mb-2">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-mono font-bold text-sm border border-slate-200">
          {task.size}
        </span>
        <div className="flex gap-2">
          {task.isBlocked && (
            <div className="flex items-center text-amber-600 text-[10px] font-bold uppercase tracking-wider bg-amber-100 px-2 py-1 rounded">
              <AlertCircle size={12} className="mr-1" /> Blocked
            </div>
          )}
          {task.status === 'done' && <CheckCircle2 size={20} className="text-green-500" />}
        </div>
      </div>

      {/* Title */}
      <h4 className={`font-medium text-slate-800 leading-tight mb-3 ${task.isBlocked ? 'text-slate-500' : ''}`}>
        {task.title}
      </h4>

      {/* Google Drive Link - The "Product of Labor" */}
      {task.driveUrl && (
        <a 
          href={task.driveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-2 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors group/link"
        >
          <Link2 size={14} className="mr-2" />
          <span className="text-xs font-semibold truncate max-w-[180px]">
            {task.driveFileName || "Open Deliverable"}
          </span>
          <ExternalLink size={12} className="ml-auto opacity-0 group-hover/link:opacity-100 transition-opacity" />
        </a>
      )}

      {/* Dependency Hint */}
      {task.dependsOn && (
        <p className="mt-2 text-[10px] text-slate-400 italic">
          Waiting on: <span className="underline">{task.dependsOn}</span>
        </p>
      )}
    </div>
  );
};

export default TaskCard;