const RedisClient = require("../../../config/cache.js");
const db = require("../../../config/database.js");

const setWinner = async (socket, auction_id) => {
    try {
        if (socket.request.session.user.username) {

            const auctionStatus = await RedisClient.hgetall(`product:${auction_id}`);

            db.query("UPDATE auction SET expired = 'true' WHERE auction_id = ?", [auction_id]);

            const date = new Date();

            const postedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

            if(auctionStatus.currentHighestBid >= auctionStatus.minimumBid){
                db.query("INSERT INTO auction_winners (auction_id, bid_amount, date, username) VALUES(?,?,?,?)", 
                [auction_id,
                auctionStatus.currentHighestBid,
                postedDate,
                auctionStatus.highestBidder
                ]);

            }else{
                db.query("INSERT INTO unsuccess_auction (auction_id, minimum_bid, highest_bid, bidder) VALUES (?,?,?,?)",
                [auction_id,
                auctionStatus.minimumBid,
                auctionStatus.currentHighestBid,
                auctionStatus.highestBidder
            ]);
            }
        }
    }catch(error){
        console.log("error from setWinner" + "\n" + error)
    }
}

module.exports = setWinner;