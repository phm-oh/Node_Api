const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)

const config = require('../config/index');

const Shop = require("../models/shop");
const Menu = require("../models/menu");



exports.index = async (req, res, next) => {
  const shop = await Shop.find()
    .select("name photo location")
    .sort({ _id: -1 });

  const shopWhitPhotoDomain = await shop.map((shop, index) => {
    return {
      id: shop._id,
      name: shop.name,
      photo: config.DOMAIN+'/images/' + shop.photo,
      location: shop.location,
    };
  });
  res.status(200).json({
    data: shopWhitPhotoDomain,
  });
};
// get menu
exports.menu = async (req, res, next) => {
    // const menu = await Menu.find();
  // const menu = await Menu.find().select('+name ');
  //const menu = await Menu.find().where("price").gte(150).limit(3);
  // const menu = await Menu.find({ price: {$gte:150}}).limit(3)
  const menu = await Menu.find().populate('shop','name location ').sort('-_id');

  res.status(200).json({
    data: menu,
  });
};

// get shop by id with menus
exports.getShopWithMenu = async (req, res, next) => {
 const {id} = req.params;
 const shopWithMenu = await Shop.findById(id).populate('menus');


res.status(200).json({
  data: shopWithMenu
});
};

// insert shop
exports.insert = async (req, res, next) => {
  const { name, location ,photo} = req.body;

  // let staff = new Staff(req.body);
  let shop = new Shop({
    name: name,
    location: location,
    photo: await saveImageToDisk(photo) 
    
  });
  await shop.save();

  res.status(201).json({
    message: "เพิ่มข้อมูลเรียบร้อย",
  });
};



async function saveImageToDisk(baseImage) {
  //หา path จริงของโปรเจค
  const projectPath = path.resolve('./') ;
  //โฟลเดอร์และ path ของการอัปโหลด
  const uploadPath = `${projectPath}/public/images/`;

  //หานามสกุลไฟล์
  const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));

  //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
  let filename = '';
  if (ext === 'svg+xml') {
      filename = `${uuidv4.v4()}.svg`;
  } else {
      filename = `${uuidv4.v4()}.${ext}`;
  }

  //Extract base64 data ออกมา
  let image = decodeBase64Image(baseImage);

  //เขียนไฟล์ไปไว้ที่ path
  await writeFileAsync(uploadPath+filename, image.data, 'base64');
  //return ชื่อไฟล์ใหม่ออกไป
  return filename;
}

function decodeBase64Image(base64Str) {
  let matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  let image = {};
  if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
  }

  image.type = matches[1];
  image.data = matches[2];

  return image;
}