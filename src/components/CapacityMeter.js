import React from 'react';

const CapacityMeter = ({ user, points, maxCapacity }) => {
  // Calculate percentage of capacity used
  const usage = (points / maxCapacity) * 100;
  
  // Determine color based on "Overworked" vs "Idle" logic
  const getStatusColor = () => {
    if (usage > 110) return 'bg-red-500';    // Overworked
    if (usage < 70) return 'bg-blue-400';    // Under-capacity (Idle)
    return 'bg-green-500';                  // The "Earthly Balance"
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 w-full">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{user}</h3>
          <p className="text-sm text-slate-500">Current Iteration</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-mono font-bold text-slate-700">{points}</span>
          <span className="text-slate-400"> / {maxCapacity} pts</span>
        </div>
      </div>
      
      {/* Progress Bar Background */}
      <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
        {/* Dynamic Status Bar */}
        <div 
          className={`h-full transition-all duration-500 ease-in-out ${getStatusColor()}`}
          style={{ width: `${Math.min(usage, 100)}%` }}
        />
      </div>
      
      <p className="mt-3 text-xs italic text-slate-400">
        {usage > 110 ? "⚠️ Careful, you're redlining." : usage < 70 ? "☕ Plenty of breathing room." : "✨ Perfect pace."}
      </p>
    </div>
  );
};

export default function IterationDashboard() {
  // Example data for the two of you
  const teamData = [
    { name: "User A", currentPoints: 18, max: 20 },
    { name: "User B", currentPoints: 8, max: 20 }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 p-8 bg-slate-50 min-h-screen">
      {teamData.map((member) => (
        <CapacityMeter 
          key={member.name}
          user={member.name} 
          points={member.currentPoints} 
          maxCapacity={member.max} 
        />
      ))}
    </div>
  );
}