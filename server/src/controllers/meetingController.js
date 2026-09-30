import { createToken } from "../config/livekit.js";

export const joinMeeting = async (req, res) => {
  try {
    const { roomName } = req.body;

    const identity = req.user.userId;

    const token = await createToken(
      identity,
      roomName
    );

    res.status(200).json({
      success: true,
      token,
      url: process.env.LIVEKIT_URL,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to join meeting",
    });

  }
};