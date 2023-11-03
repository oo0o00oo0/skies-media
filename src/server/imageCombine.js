// src/server.js

import express from "express";
import cors from "cors";
import { readFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";
// import { readFileSync } from "fs";
import { Buffer } from "buffer";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(
  cors({
    origin: "http://localhost:1111",
  })
);

app.use(express.json({ limit: "50mb" }));

app.post("/process-image", async (req, res) => {
  const { imagePath } = req.body;

  // Read the image data from file system
  try {
    const filePath = join(__dirname, "data", imagePath);
    const buffer = await readFile(filePath);

    const base64Image = buffer.toString("base64");

    // res.json({ message: "Image processed successfully" });
    res.json({ image: base64Image });
  } catch (error) {
    console.error("Error reading image data:", error);
    res.sendStatus(500);
  }
});

app.post("/process-image-raw", async (req, res) => {
  const { imagePath } = req.body;

  // Read the image data from file system
  try {
    const filePath = join(__dirname, "data", imagePath);
    const buffer = await readFile(filePath);

    const base64Image = buffer.toString("base64");

    // Convert the base64 encoded string back to a buffer
    const decodedBuffer = Buffer.from(base64Image, "base64");

    // Use sharp to process the image
    const image = sharp(decodedBuffer);
    const rawBuffer = await image.raw().toBuffer();

    res.json({ buffer: rawBuffer });
  } catch (error) {
    console.error("Error reading image data:", error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
