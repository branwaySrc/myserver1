import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router";

const app = express();
const server = http.createServer(app);
const localhostPort = 8080;

app.use(
	cors({
		credentials: true,
	})
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

server.listen(localhostPort, () => {
	console.log("server is running on http://localhost:" + localhostPort + "/");
});

dotenv.config();
const db = mongoose;
const uri = process.env.MONGODB_URL;
db.Promise;
db.connect(uri)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error: Error) => {
		console.log(error);
	});

app.use("/", router());
