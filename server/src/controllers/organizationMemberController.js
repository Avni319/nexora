import Organization from "../models/Organization.js";
import User from "../models/User.js";

// ==============================
// Add Member
// ==============================

export const addMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const organization = await Organization.findById(id);

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const alreadyMember = organization.members.some(
      (member) => member.toString() === user._id.toString()
    );

    if (alreadyMember) {
      return res.status(400).json({
        success: false,
        message: "User is already a member",
      });
    }

    organization.members.push(user._id);

    await organization.save();

    await organization.populate(
      "members",
      "fullName email avatar"
    );

    res.status(200).json({
      success: true,
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

// ==============================
// Get Members
// ==============================

export const getMembers = async (req, res) => {
  try {

    const organization = await Organization.findById(
      req.params.id
    ).populate(
      "members",
      "fullName email avatar"
    );

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    res.status(200).json({
      success: true,
      members: organization.members,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ==============================
// Remove Member
// ==============================

export const removeMember = async (req, res) => {
  try {

    const { id, memberId } = req.params;

    const organization =
      await Organization.findById(id);

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    organization.members =
      organization.members.filter(
        (member) =>
          member.toString() !== memberId
      );

    await organization.save();

    await organization.populate(
      "members",
      "fullName email avatar"
    );

    res.status(200).json({
      success: true,
      members: organization.members,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};