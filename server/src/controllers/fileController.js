import File from "../models/File.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file",
      });
    }

    const { projectId } = req.body;

    const file = await File.create({
      project: projectId,
      uploadedBy: req.user.userId,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      fileUrl: `/uploads/${req.file.filename}`,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
    });

    await file.populate(
      "uploadedBy",
      "fullName email avatar"
    );

    res.status(201).json({
      success: true,
      file,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getFiles = async (req, res) => {
  try {
    const { projectId } = req.params;

    const files = await File.find({
      project: projectId,
    })
      .populate("uploadedBy", "fullName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      files,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteFile = async (req, res) => {
  try {
    await File.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "File deleted",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};