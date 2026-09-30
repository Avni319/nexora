import Message from "../models/Message.js";

export const getMessages = async (req, res) => {
  try {
    const { projectId } = req.params;

    const messages = await Message.find({
      project: projectId,
    })
      .populate("sender", "fullName email avatar")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { projectId, text } = req.body;

    const message = await Message.create({
      project: projectId,
      sender: req.user.userId,
      text,
    });

    await message.populate(
      "sender",
      "fullName email avatar"
    );

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};