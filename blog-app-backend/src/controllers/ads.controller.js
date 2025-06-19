import { Ad } from "../models/ads.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createAd = async (req, res) => {
  try {
    const { position } = req.body;

    const adImageLocalPath = req.files?.adImage?.[0]?.path;
    const adImage = await uploadOnCloudinary(adImageLocalPath);

    const newAd = await Ad.create({
      adImage: adImage?.url || "",
      position,
      totalClicks: 0,
    });

    res.status(201).json({ message: "Ad created successfully.", ad: newAd });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating ad", error: error.message });
  }
};

const updateAd = async (req, res) => {
  try {
    const { position } = req.body;
    const adId = req.params.id;

    const existingAd = await Ad.findById(adId);
    if (!existingAd) {
      return res.status(404).json({ message: "Ad not found" });
    }

    let adImageUrl = existingAd.adImage;
    const adImageLocalPath = req.files?.adImage?.[0]?.path;
    if (adImageLocalPath) {
      const adImage = await uploadOnCloudinary(adImageLocalPath);
      adImageUrl = adImage?.url || adImageUrl;
    }

    const newAd = await Ad.findByIdAndUpdate(
      adId,
      {
        adImage: adImageUrl,
        position,
      },
      {
        new: true,
      }
    );

    res.status(201).json({ message: "Ad updated successfully.", ad: newAd });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating ad", error: error.message });
  }
};

const getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Ads fetched successfully.",
      count: ads.length,
      ads,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching ads", error: error.message });
  }
};

const updateAdStatus = async (req, res) => {
  try {
    const adId = req.params.id;
    const { status } = req.body;

    const updatedAd = await Ad.findByIdAndUpdate(
      adId,
      { status },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Ad status updated successfully.", ad: updatedAd });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating status", error: error.message });
  }
};

const trackClick = async (req, res) => {
  try {
    const adId = req.params.id;

    const ad = await Ad.findById(adId);
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    ad.totalClicks = (ad.totalClicks || 0) + 1;
    await ad.save();

    res
      .status(200)
      .json({ message: "Click tracked", totalClicks: ad.totalClicks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error tracking click", error: error.message });
  }
};

const deleteAd = async (req, res) => {
  try {
    const adId = req.params.id;
    const deleted = await Ad.findByIdAndDelete(adId);

    if (!deleted) {
      return res.status(404).json({ message: "Ad not found" });
    }

    res.status(200).json({ message: "Ad deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting ad", error: error.message });
  }
};

export { createAd, updateAd, getAllAds, deleteAd, updateAdStatus, trackClick };
