import { useEffect, useState } from "react";
import { Plus, Building2, Users, Trash2, UserPlus } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import {
  getOrganizations,
  deleteOrganization,
} from "../../services/organizationService";

import CreateOrganizationModal from "../../components/organizations/CreateOrganizationModal";
import InviteMemberModal from "../../components/organizations/InviteMemberModal";
import TeamModal from "../../components/team/TeamModal";

import toast from "react-hot-toast";

function Organization() {
  const { token } = useAuth();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [selectedTeamOrganization, setSelectedTeamOrganization] = useState(null);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await getOrganizations(token);
      setOrganizations(response.organizations);
    } catch {
      toast.error("Unable to load organizations");
    } finally {
      setLoading(false);
    }
  };

  const handleOrganizationCreated = (org) => {
    setOrganizations((prev) => [org, ...prev]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this organization? All associated data will be lost.")) return;
    try {
      await deleteOrganization(token, id);
      toast.success("Organization deleted");
      setOrganizations((prev) => prev.filter((o) => o._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  const orgColors = [
    "from-violet-500 to-purple-600",
    "from-blue-500 to-indigo-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-amber-600",
    "from-pink-500 to-rose-600",
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Organizations</h1>
          <p className="mt-1 text-slate-500">
            Manage your organizations and teams
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
        >
          <Plus size={17} />
          New Organization
        </button>
      </div>

      {/* Skeleton loader */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-3xl bg-slate-100" />
          ))}
        </div>
      ) : organizations.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white py-24 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-100">
            <Building2 size={28} className="text-violet-600" />
          </div>
          <h2 className="mt-5 text-xl font-bold text-slate-800">No organizations yet</h2>
          <p className="mt-2 max-w-xs text-sm text-slate-500">
            Create your first organization to start managing teams and projects.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-5 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Create Organization
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {organizations.map((org, idx) => {
            const gradient = orgColors[idx % orgColors.length];
            return (
              <div
                key={org._id}
                className="group flex flex-col rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Color strip */}
                <div className={`h-2 rounded-t-3xl bg-gradient-to-r ${gradient}`} />

                <div className="flex flex-1 flex-col p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient}`}>
                      <Building2 size={22} className="text-white" />
                    </div>
                    <button
                      onClick={() => handleDelete(org._id)}
                      className="rounded-xl p-2 text-slate-300 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                      aria-label="Delete organization"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="mt-4 flex-1">
                    <h2 className="text-xl font-bold text-slate-900">{org.name}</h2>
                    <p className="mt-1.5 text-sm text-slate-500 line-clamp-2">
                      {org.description || "No description provided"}
                    </p>
                  </div>

                  {/* Members count */}
                  <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
                    <Users size={15} className="text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">
                      {org.members?.length || 0} member{(org.members?.length || 0) !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                    <button
                      onClick={() => setSelectedOrganization(org)}
                      className="flex items-center justify-center gap-2 rounded-xl bg-violet-50 px-3 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
                    >
                      <UserPlus size={15} />
                      Members
                    </button>
                    <button
                      onClick={() => setSelectedTeamOrganization(org)}
                      className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                    >
                      <Users size={15} />
                      Teams
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      <CreateOrganizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOrganizationCreated={handleOrganizationCreated}
      />

      {selectedOrganization && (
        <InviteMemberModal
          organization={selectedOrganization}
          onClose={() => setSelectedOrganization(null)}
        />
      )}

      {selectedTeamOrganization && (
        <TeamModal
          organization={selectedTeamOrganization}
          onClose={() => setSelectedTeamOrganization(null)}
        />
      )}
    </div>
  );
}

export default Organization;
