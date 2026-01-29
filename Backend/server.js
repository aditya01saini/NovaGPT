// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import mongoose from "mongoose";

// import ChatRoutes from "./routes/chat.js";
// import UserRoutes from "./routes/user.routes.js"

// const app = express();
// const PORT = process.env.PORT || 8080;



// const connectDB = async () => {
// try {
//   await mongoose.connect(process.env.MONGODB_URI);
//   console.log("connected with database");
// }catch(err) {
//   console.log("failed with connect with db", err);
// }
// } 

// app.use(express.json());
// app.use(cors({
//    origin: [
//       // "http://localhost:5173",               
//       "https://nova-gpt-five.vercel.app",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
// }));


// app.use("/api", ChatRoutes)
// app.use("/api", UserRoutes)



// app.listen(PORT, () => {
//   console.log(`server running on ${PORT}`);
//   connectDB();
// });


import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";

import ChatRoutes from "./routes/chat.js";
import UserRoutes from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected with database");
  } catch (err) {
    console.log("failed to connect with db", err);
  }
};

app.use(express.json());

app.use(
  cors({
    origin: "https://nova-gpt-five.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);


app.use("/api", ChatRoutes);
app.use("/api", UserRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`server running on ${PORT}`);
});

