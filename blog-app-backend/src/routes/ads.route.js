import express from "express";
import {
  createAd,
  updateAd,
  getAllAds,
  updateAdStatus,
  trackClick,
  deleteAd,
} from "../controllers/ads.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
  "/createAd",
  upload.fields([{ name: "adImage", maxCount: 1 }]),
  createAd
);
router.post(
  "/updateAd/:id",
  upload.fields([{ name: "adImage", maxCount: 1 }]),
  updateAd
);
router.get("/getAllAds", getAllAds);
router.patch("/updateStatus/:id", updateAdStatus);
router.patch("/trackClick/:id", trackClick);
router.delete("/deleteAd/:id", deleteAd);

export default router;
