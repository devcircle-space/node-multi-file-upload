import multer from "multer";
import { fileFilter, storage } from "../utils/multer.config";

const uploadHandler = multer({ storage, fileFilter });

export default uploadHandler;

