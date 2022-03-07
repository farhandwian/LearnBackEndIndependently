const express = require("express");
const axios = require("axios");
const cors = require("cors");
const redis = require("redis");

const redisClient = redis.createClient();

const DEFAULT_EXPIRATION = 3600;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = 4000;
// app.get("/photos", async (req, res) => {
//   const albumId = req.params.albumId;
//   redisClient.get(`photos?albumId=${albumId}`, async (error, photos) => {
//     if (error) console.error(error);
//     if (photos != NULL) {
//       console.log("Cache Hit");
//       return res.json(JSON.parse(photos));
//     } else {
//       console.log("Cache Miss");
//       const { data } = await axios.get("", { params: {} });
//       redisClient.setex(`photos?albumId=${albumId}`,DEFAULT_EXPIRATION,JSON.stringify(data));
//       res.json(data)
//     }
//   });
// });

app.get("/random-data", async (req, res) => {
  const title = req.query.title;
  const randomData = await getSetOrCache(`random-data?title=${title}`, async () => {
    const { data } = await axios.get("https://api.publicapis.org/entries", { params: { title } });
    return data;
  });
  // redisClient.get(`random-data?title=${title}`, async (error, randomData) => {
  //   if (error) console.error(error);
  //   if (randomData != null) {
  //     console.log("Cache Hit");
  //     return res.json(JSON.parse(randomData));
  //   } else {
  //     console.log("Cache Miss");
  //     const { data } = await axios.get("https://api.publicapis.org/entries", { params: { title } });
  //     redisClient.setex(`random-data?title=${title}`, DEFAULT_EXPIRATION, JSON.stringify(data));
  //     res.json(data);
  //   }
  // });
});

// app.get("/random-data", async (req, res) => {
//   const title = req.params.title;
//   const { data } = await axios.get("https://api.publicapis.org/entries", { params: { title } });
//   res.json(data);
// });

app.get("/photos/:id", async (req, res) => {
  const { data } = await axios.get(`/${req.params.id}`);
});

function getSetOrCache(key, cb) {
  return new Promise((resolve, reject) => {
    redisClient.get(`random-data?title=${title}`, async (error, randomData) => {
      if (error) return reject(error);
      if (randomData != null) return resolve(res.json(JSON.parse(randomData)));
      const freshData = await cb();
      redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
      resolve(freshData);
      //else {
      //   console.log("Cache Miss");
      //   const { data } = await axios.get("https://api.publicapis.org/entries", { params: { title } });
      //   redisClient.setex(`random-data?title=${title}`, DEFAULT_EXPIRATION, JSON.stringify(data));
      //   res.json(data);
      // }
    });
  });
}

app.listen(PORT, () => console.log("tes"));
