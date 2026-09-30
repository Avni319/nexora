import { motion } from "framer-motion";
import {
  MessageSquare,
  FolderKanban,
  Video,
  Calendar,
  FileText,
  Code2,
  Building2,
} from "lucide-react";

const features = [
  {
    title: "Real-time Chat",
    description: "Instant team messaging with socket-powered delivery. Never miss a message.",
    icon: MessageSquare,
    color: "bg-violet-100",
    iconColor: "text-violet-600",
    badge: null,
  },
  {
    title: "Kanban Boards",
    description: "Drag and drop tasks across TODO, In Progress, Review, and Done columns.",
    icon: FolderKanban,
    color: "bg-blue-100",
    iconColor: "text-blue-600",
    badge: null,
  },
  {
    title: "Video Meetings",
    description: "HD video calls powered by LiveKit. Create or join a room in one click.",
    icon: Video,
    color: "bg-pink-100",
    iconColor: "text-pink-600",
    badge: null,
  },
  {
    title: "Calendar & Events",
    description: "Schedule deadlines, meetings and milestones. Color-coded event management.",
    icon: Calendar,
    color: "bg-emerald-100",
    iconColor: "text-emerald-600",
    badge: null,
  },
  {
    title: "File Sharing",
    description: "Upload, organize and download project files. Supports images, PDFs and ZIPs.",
    icon: FileText,
    color: "bg-orange-100",
    iconColor: "text-orange-600",
    badge: null,
  },
  {
    title: "Code Snippets",
    description: "Save and share reusable code with syntax highlighting. Browse by language.",
    icon: Code2,
    color: "bg-cyan-100",
    iconColor: "text-cyan-600",
    badge: null,
  },
  {
    title: "Organizations",
    description: "Manage multiple teams and organizations. Invite members, assign roles.",
    icon: Building2,
    color: "bg-indigo-100",
    iconColor: "text-indigo-600",
    badge: null,
  },

];

function Features() {
  return (
    <section id="features" className="bg-slate-50 py-28">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-violet-600"
          >
            Everything you need
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold tracking-tight text-slate-900"
          >
            Built for how teams actually work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-lg text-slate-500"
          >
            One platform to plan, build, and ship. No context switching.
          </motion.p>
        </div>

        {/* Feature grid */}
        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                {feature.badge && (
                  <span className="absolute right-4 top-4 rounded-full bg-violet-100 px-2.5 py-1 text-xs font-semibold text-violet-600">
                    {feature.badge}
                  </span>
                )}
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${feature.color}`}>
                  <Icon size={22} className={feature.iconColor} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-2.5 text-sm leading-6 text-slate-500">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Features;
