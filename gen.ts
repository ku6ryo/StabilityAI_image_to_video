import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";
import { config } from "dotenv";
config();

const data = new FormData();
data.append("image", fs.readFileSync("./image.jpg"), "image.jpg");
data.append("seed", 0);
data.append("cfg_scale", 1.8);
data.append("motion_bucket_id", 127);

;(async () => {
    const response = await axios.request({
    url: `https://api.stability.ai/v2beta/image-to-video`,
    method: "post",
    validateStatus: undefined,
    headers: {
        authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        ...data.getHeaders(),
    },
    data: data,
    });
    console.log(response.data)
    console.log("Generation ID:", response.data.id);
})()