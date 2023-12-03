// src/server.js

import express from "express";
import { writeFile } from "fs";
import { join } from "path";
import cors from "cors";
import { Buffer } from "buffer";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// rest of your code...

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:1111", // replace with your client-side app's domain
  })
);

app.use(express.json({ limit: "50mb" }));

app.post("/save-image", (req, res) => {
  console.log("first");
  const { image, count } = req.body;
  const data = image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(data, "base64");
  const filePath = join(__dirname, "images", `frame_${count}.png`);

  writeFile(filePath, buffer, (err) => {
    if (err) {
      console.log("Failed to save image:", err);
      res.sendStatus(500);
    } else {
      console.log("Image saved successfully");
      res.sendStatus(200);
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
