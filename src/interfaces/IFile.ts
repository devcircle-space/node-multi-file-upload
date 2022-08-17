import { Document, Model } from "mongoose";

export interface IFile {
	mimetype: string;
	size: number;
	filename: string;
}
export interface IFileDocument extends IFile, Document {}
export interface IFileModel extends Model<IFileDocument> {}

