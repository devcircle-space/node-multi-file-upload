import { connect, MongooseError } from "mongoose";
import { FileType } from "../interfaces";
import File from "../models/File";

const URI = process.env.URI as string;

const DBHelper = {
	connectToDb: () => {
		connect(URI, () => console.info("MongoDB connected!"));
	},

	findFileById: async (id: string) => {
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

	addNewFile: async (data: Express.Multer.File[]) => {
		if (!data) return { ok: false, error: "Data not found!" };
		var newFileArray: FileType.IFileDocument[] = [];
		data.forEach((file) => {
			newFileArray.push(new File({ ...file }));
		});
		try {
			const result = newFileArray.map(async (node) => {
				return await node.save();
			});
			if (result) return { ok: true, data: `${newFileArray.length} files uploaded` };
		} catch (error) {
			const { message } = error as MongooseError;
			console.error(`Error in uploading file(s): ${message}`);
			return { ok: false, error: message };
		}
	},
};

export default DBHelper;

