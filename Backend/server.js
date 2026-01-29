import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";

import ChatRoutes from "./routes/chat.js";
import UserRoutes from "./routes/user.routes.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());


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


// app.post("/test", async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "llama-3.1-8b-instant",
//       messages: [

//         {
//             role: "assistant",
//             content: "You are a helpful assistant. Answer clearly in plain text only."

//         },
       
//         {
//           role: "user",
//           content: req.body.message
//         },
//       ],
//       max_tokens: 100,
//     }),
//   };

//   try {
//     const response = await fetch(
//       "https://api.groq.com/openai/v1/chat/completions",
//       options,
//     );

//     const data = await response.json();
//     //console.log(data.choices[0].message.content)
//     res.json(data.choices[0].message.content);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });



