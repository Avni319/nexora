const projects = [
  { name: "Nexora Web", progress: 92, color: "from-violet-500 to-indigo-500" },
  { name: "Mobile App", progress: 67, color: "from-blue-500 to-cyan-500" },
  { name: "AI Service", progress: 34, color: "from-emerald-500 to-teal-500" },
];

function ProjectPreview() {
  return (
    <div className="mt-5 space-y-3.5">
      {projects.map(({ name, progress, color }) => (
        <div key={name}>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">{name}</span>
            <span className="font-bold text-slate-500">{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${color} transition-all`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectPreview;
