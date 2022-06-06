const RedisClient = require("../../../config/cache.js");
const db = require("../../../config/database.js");

const setWinner = async (socket, auction_id) => {
    try {
        if (socket.request.session.user.username) {

            const auctionStatus = await RedisClient.hgetall(`product:${auction_id}`);

            db.query("UPDATE auction SET expired = 'true' WHERE auction_id = ?", [auction_id]);

            console.log("expired")

            const date = new Date();

            const postedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

            console.log()

            if(auctionStatus.currentHighestBid >= auctionStatus.minimumBid){
                db.query("INSERT INTO auction_winners (auction_id, bid_amount, date, username) VALUES(?,?,?,?)", 
                [auction_id,
                auctionStatus.currentHighestBid,
                postedDate,
                auctionStatus.highestBidder
                ]);

            }else{
                console.log("here");
                db.query("INSERT INTO failed_auction (auction_id, username, bid_amount, minimum_bid) VALUES (?,?,?,?)",
                [auction_id,
                auctionStatus.highestBidder,
                auctionStatus.currentHighestBid,
                auctionStatus.minimumBid
            ]);
            }
        }
    }catch(error){
        console.log("error from setWinner" + "\n" + error)
    }
}

module.exports = setWinner;