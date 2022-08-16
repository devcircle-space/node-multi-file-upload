import express, { Application, Request, Response } from "express";
import cors from "cors";

import { FileRoute } from "../routes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

app.use("/upload", FileRoute);

app.get("/", async (req: Request, res: Response) => {
	res.status(200).json({ message: "Hello World!" });
});

export default app;

