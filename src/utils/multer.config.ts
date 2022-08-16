import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { mkdirSync } from "fs";
import { resolve } from "path";

// array of allowed mimeTypes that can be uploaded
const fileTypes = ["image/png", "image/jpg", "image/jpeg"];

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const storage = multer.diskStorage({
	destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback): void => {
		const path = resolve(__dirname, "..", "temp");
		mkdirSync(path, { recursive: true });
		cb(null, path);
	},
	filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});
export const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
	if (fileTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error(`${file.mimetype.split("/")[1]} file is not allowed`));
	}
};

