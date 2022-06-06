const router = require("express").Router();
const  {addAuction, getAuctionItems, extractAuctionDetail, getCategoryProducts, getParticipatedProducts, getNameProducts, getWonProducts}  = require("../controller/auction_controller.js");
const upload = require("../helper/photoUploader.js")

router.route("/addAuction").get(getAuctionItems).post(upload.single("image"), addAuction);
router.get('/productDetail/:id', extractAuctionDetail);
router.get('/productCategory/:category', getCategoryProducts);
router.get('/getParticipatedProducts/:products', getParticipatedProducts);
router.get('/productName/:searchParam', getNameProducts);
router.get('/getWonProducts/:username', getWonProducts);

module.exports = router;