import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

app.get("/", async (req: Request, res: Response) => {
	res.status(200).json({ message: "Hello World!" });
});

export default app;

