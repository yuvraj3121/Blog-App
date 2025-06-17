import { Save } from "../models/save.model.js";

const createSave = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user._id;

    const newSave = await Save.create({
      userId,
      blogId,
    });

    res.status(201).json({ message: "Blog saved successfully", Save: newSave });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving blog", error: error.message });
  }
};

const getAllSaved = async (req, res) => {
  try {
    const userId = req.user._id;

    const saves = await Save.find({ userId })
      .populate("userId")
      .populate("blogId")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "saved blogs fetched successfully",
      count: saves.length,
      saves,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching saved blogs", error: error.message });
  }
};

const removeSaved = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user._id;

    const deletedSaved = await Save.findOneAndDelete({ blogId, userId });
    if (!deletedSaved) {
      return res.status(404).json({ message: "Saved blog not found" });
    }
    res.status(200).json({ message: "Saved blog removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing saved blog", error: error.message });
  }
};

const isSaved = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user._id;

    const savedEntry = await Save.findOne({ blogId, userId });
    if (savedEntry) {
      return res.status(200).json({ message: "Already Saved", saved: true });
    }

    res.status(200).json({ message: "Not saved", saved: false });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export { createSave, getAllSaved, removeSaved, isSaved };
