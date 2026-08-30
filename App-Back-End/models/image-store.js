import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret,
});

export const imageStore = {
  getAllImages: async function () {
    const result = await cloudinary.api.resources();
    return result.resources;
  },

  uploadImage: async function (imagefile) {
    try {
      const result = await cloudinary.uploader.upload(imagefile.path, {
        folder: "Movies-App-fantasy-movies",
      });

      return result.secure_url;
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      throw new Error("Cloudinary upload failed");
    }
  },

  deleteImage: async function (img) {
    await cloudinary.uploader.destroy(img);
  },
};
