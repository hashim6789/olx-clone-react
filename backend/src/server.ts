import app from "./app";
import dotenv from "dotenv";

dotenv.config();
const port: string = process.env.PORT || "";

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
