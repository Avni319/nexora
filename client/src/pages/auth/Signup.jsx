import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, ArrowRight, Loader2, Check } from "lucide-react";

import useAuth from "../../hooks/useAuth";
import { signupUser } from "../../services/authService";

function Signup() {
  const navigate = useNavigate();
  const { token, setToken, setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password", "");

  const passwordChecks = [
    { label: "At least 6 characters", valid: password.length >= 6 },
    { label: "Contains a letter", valid: /[a-zA-Z]/.test(password) },
  ];

  const onSubmit = async (data) => {
    try {
      const response = await signupUser(data);
      setToken(response.token);
      setUser(response.user);
      toast.success("Account created! Welcome to Nexora 🎉");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">

      {/* Left Panel */}
      <div className="relative hidden lg:flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-violet-700 via-purple-600 to-indigo-700 p-12 text-white">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-purple-300/20 blur-2xl" />

        <div className="relative z-10 max-w-md text-center">
          <Link to="/" className="mb-10 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-xl font-bold backdrop-blur-sm">
              N
            </div>
            <span className="text-2xl font-bold">Nexora</span>
          </Link>
          <h1 className="text-5xl font-bold leading-tight">
            Join Nexora
          </h1>
          <p className="mt-5 text-lg text-violet-100 leading-8">
            Create your workspace and start collaborating with your team from anywhere.
          </p>

          {/* Social proof */}
          <div className="mt-10 rounded-2xl bg-white/10 p-6 text-left backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex -space-x-2">
                {["bg-pink-400", "bg-blue-400", "bg-emerald-400", "bg-yellow-400"].map((c) => (
                  <div key={c} className={`h-8 w-8 rounded-full border-2 border-white/30 ${c}`} />
                ))}
              </div>
              <p className="text-sm text-violet-100">Join 10,000+ developers</p>
            </div>
            <p className="text-sm text-violet-200 italic">"Nexora replaced Jira, Slack and Notion for our team."</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link to="/" className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 font-bold text-white">
              N
            </div>
            <span className="text-xl font-bold text-slate-900">Nexora</span>
          </Link>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">Create account</h2>
              <p className="mt-2 text-slate-500">Start collaborating with your team today</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              {/* Full Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Full name
                </label>
                <input
                  placeholder="John Doe"
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: { value: 2, message: "Name must be at least 2 characters" },
                  })}
                  className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 ${
                    errors.fullName ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                  })}
                  className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 ${
                    errors.email ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" },
                    })}
                    className={`w-full rounded-xl border px-4 py-3 pr-12 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 ${
                      errors.password ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
                )}

                {/* Password checks */}
                {password.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {passwordChecks.map(({ label, valid }) => (
                      <div key={label} className="flex items-center gap-2">
                        <div className={`flex h-4 w-4 items-center justify-center rounded-full transition ${valid ? "bg-emerald-100" : "bg-slate-100"}`}>
                          <Check size={10} className={valid ? "text-emerald-600" : "text-slate-300"} />
                        </div>
                        <span className={`text-xs transition ${valid ? "text-emerald-600" : "text-slate-400"}`}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-violet-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Signup;
