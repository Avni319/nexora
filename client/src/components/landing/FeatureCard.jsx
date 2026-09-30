import { motion } from "framer-motion";

function FeatureCard({ title, description, icon: Icon, gradient, children, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm ${className}`}
    >
      {/* Subtle glow */}
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-2xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-125`}
      />

      {/* Icon */}
      <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-sm`}>
        <Icon size={20} className="text-white" />
      </div>

      <h3 className="relative z-10 mt-5 text-xl font-bold text-slate-900">{title}</h3>
      <p className="relative z-10 mt-2 text-sm leading-6 text-slate-500">{description}</p>

      {children && <div className="relative z-10">{children}</div>}
    </motion.div>
  );
}

export default FeatureCard;
