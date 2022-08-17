import { Request, Response } from "express";
import { IUpload } from "../interfaces";
import { DBHelper } from "../utils";

var uploadedFiles: IUpload[] = [];

const FileController = {
	uploadOne: async (req: Request, res: Response) => {
		if (!req.file) return res.status(400).json({ message: "Files not found!" });
		const { file } = req;
		const newFile: IUpload = {
			fileName: file.originalname,
			size: file.size,
			type: file.mimetype,
		};
		uploadedFiles.push(newFile);
		return res.status(200).json({ message: "1 file received", data: uploadedFiles });
	},

	uploadMany: async (req: Request, res: Response) => {
		if (!req.files) return res.status(400).json({ message: "Files not found!" });
		const FILES = req.files as Express.Multer.File[];
		FILES.forEach((file) => {
			const newFile: IUpload = {
				fileName: file.originalname,
				size: file.size,
				type: file.mimetype,
			};
			uploadedFiles.push(newFile);
		});
		return res.status(200).json({ message: `${FILES.length} files received`, data: uploadedFiles });
	},

	findOneById: async (req: Request, res: Response) => {
		if (!req.files) return res.status(400).json({ message: "No file found to update!" });
		const { id } = req.params;
		const file = await DBHelper.findFileById(id);
		if (!file.ok || !file) return res.status(400).json({ message: file.error });
		console.log(file);
	},
};

export default FileController;

