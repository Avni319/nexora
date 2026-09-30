import Sidebar from "../../dashboard/DashboardSidebar";
import Topbar from "../../dashboard/DashboardTopbar";
import {
  FolderKanban,
  Users,
  CheckCircle2,
  HardDrive,
} from "lucide-react";


const stats = [
  {
    title: "Projects",
    value: "24",
    change: "+12%",
    icon: FolderKanban,
    gradient: "from-violet-50 to-violet-100",
    iconColor: "text-violet-600",
  },
  {
    title: "Members",
    value: "168",
    change: "+8%",
    icon: Users,
    gradient: "from-blue-50 to-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Tasks",
    value: "512",
    change: "+15%",
    icon: CheckCircle2,
    gradient: "from-emerald-50 to-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Storage",
    value: "2.4 GB",
    change: "+4%",
    icon: HardDrive,
    gradient: "from-orange-50 to-orange-100",
    iconColor: "text-orange-600",
  },
];

const projects = [
  {
    name: "Nexora Website",
    tech: "React + Node",
    color: "bg-violet-500",
  },
  {
    name: "Mobile App",
    tech: "React Native",
    color: "bg-blue-500",
  },
  {
    name: "AI Assistant",
    tech: "FastAPI",
    color: "bg-emerald-500",
  },
];

const activities = [
  {
    user: "Rahul",
    action: "pushed 3 commits",
    color: "bg-violet-500",
  },
  {
    user: "Diya",
    action: "uploaded UI",
    color: "bg-blue-500",
  },
  {
    user: "Karan",
    action: "created discussion",
    color: "bg-emerald-500",
  },
  {
    user: "You",
    action: "deployed v2.1",
    color: "bg-orange-500",
  },
];


function DashboardPreview() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_40px_100px_rgba(15,23,42,0.15)]">

      <Topbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 bg-slate-50 p-6">

          <h2 className="text-2xl font-bold text-slate-800">
            Good morning, Avni 
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Here's what's happening with your workspace.
          </p>

          {/* Stats */}
<div className="mt-6 grid grid-cols-4 gap-4">
  {stats.map((stat) => {
    const Icon = stat.icon;

    return (
      <div
        key={stat.title}
        className={`rounded-2xl bg-gradient-to-br ${stat.gradient}
        border border-slate-200 p-5 shadow-sm
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl`}
      >
        <div className="flex items-center justify-between">
          <Icon className={stat.iconColor} size={20} />

          <span className="text-sm font-semibold text-emerald-600">
            {stat.change}
          </span>
        </div>

        <p className="mt-5 text-sm text-slate-500">
          {stat.title}
        </p>

        <h3 className="mt-1 text-3xl font-bold">
          {stat.value}
        </h3>
      </div>
    );
  })}
</div>

          {/* Bottom */}

          <div className="mt-6 grid grid-cols-2 gap-5">

            <div className="rounded-2xl bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <h3 className="font-semibold">
                  Recent Projects
                </h3>

                <button className="text-sm text-violet-600">
                  View All
                </button>

              </div>

             <div className="mt-4 space-y-3">

  {projects.map((project) => (

    <div
      key={project.name}
      className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:bg-white hover:shadow-md"
    >

      <div className="flex items-center gap-3">

        <div className={`h-3 w-3 rounded-full ${project.color}`} />

        <div>

          <h4 className="font-medium">
            {project.name}
          </h4>

          <p className="text-sm text-slate-500">
            {project.tech}
          </p>

        </div>

      </div>

      <div className="flex -space-x-2">

        <div className="h-8 w-8 rounded-full border-2 border-white bg-violet-400"></div>

        <div className="h-8 w-8 rounded-full border-2 border-white bg-blue-400"></div>

        <div className="h-8 w-8 rounded-full border-2 border-white bg-pink-400"></div>

      </div>

    </div>

  ))}

</div>

            </div>

            <div className="mt-5 space-y-4">

  {activities.map((activity) => (

    <div
      key={activity.user}
      className="flex items-center gap-3"
    >

      <div className={`h-3 w-3 rounded-full ${activity.color}`} />

      <div>

        <p className="font-medium">

          {activity.user}

          <span className="ml-1 font-normal text-slate-500">

            {activity.action}

          </span>

        </p>

      </div>

    </div>

  ))}

</div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardPreview;