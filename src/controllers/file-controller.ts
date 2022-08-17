import { Request, Response } from "express";
import { DBHelper } from "../utils";

const FileController = {
	findAllFiles: async (req: Request, res: Response) => {
		const file = await DBHelper.getAllFiles();
		if (!file || !file.ok) return res.status(400).json({ message: file.error });
		return res.status(200).json({ message: file.data });
	},

	findOneById: async (req: Request, res: Response) => {
		const { id } = req.params;
		const file = await DBHelper.findFileById(id);
		if (!file || !file.ok) return res.status(400).json({ message: file.error });
		return res.status(200).json({ message: file.data });
	},

	addFile: async (req: Request, res: Response) => {
		if (!req.files) return res.status(400).json({ message: "Mandatory data missing!" });
		const FILES = req.files as Express.Multer.File[];
		const file = await DBHelper.addNewFile(FILES);
		if (!file || !file.ok) return res.status(400).json({ message: file!.error });
		return res.status(200).json({ message: file.data });
	},

	updateOneById: async (req: Request, res: Response) => {
		if (!req.files) return res.status(400).json({ message: "Mandatory data missing!" });
		const { id } = req.params;
		const FILE = req.files as Express.Multer.File[];

		const file = await DBHelper.findFileById(id);
		if (file.ok) {
			const isUpdated = await DBHelper.updateFileById(FILE[0], id);
			if (!isUpdated) return res.status(400).json({ message: "Could not update file" });
			return res.status(200).json({ message: isUpdated.data });
		}
	},

	deleteOneById: async (req: Request, res: Response) => {
		const { id } = req.params;
		const file = await DBHelper.findFileById(id);
		if (!file || !file.ok) return res.status(400).json({ message: file.error });
		if (file.ok) {
			const isDeleted = await DBHelper.deleteFileById(id);
			if (!isDeleted) return res.status(400).json({ message: "Could not delete file" });
			return res.status(200).json({ message: isDeleted.data });
		}
	},
};

export default FileController;

