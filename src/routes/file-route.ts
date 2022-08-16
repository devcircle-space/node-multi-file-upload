import { Router } from "express";

import { uploadHandler } from "../middlewares";
import { FileController } from "../controllers";

const router = Router();

router.post("/single", uploadHandler.single("image"), FileController.uploadOne);
router.post("/many", uploadHandler.array("image", 3), FileController.uploadMany);

export default router;

