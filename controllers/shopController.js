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
      photo: "http://localhost:3000/images/" + shop.photo,
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
