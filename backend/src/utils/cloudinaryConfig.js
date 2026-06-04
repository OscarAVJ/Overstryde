import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "./config.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_key,
  api_secret: config.cloudinary.cloudinary_secret,
});

function uploadImageToFolder(folderName) {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `${folderName}`,
      allowed_formats: ["jpg", "png", "jpeg", "webp", "svg", "pdf"],
    },
  });

  return multer({ storage });
}

export default uploadImageToFolder;
