import express, { json, urlencoded } from "express";
import cors from "cors";
import connection from "../config/database/connection";
import Routes from "./routes";
import { createServer } from "http";
import { socketServer } from "../config/socket/socket";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 8000;
const server = createServer(app);

// Initialize the Socket.io server
const io = socketServer(server);

// connection with database
connection();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/api", Routes);

// Error handling middleware
app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
