import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    description: "Perfect for small teams getting started.",
    features: [
      "Up to 3 projects",
      "5 team members",
      "Real-time chat",
      "Kanban boards",
      "1 GB storage",
      "Community support",
    ],
    cta: "Get Started",
    variant: "outline",
    popular: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "per user/month",
    description: "For growing teams that need more power.",
    features: [
      "Unlimited projects",
      "Unlimited members",
      "Video meetings",
      "File sharing (50 GB)",
      "Calendar & events",
      "Priority support",
      "API access",
    ],
    cta: "Start Free Trial",
    variant: "primary",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For large organizations with custom needs.",
    features: [
      "Everything in Pro",
      "SSO / SAML",
      "Custom integrations",
      "SLA guarantee",
      "Dedicated support",
      "Advanced analytics",
      "Audit logs",
    ],
    cta: "Contact Sales",
    variant: "outline",
    popular: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-violet-600"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-slate-900"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-slate-500"
          >
            No surprise fees. No credit card required to start.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative rounded-3xl border p-8 ${
                plan.popular
                  ? "border-violet-300 bg-gradient-to-b from-violet-600 to-purple-700 text-white shadow-2xl shadow-violet-200"
                  : "border-slate-200 bg-white shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-lg font-bold ${plan.popular ? "text-white" : "text-slate-900"}`}>
                  {plan.name}
                </h3>
                <p className={`mt-1 text-sm ${plan.popular ? "text-violet-200" : "text-slate-500"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <span className={`text-5xl font-bold ${plan.popular ? "text-white" : "text-slate-900"}`}>
                  {plan.price}
                </span>
                <span className={`ml-2 text-sm ${plan.popular ? "text-violet-200" : "text-slate-500"}`}>
                  {plan.period}
                </span>
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${plan.popular ? "bg-white/20" : "bg-violet-100"}`}>
                      <Check size={12} className={plan.popular ? "text-white" : "text-violet-600"} />
                    </div>
                    <span className={`text-sm ${plan.popular ? "text-violet-100" : "text-slate-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/signup"
                className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold transition-colors duration-200 ${
                  plan.popular
                    ? "bg-white text-violet-700 hover:bg-violet-50"
                    : "bg-violet-600 text-white hover:bg-violet-700"
                }`}
              >
                {plan.cta}
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
