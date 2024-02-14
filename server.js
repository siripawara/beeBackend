const express = require("express");
const db = require("./config");
const {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} = require("firebase/firestore");
const app = express();
var cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//send data to db
app.get("/:temp/:humidity/:weight", async (req, res) => {
  console.log("siri");
  try {
    const docRef = await addDoc(collection(db, "sensor"), {
      temp: req.params.temp,
      humidity: req.params.humidity,
      weight: req.params.weight,
      date: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    res.status(200).send("sent");
  } catch (e) {
    console.error("Error adding document: ", e);
    res.status(400).send(error);
  }
});

//get live data
app.get("/live", async (req, res) => {
  const colRef = collection(db, "sensor");
  const q = query(colRef, orderBy("date", "desc"), limit(2));
  try {
    const docsSnap = await getDocs(q);
    const arr = [];
    docsSnap.forEach((doc, index) => {
      arr.push(doc.data());
    });
    res.send(arr[0]);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

//get data in range
app.get("/data", async (req, res) => {
  const colRef = collection(db, "sensor");
  const start = new Date("2023-12-25");
  const q = query(colRef, where("date", ">", start));
  const docsSnap = await getDocs(q);
  try {
    arr = [];
    docsSnap.forEach((doc) => {
      arr.push(doc.data());
    });
    res.status(200).json(arr);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

app.get("/data2", async (req, res) => {
  const colRef = collection(db, "sensor");
  const q = query(colRef, orderBy("date", "desc"), limit(1));
  let dataArr = [];
  let lastDate;
  try {
    const docsSnap = await getDocs(q);
    lastDate = dateConvert(docsSnap.docs[0].data());
    lastDate.setMinutes(0);
    dataArr.push(docsSnap.docs[0].data());
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
  for (let i = 7; i >= 1; i--) {
    lastDate.setHours(lastDate.getHours() - 1);
    const q2 = query(
      colRef,
      orderBy("date", "asc"),
      where("date", ">", lastDate),
      limit(1)
    );
    const docsSnap2 = await getDocs(q2);
    dataArr.push(docsSnap2.docs[0].data());
  }

  res.json(dataArr.reverse()).status(200);
});
app.listen(3000, () => console.log("listen on port 3000"));

const dateConvert = (date) => {
  let ts = (date.date.seconds + date.date.nanoseconds / 1000000000) * 1000;
  return new Date(ts);
};
