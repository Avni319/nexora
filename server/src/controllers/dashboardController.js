import Project from "../models/Project.js";
import Organization from "../models/Organization.js";
import Task from "../models/Task.js";
import File from "../models/File.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [
      projects,
      organizations,
      tasks,
      files,
    ] = await Promise.all([
      Project.find({
        members: userId,
      })
        .sort({ createdAt: -1 })
        .limit(5),

      Organization.countDocuments({
        members: userId,
      }),

      Task.find(),

      File.find(),
    ]);

    const completedTasks = tasks.filter(
      (task) => task.status === "DONE"
    ).length;

    const pendingTasks = tasks.filter(
      (task) => task.status === "TODO"
    ).length;

    const storage =
      files.reduce(
        (sum, file) => sum + file.fileSize,
        0
      ) /
      (1024 * 1024);

    res.status(200).json({
      success: true,

      stats: {
        projects: projects.length,
        organizations,
        totalTasks: tasks.length,
        completedTasks,
        pendingTasks,
        storage: storage.toFixed(2),
      },

      recentProjects: projects,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};