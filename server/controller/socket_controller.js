const connectUser = require("./socket io/socket controller/connectUser.js");
const disconnectUser = require("./socket io/socket controller/disconnectUser.js");
const productBid = require("./socket io/socket controller/productBid.js");
const updateBid = require("./socket io/socket controller/updateBid.js");
const setWinner = require("./socket io/socket controller/setWinner.js")
const getBidProducts = require("./socket io/socket controller/getBidProducts.js");

module.exports = {connectUser, disconnectUser, productBid, updateBid, setWinner, getBidProducts};