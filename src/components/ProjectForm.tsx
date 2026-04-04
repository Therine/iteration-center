import React, { useState } from 'react';
import { FolderPlus, X } from 'lucide-react';

export default function ProjectForm({ onAddProject }: { onAddProject: (name: string) => void }) {
  const [name, setName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddProject(name);
    setName('');
    setIsOpen(false);
  };

  if (!isOpen) return (
    <button 
      onClick={() => setIsOpen(true)}
      className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm"
    >
      <FolderPlus size={14} /> NEW STRATEGIC PROJECT
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl border-2 border-blue-100 shadow-xl animate-in fade-in slide-in-from-top-2">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xs font-black text-slate-400 uppercase">Create New Project</h3>
        <button type="button" onClick={() => setIsOpen(false)}><X size={16} className="text-slate-400" /></button>
      </div>
      <input 
        autoFocus
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project Name (e.g., Alumni Outreach 2024)"
        className="w-full p-2 border border-slate-200 rounded text-slate-900 font-semibold outline-none focus:ring-2 focus:ring-blue-500 mb-3"
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold text-xs hover:bg-blue-700">
        INITIALIZE PROJECT
      </button>
    </form>
  );
}