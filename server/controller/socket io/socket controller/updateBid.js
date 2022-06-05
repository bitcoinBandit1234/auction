const RedisClient = require("../../../config/cache.js");

const updateBid = async (socket, auction_id, io) => {
    try {
        if (socket.request.session.user.username) {

            const bidder = socket.request.session.user.username;
            
            const auctionStatus = await RedisClient.hgetall(`product:${auction_id}`);

            if (auctionStatus.currentHighestBid == 0 && auctionStatus.nextBid == 0) {

                console.log("in first")

                auctionStatus.currentHighestBid = auctionStatus.startingBid;

                auctionStatus.currentHighestBid++;

                auctionStatus.currentHighestBid--;

                auctionStatus.totalBids ++;

                auctionStatus.nextBid = Math.floor(0.20 * auctionStatus.currentHighestBid) + (auctionStatus.currentHighestBid);

                auctionStatus.highestBidder = bidder;

                await io.to(auctionStatus.room).emit('liveBids', auctionStatus.highestBidder, auctionStatus.nextBid, auctionStatus.currentHighestBid);

                RedisClient.hset(
                    `product:${auction_id}`,
                    `highestBidder`, auctionStatus.highestBidder,
                    `currentHighestBid`, auctionStatus.currentHighestBid,
                    `nextBid`, auctionStatus.nextBid,
                    `totalBids`, auctionStatus.totalBids
                );

            } else {
                
                console.log(bidder);

                auctionStatus.currentHighestBid = auctionStatus.nextBid;

                auctionStatus.highestBidder = bidder;

                auctionStatus.currentHighestBid++;

                auctionStatus.currentHighestBid--;

                auctionStatus.totalBids ++;

                auctionStatus.nextBid = auctionStatus.currentHighestBid + Math.floor(0.20 * auctionStatus.currentHighestBid);

                console.log("drawn line");

                await io.to(auctionStatus.room).emit('liveBids', auctionStatus.highestBidder, auctionStatus.nextBid, auctionStatus.currentHighestBid);

                RedisClient.hset(
                    `product:${auction_id}`,
                    `highestBidder`, auctionStatus.highestBidder,
                    `currentHighestBid`, auctionStatus.currentHighestBid,
                    `nextBid`, auctionStatus.nextBid,
                    `totalBids`, auctionStatus.totalBids
                );
            }
        }
    } catch (error) {
        console.log("error from updateBid.js file" + '\n' + error)
    }
}

module.exports = updateBid;