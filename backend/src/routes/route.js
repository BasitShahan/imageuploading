const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const User = require('../models/schema');

const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    const directory = './public';
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    callback(null, directory);
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    callback(null, `image-${uniqueSuffix}-${file.originalname}`);
  }
});

const IsImage = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(new Error('only image is allowed'));
  }
};

const upload = multer({
  storage: imgconfig,
  fileFilter: IsImage
});

router.post('/register', upload.single('image'), async (req, res) => {
  const { filename } = req.file;
  console.log(filename)
  const { name } = req.body;
   console.log(name)
  if (!filename || !name) {
    return res.status(400).json({ message: 'please fill the required field' });
  }

  try {
    const userdata = new User({
      name: name,
      image: filename
    });

    const finaldata = await userdata.save();
    return res.status(200).json(finaldata);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'server error' });
  }
});
router.get('/getdata',async (req,res)=>{
  try {
    const getdata= await User.find()
    console.log(getdata)
    return res.status(200).json(getdata)
  } catch (error) {
    return res.status(400).json(error)
  }
})

module.exports = router;
