import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json({ limit: "10mb" }));

const TELEGRAM_TOKEN = "8441020275:AAFbmi0gosxpm3Oo1uHa4tyoR7WkacUFhFw";
const CHAT_ID = "1227787506";

// Foto göndərmə endpointi
app.post("/upload", async (req, res) => {
  const photo = req.body.image;
  const base64Data = photo.replace(/^data:image\/png;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  const formData = new FormData();
  formData.append("chat_id", CHAT_ID);
  formData.append("photo", new Blob([buffer]), "foto.png");

  await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendPhoto`, {
    method: "POST",
    body: formData
  });

  res.send("ok");
});

app.listen(3000, () => console.log("Server başladı ✅"));
