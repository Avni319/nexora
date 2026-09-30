import { motion } from "framer-motion";
import { MessageSquare, FolderKanban, Code2, Video, FileText } from "lucide-react";
import FeatureCard from "./FeatureCard";
import ChatPreview from "./previews/ChatPreview";
import ProjectPreview from "./previews/ProjectPreview";
import CodePreview from "./previews/CodePreview";
import MeetingPreview from "./previews/MeetingPreview";
import DocsPreview from "./previews/DocsPreview";

function BentoFeatures() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-violet-600"
          >
            Feature showcase
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold tracking-tight text-slate-900"
          >
            Everything developers need.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-500"
          >
            One workspace for your entire engineering team.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 grid auto-rows-[300px] gap-5 md:grid-cols-3"
        >
          <FeatureCard
            title="Real-time Chat"
            description="Instant team messaging. No delays."
            icon={MessageSquare}
            gradient="from-violet-500 to-indigo-500"
            className="md:col-span-2"
          >
            <ChatPreview />
          </FeatureCard>

          <FeatureCard
            title="Projects & Kanban"
            description="Track progress visually."
            icon={FolderKanban}
            gradient="from-cyan-500 to-blue-500"
          >
            <ProjectPreview />
          </FeatureCard>

          <FeatureCard
            title="Code Snippets"
            description="Save reusable code with syntax highlighting."
            icon={Code2}
            gradient="from-emerald-500 to-teal-500"
          >
            <CodePreview />
          </FeatureCard>

          <FeatureCard
            title="Video Meetings"
            description="HD video powered by LiveKit."
            icon={Video}
            gradient="from-pink-500 to-rose-500"
            className="md:col-span-2"
          >
            <MeetingPreview />
          </FeatureCard>

          <FeatureCard
            title="Documentation"
            description="Markdown-powered project wiki."
            icon={FileText}
            gradient="from-indigo-500 to-violet-500"
          >
            <DocsPreview />
          </FeatureCard>
        </motion.div>
      </div>
    </section>
  );
}

export default BentoFeatures;
