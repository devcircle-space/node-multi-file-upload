import { connect, MongooseError, Types } from "mongoose";
import { FileType } from "../interfaces";
import File from "../models/File";

type OperationReturnType = {
	ok: boolean;
	error?: string;
	data?:
		| (FileType.IFileDocument & {
				_id: Types.ObjectId;
		  })
		| (FileType.IFileDocument & {
				_id: Types.ObjectId;
		  })[]
		| string
		| null;
};

const DBHelper = {
	connectToDb: (uri: string) => {
		connect(uri, () => console.info("MongoDB connected!"));
	},

	getAllFiles: async (): Promise<OperationReturnType> => {
		try {
			const file = await File.find();
			return { ok: true, data: file };
		} catch (error) {
			const { message } = error as MongooseError;
			console.error(`Error in getting file by id: ${message}`);
			return { ok: false, error: message };
		}
	},

	findFileById: async (id: string): Promise<OperationReturnType> => {
		if (!id) return { ok: false, error: "ID not found!" };
		try {
			const file = await File.findById(id);
			return { ok: true, data: file };
		} catch (error) {
			const { message } = error as MongooseError;
			console.error(`Error in getting file by id: ${message}`);
			return { ok: false, error: message };
		}
	},

	addNewFile: async (data: Express.Multer.File[]): Promise<OperationReturnType> => {
		if (!data) return { ok: false, error: "Data not found!" };
		var newFileArray: FileType.IFileDocument[] = [];
		data.forEach((file) => {
			newFileArray.push(new File({ ...file }));
		});
		try {
			newFileArray.map(async (node) => {
				return await node.save();
			});
			return { ok: true, data: `${newFileArray.length} files uploaded` };
		} catch (error) {
			const { message } = error as MongooseError;
			console.error(`Error in uploading file(s): ${message}`);
			return { ok: false, error: message };
		}
	},

	updateFileById: async (data: Express.Multer.File, fileId: string): Promise<OperationReturnType> => {
		if (!data || !fileId) return { ok: false, error: "Either file or fileId is missing!" };
		try {
			await File.updateOne({ _id: fileId }, { ...data }, { upsert: false });
			return { ok: true, data: `File updated` };
		} catch (error) {
			const { message } = error as MongooseError;
			console.error(`Error in updating file: ${message}`);
			return { ok: false, error: message };
		}
	},

	deleteFileById: async (id: string) => {
		if (!id) return { ok: false, error: "ID not found!" };
		try {
			const file = await File.deleteOne({ _id: id });
			return { ok: true, data: `File ${id} deleted` };
		} catch (error) {
			const { message } = error as MongooseError;
			console.error(`Error in deleting file ${id}: ${message}`);
			return { ok: false, error: message };
		}
	},
};

// 62fc8de85153ffb774d8b375
export default DBHelper;

