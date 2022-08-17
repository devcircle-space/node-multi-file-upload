/**
 * to create a single file upload field, either single() method can be used
 * or array() method can used and allowed number of files can be specified.
 * using .array() method provides a flexibility over .single() method
 */

import { Router } from "express";

import { uploadHandler } from "../middlewares";
import { FileController } from "../controllers";

const router = Router();

router.post("/", uploadHandler.array("image", 3), FileController.addFile);
router.get("/get/:id", uploadHandler.single("image"), FileController.findOneById);
// router.post("/single", uploadHandler.single("image"), FileController.uploadOne);
// router.post("/many", uploadHandler.array("image", 3), FileController.uploadMany);

export default router;

