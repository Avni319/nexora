import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is Nexora free to use?",
    a: "Yes! The Starter plan is free forever for teams up to 5 members with 3 projects. No credit card required.",
  },
  {
    q: "Can I use Nexora without an organization?",
    a: "No — projects live inside organizations. Simply create a personal organization in seconds to get started solo.",
  },
  {
    q: "How does the video meeting feature work?",
    a: "Nexora uses LiveKit for real-time video. You can create instant rooms or share a meeting code with teammates.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. All connections are encrypted. JWT authentication protects every API endpoint and route.",
  },
  {
    q: "Can I self-host Nexora?",
    a: "Yes! Nexora is fully open-source. You can host the MERN stack app on any cloud provider or your own servers.",
  },
  {
    q: "What is the AI Assistant?",
    a: "The AI Assistant is coming soon. It will help you summarize tasks, generate code snippets, and surface insights from your projects.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="bg-slate-50 py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-violet-600"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-slate-900"
          >
            Common questions
          </motion.h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-slate-900">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 text-slate-400 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-6 pb-6 text-sm leading-7 text-slate-500">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
