import { Router } from "express";
import bannerController from "./banners.controller.js";
import uploadImageToFolder from "../../utils/cloudinaryConfig.js";

const bannerRouter = Router();

bannerRouter
  .route("/")
  .get(bannerController.getBanners)
  .post(uploadImageToFolder("banners").single("image"), bannerController.insertBanner);

bannerRouter.route("/active").get(bannerController.getActiveBanners);

bannerRouter
  .route("/:id")
  .get(bannerController.getBannerById)
  .put(uploadImageToFolder("banners").single("image"), bannerController.updateBanner)
  .delete(bannerController.deleteBanner);

export default bannerRouter;
