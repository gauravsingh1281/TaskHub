import app from "./src/app.js";
import connectDb from "./src/config/db.js";
const port = process.env.PORT || 3000;

connectDb();

app.listen(port, () => {
  console.log(`Server started listening on port ${port}`);
});
