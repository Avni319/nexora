import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-16 text-center shadow-2xl shadow-violet-200"
        >
          {/* Background glow */}
          <div className="pointer-events-none absolute left-1/4 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-5xl font-bold text-white">
              Ready to ship faster?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-violet-100">
              Join thousands of developers who use Nexora to collaborate, track progress, and build great products together.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/signup"
                className="flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-violet-700 shadow-lg transition-colors duration-200 hover:bg-violet-50"
              >
                Get Started Free
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-2xl border border-white/30 px-8 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Sign In
              </Link>
            </div>
            <p className="mt-6 text-sm text-violet-200">No credit card required · Free forever for small teams</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTA;
