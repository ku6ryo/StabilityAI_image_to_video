import axios from "axios";
import fs from "node:fs";
import { config } from "dotenv";
config();

const generationID = "1731f3473dfba935a582a187567fd21d17e0031013dc15511c51f32328298dc4";

;(async () => {
const response = await axios.request({
  url: `https://api.stability.ai/v2beta/image-to-video/result/${generationID}`,
  method: "GET",
  validateStatus: undefined,
  responseType: "arraybuffer",
  headers: {
    Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
    Accept: "video/*", // Use 'application/json' to receive base64 encoded JSON
  },
});

if (response.status === 202) {
  console.log("Generation is still running, try again in 10 seconds.");
} else if (response.status === 200) {
  console.log("Generation is complete!");
  fs.writeFileSync("video.mp4", Buffer.from(response.data));
} else {
  throw new Error(`Response ${response.status}: ${response.data.toString()}`);
}
})()