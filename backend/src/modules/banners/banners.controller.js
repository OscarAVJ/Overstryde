import { isValidObjectId } from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import bannerModel from "./models/banner.model.js";

const bannerController = {};

const parseJsonField = (value, fieldName) => {
  if (value === undefined) return undefined;
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch (error) {
    throw new Error(`${fieldName} must be valid JSON`);
  }
};

const parseBooleanField = (value) => {
  if (value === undefined) return undefined;
  if (typeof value === "boolean") return value;
  if (typeof value === "string" && value.trim().toLowerCase() === "true") return true;
  if (typeof value === "string" && value.trim().toLowerCase() === "false") return false;
  return value;
};

const validateData = (payload, { isUpdate = false } = {}) => {
  let { title, description, shortcut, shortcut_title, path, active } = payload;

  title = title?.trim();
  description = description?.trim();
  active = parseBooleanField(active);

  try {
    shortcut = parseJsonField(shortcut, "Shortcut");
  } catch (error) {
    return { error: error.message };
  }

  if (shortcut === undefined && (shortcut_title !== undefined || path !== undefined)) {
    shortcut = { shortcut_title, path };
  }

  if (!isUpdate || title !== undefined) {
    if (!title) {
      return { error: "Banner title required" };
    }
  }

  if (active !== undefined && typeof active !== "boolean") {
    return { error: "Active must be a boolean" };
  }

  if (shortcut !== undefined) {
    if (typeof shortcut !== "object" || Array.isArray(shortcut)) {
      return { error: "Shortcut must be an object" };
    }

    shortcut = {
      shortcut_title: shortcut.shortcut_title?.trim(),
      path: shortcut.path?.trim(),
    };

    if (!shortcut.shortcut_title) {
      return { error: "Shortcut title required" };
    }
    if (!shortcut.path) {
      return { error: "Shortcut path required" };
    }
  }

  const banner = {
    title,
    description,
    shortcut,
    active,
  };

  Object.keys(banner).forEach((key) => {
    if (banner[key] === undefined) {
      delete banner[key];
    }
  });

  return { banner };
};

const deleteCloudinaryImage = async (image) => {
  if (image?.public_id) {
    await cloudinary.uploader.destroy(image.public_id);
  }
};

bannerController.getBanners = async (req, res) => {
  try {
    const banners = await bannerModel.find().sort({ createdAt: -1 });
    return res.status(200).json(banners);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

bannerController.getActiveBanners = async (req, res) => {
  try {
    const banners = await bannerModel
      .find({ active: true })
      .sort({ createdAt: -1 });
    return res.status(200).json(banners);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

bannerController.getBannerById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid banner id" });
    }

    const banner = await bannerModel.findById(id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    return res.status(200).json(banner);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

bannerController.insertBanner = async (req, res) => {
  try {
    const validateDataResult = validateData(req.body);
    if (validateDataResult.error) {
      return res.status(400).json({ message: validateDataResult.error });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Banner image required" });
    }

    const banner = validateDataResult.banner;
    banner.image = {
      path: req.file.path,
      public_id: req.file.filename,
    };

    const newBanner = new bannerModel(banner);
    const savedBanner = await newBanner.save();

    return res.status(201).json({
      message: "Banner created successfully",
      banner: savedBanner,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

bannerController.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid banner id" });
    }

    const bannerToUpdate = await bannerModel.findById(id);
    if (!bannerToUpdate) {
      return res.status(404).json({ message: "Banner not found" });
    }

    const validateDataResult = validateData(req.body, { isUpdate: true });
    if (validateDataResult.error) {
      return res.status(400).json({ message: validateDataResult.error });
    }

    const banner = validateDataResult.banner;
    if (req.file) {
      banner.image = {
        path: req.file.path,
        public_id: req.file.filename,
      };
    }

    const updatedBanner = await bannerModel.findByIdAndUpdate(id, banner, {
      new: true,
    });

    if (req.file) {
      await deleteCloudinaryImage(bannerToUpdate.image);
    }

    return res.status(200).json({
      message: "Banner updated successfully",
      banner: updatedBanner,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

bannerController.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid banner id" });
    }

    const deletedBanner = await bannerModel.findByIdAndDelete(id);
    if (!deletedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    await deleteCloudinaryImage(deletedBanner.image);

    return res.status(200).json({
      message: "Banner deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default bannerController;
