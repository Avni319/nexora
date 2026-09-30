import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Nexora completely replaced Jira, Slack and Notion for us. Everything we need in one place.",
    name: "Priya Sharma",
    role: "Engineering Lead @ Razorpay",
    avatar: "PS",
    color: "bg-violet-500",
  },
  {
    quote: "The kanban + chat combo is amazing. Our standup time dropped from 30 to 10 minutes.",
    name: "Arnav Mehta",
    role: "Founder @ BuildFast",
    avatar: "AM",
    color: "bg-blue-500",
  },
  {
    quote: "The video meeting integration is seamless. No more Zoom links in Slack — just open Nexora.",
    name: "Shreya Patel",
    role: "CTO @ DevHive",
    avatar: "SP",
    color: "bg-emerald-500",
  },
  {
    quote: "As a designer, I love the UI. It's the first collaboration tool I actually enjoy opening.",
    name: "Rohan Gupta",
    role: "Product Designer @ Groww",
    avatar: "RG",
    color: "bg-orange-500",
  },
];

function Testimonials() {
  return (
    <section className="bg-slate-50 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-violet-600"
          >
            Loved by teams
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-slate-900"
          >
            Teams love building with Nexora
          </motion.h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-violet-500 text-violet-500" />
                ))}
              </div>
              <p className="text-sm leading-7 text-slate-600">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${t.color} text-sm font-bold text-white`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
