import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.userId).select("-password");

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

export const updateProfile = async (req, res) => {

  try {

    const {
      fullName,
      bio,
      jobTitle,
      github,
      skills,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(

      req.user.userId,

      {
        fullName,
        bio,
        jobTitle,
        github,
        skills,
      },

      {
        new: true,
        runValidators: true,
      }

    ).select("-password");

    res.status(200).json({

      success: true,

      message: "Profile updated successfully",

      user: updatedUser,

    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};