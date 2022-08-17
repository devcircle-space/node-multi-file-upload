require("regenerator-runtime");
require("dotenv/config");

import { app, DBHelper } from "./utils";

const PORT: string | number = process.env.PORT || 4001;

const server = app.listen(PORT, () => console.info(`Server running on port ${PORT}`));

DBHelper.connectToDb(process.env.URI as string);

export default server;

