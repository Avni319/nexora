import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const floatingBadges = [
  { icon: Zap, label: "Real-time Sync", color: "bg-violet-100 text-violet-700", x: "right-8", y: "top-16" },
  { icon: Shield, label: "Secure & Private", color: "bg-emerald-100 text-emerald-700", x: "right-4", y: "bottom-24" },
  { icon: Globe, label: "Live in 2 min", color: "bg-blue-100 text-blue-700", x: "-left-4", y: "bottom-12" },
];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, #7c3aed 1px, transparent 1px), linear-gradient(to bottom, #7c3aed 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-200/30 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-20 h-[400px] w-[400px] rounded-full bg-indigo-200/20 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6 pb-28 pt-24">
        <div className="flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700"
          >
            <span className="flex h-2 w-2 rounded-full bg-violet-500" />
            Introducing Nexora 1.0 — Built for developer teams
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl text-6xl font-bold leading-[1.06] tracking-tight text-slate-900 lg:text-7xl"
          >
            The workspace where{" "}
            <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              developers ship
            </span>{" "}
            together.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-500"
          >
            Kanban boards, real-time chat, video meetings, file sharing, and AI assistance —
            all in one beautiful platform built for modern engineering teams.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/signup"
              className="flex items-center gap-2 rounded-2xl bg-violet-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-200 transition-colors duration-200 hover:bg-violet-700"
            >
              Get Started Free
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition-colors duration-200 hover:border-violet-300 hover:text-violet-700"
            >
              Sign In
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-10"
          >
            {[
              { value: "10K+", label: "Developers" },
              { value: "2K+", label: "Teams" },
              { value: "99.9%", label: "Uptime" },
              { value: "50+", label: "Features" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-slate-900">{value}</div>
                <div className="text-sm text-slate-500">{label}</div>
              </div>
            ))}
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mt-20 w-full max-w-5xl"
          >
            {/* Glow behind */}
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-r from-violet-400/20 via-purple-400/20 to-indigo-400/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-5 py-4">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="mx-auto flex h-7 w-72 items-center rounded-lg bg-white px-3 text-xs text-slate-400 shadow-sm border border-slate-100">
                  app.nexora.dev/dashboard
                </div>
              </div>

              {/* Dashboard content */}
              <div className="flex h-96 overflow-hidden">
                {/* Mini sidebar */}
                <div className="flex w-48 flex-col border-r border-slate-100 bg-white p-4">
                  <div className="mb-4 flex items-center gap-2 px-1">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-xs font-bold text-white">N</div>
                    <span className="text-sm font-bold">Nexora</span>
                  </div>
                  {["Dashboard", "Projects", "Organizations", "Chat", "Profile"].map((item, i) => (
                    <div key={item} className={`mb-1 rounded-xl px-3 py-2 text-xs font-medium transition ${i === 0 ? "bg-violet-600 text-white" : "text-slate-500 hover:bg-slate-50"}`}>
                      {item}
                    </div>
                  ))}
                </div>

                {/* Main content */}
                <div className="flex-1 bg-slate-50/60 p-5">
                  <p className="mb-4 text-sm font-bold text-slate-800">Welcome back, Avni 👋</p>
                  <div className="mb-4 grid grid-cols-4 gap-3">
                    {[
                      { label: "Projects", value: "24", color: "bg-violet-100 text-violet-600" },
                      { label: "Tasks", value: "512", color: "bg-emerald-100 text-emerald-600" },
                      { label: "Members", value: "168", color: "bg-blue-100 text-blue-600" },
                      { label: "Storage", value: "2.4GB", color: "bg-orange-100 text-orange-600" },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="rounded-2xl bg-white p-3 shadow-sm border border-slate-100">
                        <p className="text-xs text-slate-500">{label}</p>
                        <p className={`mt-1 text-lg font-bold ${color.split(" ")[1]}`}>{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
                      <p className="mb-3 text-xs font-semibold text-slate-700">Recent Projects</p>
                      {["Nexora Web", "Mobile App", "AI Service"].map((p, i) => (
                        <div key={p} className="mb-2 flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${["bg-violet-500","bg-blue-500","bg-emerald-500"][i]}`} />
                          <span className="text-xs text-slate-600">{p}</span>
                          <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-600">Active</span>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
                      <p className="mb-3 text-xs font-semibold text-slate-700">Activity</p>
                      {["Rahul pushed 3 commits", "Diya uploaded UI kit", "Karan created task"].map((a) => (
                        <div key={a} className="mb-2 flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                          <span className="text-xs text-slate-500">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
