import { connect, MongooseError } from "mongoose";
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
};

export default DBHelper;

