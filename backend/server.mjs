import express from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";

import authenticate from "./authenticate.mjs";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 5000;

// Set EJS as the view engine and specify the views directory
app.set("view engine", "ejs");

app.get("/main", (req, res) => {
  res.render("main.ejs");
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
