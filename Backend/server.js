import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";

import ChatRoutes from "./routes/chat.js";
import UserRoutes from "./routes/user.routes.js"

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({
   origin: [
      // "http://localhost:5173",               
      process.env.FRONTEND_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));


app.use("/api", ChatRoutes)
app.use("/api", UserRoutes)



app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
  connectDB();
});


const connectDB = async () => {
try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("connected with database");
}catch(err) {
  console.log("failed with connect with db", err);
}
} 
