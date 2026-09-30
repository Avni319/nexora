function CodePreview() {
  return (
    <div className="mt-5 overflow-hidden rounded-xl bg-slate-900 p-4 font-mono text-xs">
      <div className="mb-3 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
      </div>
      <p><span className="text-slate-500">// auth.js</span></p>
      <p className="mt-1"><span className="text-purple-400">const</span> <span className="text-blue-300">token</span> <span className="text-slate-300">= </span><span className="text-green-400">jwt</span><span className="text-slate-300">.</span><span className="text-yellow-300">sign</span><span className="text-slate-300">{"({"}</span></p>
      <p className="ml-3"><span className="text-orange-300">userId</span><span className="text-slate-300">: user._id,</span></p>
      <p><span className="text-slate-300">{"}, "}</span><span className="text-green-300">process</span><span className="text-slate-300">.env.</span><span className="text-blue-300">JWT_SECRET</span><span className="text-slate-300">);</span></p>
      <p className="mt-2"><span className="text-purple-400">return</span> <span className="text-slate-300">{"{ "}</span><span className="text-orange-300">token</span><span className="text-slate-300">, user {"}"}</span></p>
    </div>
  );
}

export default CodePreview;
