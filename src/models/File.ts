import { Schema, model } from "mongoose";

const FileSchema = new Schema(
	{
		fileName: {
			type: Schema.Types.String,
			required: true,
		},
		size: {
			type: Schema.Types.Number,
			required: true,
		},
		mimeType: {
			type: Schema.Types.String,
			required: true,
		},
	},
	{ timestamps: true },
);

const File = model("files", FileSchema);

export default File;
