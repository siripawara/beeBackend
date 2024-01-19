const express = require('express')
const db = require("./config")
const { collection, addDoc,getDocs,updateDoc,doc,serverTimestamp ,query,where, orderBy,limit} =  require("firebase/firestore");
const app = express()
app.use(express.urlencoded({extended:true}))

//send data to db
app.get('/:temp/:humidity/:weight',async (req,res)=>{
    console.log("siri")
    try {
        const docRef = await addDoc(collection(db, "sensor"), {
          temp:req.params.temp,
          humidity : req.params.humidity,  
          weight : req.params.weight, 
          date: serverTimestamp(),    
        });
        console.log("Document written with ID: ", docRef.id);
        res.status(200).send("sent")
      } catch (e) {
        console.error("Error adding document: ", e);
        res.status(400).send(error)
      }
})

// //send live data
// app.get("/updatelive/:temp/:humidity",async(req,res)=>{
//     const docRef = doc(db,'sensorlive','0001')
//     try {
//         await updateDoc(docRef,{
//             temp:req.params.temp,
//             humidity : req.params.humidity,
//         })
//         res.status(200).send("Live data Updated")
//     } catch (error) {
//         console.log("error with live data overWrite")
//         res.status(400).send(error)
//     }


    
// })


//get live data
app.get("/live",async(req,res)=>{
    const colRef = collection(db, "sensor");
    const q = query(colRef,orderBy('date','desc'),limit(2))
    try {
        const docsSnap = await getDocs(q);
        const arr = []
        docsSnap.forEach((doc,index) => {
                arr.push(doc.data());
        })
        res.send(arr[0])
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})


//get data in range
app.get('/data', async(req,res)=>{
    const colRef = collection(db, "sensor");
    const start = new Date('2023-12-25');
    const q = query(colRef,where('date', '>', start))
    const docsSnap = await getDocs(q);
    try {
        arr = []
        docsSnap.forEach(doc => {
            arr.push(doc.data());
        })
        res.status(200).json(arr)
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})

app.listen(3000,()=>console.log("listen on port 300"))

