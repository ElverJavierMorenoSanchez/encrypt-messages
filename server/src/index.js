import app from "./app.js";
import { PORT, MONGO_URI } from "./config.js";
import mongoose from "mongoose";

// SERVER SETUP //
mongoose.connect(MONGO_URI).then((data) => {
  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
});
