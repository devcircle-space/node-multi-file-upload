require("regenerator-runtime");

import { app } from "./utils";

const PORT: string | number = process.env.PORT || 4001;

const server = app.listen(PORT, () => console.info(`Server running on port ${PORT}`));

// will be handy if tests are written later
export default server;

