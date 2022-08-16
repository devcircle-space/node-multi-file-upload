import { Request, Response } from "express";

const FileController = {
	uploadOne: async (req: Request, res: Response) => {
		return res.status(200).json({ message: "1 file received", data: req.file });
	},
	uploadMany: async (req: Request, res: Response) => {
		if (!req.files) return res.status(400).json({ message: "Files not found!" });
		const { files } = req;
		return res.status(200).json({ message: `${files.length} files received`, data: files });
	},
};

export default FileController;

