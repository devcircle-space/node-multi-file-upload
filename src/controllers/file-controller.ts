import { Request, Response } from "express";
import { FileType } from "../interfaces";
import { DBHelper } from "../utils";

var uploadedFiles: FileType.IFile[] = [];

const FileController = {
	findOneById: async (req: Request, res: Response) => {
		if (!req.files) return res.status(400).json({ message: "No file found to update!" });
		const { id } = req.params;
		const file = await DBHelper.findFileById(id);
		if (!file.ok || !file) return res.status(400).json({ message: file.error });
		console.log(file);
	},

	addFile: async (req: Request, res: Response) => {
		if (!req.files) return res.status(400).json({ message: "Mandatory data missing!" });
		const FILES = req.files as Express.Multer.File[];
		const file = await DBHelper.addNewFile(FILES);
		if (!file.ok || !file) return res.status(400).json({ message: file.error });
		return res.status(200).json({ message: file.data });
	},
};

export default FileController;

