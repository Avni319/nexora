
import Organization from "../models/Organization.js";

export const createOrganization = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Organization name is required",
      });
    }

    const organization = await Organization.create({
      name,
      description,
      owner: req.user.userId,
      members: [req.user.userId],
    });

    res.status(201).json({
      success: true,
      message: "Organization created successfully",
      organization,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find({
      members: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      organizations,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteOrganization = async (req, res) => {
  try {

    const organization = await Organization.findOne({
      _id: req.params.id,
      owner: req.user.userId,
    });

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    await organization.deleteOne();

    res.status(200).json({
      success: true,
      message: "Organization deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};