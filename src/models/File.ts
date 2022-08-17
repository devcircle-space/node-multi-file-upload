import { Schema, model } from "mongoose";
import { FileType } from "../interfaces";

const FileSchema = new Schema<FileType.IFileDocument, FileType.IFileModel>(
	{
		filename: {
			type: String,
			required: true,
		},
		mimetype: {
			type: String,
			required: true,
		},
		size: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true },
);

const File = model<FileType.IFileDocument, FileType.IFileModel>("files", FileSchema);

export default File;

