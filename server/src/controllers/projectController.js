import Project from "../models/Project.js";
import Organization from "../models/Organization.js";

// Create Project
export const createProject = async (req, res) => {
  try {
    const { name, description, organizationId } = req.body;

    if (!name || !organizationId) {
      return res.status(400).json({
        success: false,
        message: "Name and Organization are required",
      });
    }

    // Check organization exists
    const organization = await Organization.findById(organizationId);

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    const project = await Project.create({
      name,
      description,
      organization: organizationId,
      owner: req.user.userId,
      members: [req.user.userId],
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.userId,
    })
      .populate("organization", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user.userId,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};