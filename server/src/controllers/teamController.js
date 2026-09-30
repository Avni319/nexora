import User from "../models/User.js";
import Team from "../models/Team.js";

export const createTeam = async (req, res) => {
  try {
    const team = await Team.create({
      ...req.body,
      createdBy: req.user.userId,
    });

    res.status(201).json({
      success: true,
      team,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getTeams = async (req, res) => {
  try {
    const { organizationId } = req.params;

    const teams = await Team.find({
      organization: organizationId,
    })
      .populate("members", "fullName email avatar")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      teams,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    await Team.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Team deleted",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      team,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const addMemberToTeam = async (req, res) => {
  try {

    const { id } = req.params;
    const { memberId } = req.body;

    const user = await User.findById(memberId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const team = await Team.findById(id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    if (team.members.includes(memberId)) {
      return res.status(400).json({
        success: false,
        message: "Member already exists",
      });
    }

    team.members.push(memberId);

    await team.save();

    await team.populate(
      "members",
      "fullName email avatar"
    );

    res.status(200).json({
      success: true,
      team,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

export const removeMemberFromTeam = async (req, res) => {
  try {

    const { id, memberId } = req.params;

    const team = await Team.findById(id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    team.members = team.members.filter(
      (member) => member.toString() !== memberId
    );

    await team.save();

    await team.populate(
      "members",
      "fullName email avatar"
    );

    res.status(200).json({
      success: true,
      team,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};


