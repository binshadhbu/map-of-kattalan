const express = require("express");
const cors = require("cors");
const User = require("./model/user.js");
const bcrypt = require("bcryptjs");
const Place = require('./model/Place.js');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const imageDownloader=require('image-downloader');
const cookieParser = require("cookie-parser");
const multer = require('multer');

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtsecret = "fsdfbdsifhaskjnadandua9d9w08erwje323e23e";
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const mongoURL =
  "mongodb+srv://binshadh:KBpw6qqyGsncf52C@cluster0.cnyptju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  res.json({ name, email, password });
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
  } catch (error) {
    res.status(422).json(error);
  }
  // res.json(userDoc);
  // console.log(userDoc);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id,name: userDoc.name},
        jwtsecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
      res.cookie("token", "");
    } else {
      res.json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});




app.get('/profile', (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, jwtsecret, {}, async (err, userData) => {
      if (err) throw err;
      const {name,email,_id} = await User.findById(userData.id);
      res.json({name,email,_id});
    });
  } else {
    res.json(null);
  }
});

app.post('/logout', (req,res) => {
  res.cookie('token', '').json(true);
});


app.post('/upload-by-link',async (req,res)=>{
  const {link} = req.body;
  const newName='photo'+Date.now()+'.jpg';
  await imageDownloader.image({
    url:link,
    dest:__dirname+'/uploads/'+newName,
  });
  console.log(link);
  res.json(newName);
});

const photosMiddleware = multer({dest:'/tmp'});
app.post('/upload', photosMiddleware.array('photos', 100), async (req,res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path,originalname,mimetype} = req.files[i];
    const url = await uploadToS3(path, originalname, mimetype);
    uploadedFiles.push(url);
  }
  res.json(uploadedFiles);
});

app.post('/places', (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {token} = req.cookies;
  const {
    title,address,addedPhotos,description,price,
    perks,extraInfo,checkIn,checkOut,maxGuests,
  } = req.body;
  jwt.verify(token, jwtsecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner:userData.id,price,
      title,address,photos:addedPhotos,description,
      perks,extraInfo,checkIn,checkOut,maxGuests,
    });
    res.json(placeDoc);
  });
});

app.get('/places', (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {token} = req.cookies;
  jwt.verify(token, jwtsecret, {}, async (err, userData) => {
    const {id} = userData;
    res.json( await Place.find({owner:id}) );
  });
});

app.listen(4000);
