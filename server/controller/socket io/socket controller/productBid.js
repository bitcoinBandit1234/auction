const RedisClient = require("../../../config/cache");

const productBid = async (socket, auction_id, io)=>{
    try{

    const auctionStatus = await RedisClient.hgetall(`product:${auction_id}`);

    if(auctionStatus.room){
      
        await socket.join(auctionStatus.room);

        await io.to(auctionStatus.room).emit('showBid', {'highestBidder': auctionStatus.highestBidder, 'currentHighestBid': auctionStatus.currentHighestBid, 'nextBid': auctionStatus.nextBid});

    }

    }catch(error){
        console.log('error from productBid'+ '\n'+error)
    }
}

module.exports = productBid;