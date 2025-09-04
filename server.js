import express from "express";
import fetch from "node-fetch";
import FormData from "form-data";

const app = express();
app.use(express.json({ limit: "10mb" }));

const TELEGRAM_TOKEN = process.env.8441020275:AAFbmi0gosxpm3Oo1uHa4tyoR7WkacUFhFw;
const CHAT_ID = process.env.1227787506;

app.post("/upload", async (req, res) => {
  const photo = req.body.image;
  const base64Data = photo.replace(/^data:image\/png;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  const formData = new FormData();
  formData.append("chat_id", CHAT_ID);
  formData.append("photo", buffer, { filename: "foto.png" });

  await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendPhoto`, {
    method: "POST",
    body: formData
  });

  res.send("ok");
});

app.listen(process.env.PORT || 3000, () => console.log("Server başladı ✅"));