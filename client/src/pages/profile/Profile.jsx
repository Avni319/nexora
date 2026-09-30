import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Briefcase, GitBranch, Tag, Save, Loader2, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "../../services/authService";

function Profile() {
  const { user, token, setUser } = useAuth();
  const [saved, setSaved] = useState(false);

  const { register, handleSubmit, reset, formState: { isSubmitting, isDirty } } = useForm({
    defaultValues: {
      fullName: "",
      bio: "",
      jobTitle: "",
      github: "",
      skills: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        bio: user.bio || "",
        jobTitle: user.jobTitle || "",
        github: user.github || "",
        skills: Array.isArray(user.skills) ? user.skills.join(", ") : user.skills || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        skills: data.skills ? data.skills.split(",").map((s) => s.trim()).filter(Boolean) : [],
      };
      const response = await updateProfile(token, payload);
      setUser(response.user);
      toast.success("Profile updated!");
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const initials = user?.fullName?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U";

  const fields = [
    { name: "fullName", label: "Full name", placeholder: "John Doe", icon: User, type: "text" },
    { name: "bio", label: "Bio", placeholder: "Tell your team about yourself…", icon: null, type: "textarea" },
    { name: "jobTitle", label: "Job title", placeholder: "Senior Frontend Engineer", icon: Briefcase, type: "text" },
    { name: "github", label: "GitHub username", placeholder: "johndoe", icon: GitBranch, type: "text" },
    { name: "skills", label: "Skills (comma-separated)", placeholder: "React, Node.js, TypeScript", icon: Tag, type: "text" },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
        <p className="mt-1 text-slate-500">Manage your account details and public info</p>
      </div>

      {/* Avatar card */}
      <div className="flex items-center gap-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-purple-700 text-2xl font-bold text-white shadow-lg shadow-violet-200">
          {initials}
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{user?.fullName || "—"}</h2>
          <p className="mt-0.5 text-sm text-slate-500">{user?.email}</p>
          {user?.jobTitle && (
            <span className="mt-2 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
              {user.jobTitle}
            </span>
          )}
        </div>
      </div>

      {/* Skills display */}
      {user?.skills?.length > 0 && (
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="mb-3 text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Tag size={14} /> Skills
          </p>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Edit form */}
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
        <p className="text-sm font-semibold text-slate-700">Edit Profile</p>

        {fields.map(({ name, label, placeholder, icon: Icon, type }) => (
          <div key={name}>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
              {Icon && <Icon size={13} className="text-slate-400" />}
              {label}
            </label>
            {type === "textarea" ? (
              <textarea
                {...register(name)}
                placeholder={placeholder}
                rows={3}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
              />
            ) : (
              <input
                {...register(name)}
                type={type}
                placeholder={placeholder}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 size={15} className="animate-spin" />
          ) : saved ? (
            <CheckCircle2 size={15} />
          ) : (
            <Save size={15} />
          )}
          {isSubmitting ? "Saving…" : saved ? "Saved!" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
