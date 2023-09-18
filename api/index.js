const express = require('express');
const app = express();
const cors = require('cors');
const Mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const download = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const User = require('./models/User');
const Product = require('./models/Product');

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5173' }));
app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'));

app.get('/test', (req, res) => {
  res.json('Hello World!');
});

// Moongoose Connection
Mongoose.connect(process.env.MONGO_URL);

// Register
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const pass = bcrypt.compareSync(password, userDoc.password);
    if (pass) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        }
      );
    } else {
      res.status(422).json('Password does not match');
    }
  } else {
    res.json('User not found');
  }
});

// Profile
app.get('/profile', async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const UserDoc = await User.findById(userData.id);
      res.json(UserDoc);
    });
  } else {
    res.json(null);
  }
});

// logout
app.post('/logout', async (req, res) => {
  res.clearCookie('token').json('Logged out');
});

// Link-Download
app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;

  await download.image({
    url: link,
    dest: `${__dirname}/uploads/`,
  });

  res.json('ok');
});

// Upload
const photosMiddleware = multer({ dest: 'uploads' });
app.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split('.');
    const ext = parts.slice(-1);
    const newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads\\', ''));
  }
  res.json(uploadedFiles);
});

// New Product
app.post('/products', async (req, res) => {
  const { token } = req.cookies;
  const { name, address, addPhotos, description, perks, price } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const productDoc = await Product.create({
      owner: userData.id,
      name,
      address,
      photos: addPhotos,
      description,
      perks,
      price,
    });
    res.json(productDoc);
  });
});

// User Products
app.get('/user-products', async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    res.json(await Product.find({ owner: userData.id }));
  });
});

// IndexPage Products
app.get('/products', async (req, res) => {
  res.json(await Product.find());
});

// User Product Details
app.get(`/products/:id`, async (req, res) => {
  const { id } = req.params;
  res.json(await Product.findById(id));
});

// Edit Product
app.put(`/products/:id`, async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  const { name, address, addPhotos, description, perks, price } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const productDoc = await Product.findById(id);
    if (userData.id === productDoc.owner.toString()) {
      productDoc.set({
        name,
        address,
        photos: addPhotos,
        description,
        perks,
        price,
      });
      productDoc.save();
      res.json('Product Updated');
    } else {
      res.json('Not Authorized');
    }
  });
});

app.listen(3000);
