import { motion } from "framer-motion";

const companies = ["Google", "Microsoft", "Vercel", "Linear", "GitHub", "Figma", "Notion"];

function TrustedBy() {
  return (
    <section className="border-y border-slate-100 bg-white py-14">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Trusted by teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {companies.map((company, i) => (
            <motion.span
              key={company}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="text-lg font-bold text-slate-300 transition-colors duration-200 hover:text-slate-600"
            >
              {company}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedBy;
