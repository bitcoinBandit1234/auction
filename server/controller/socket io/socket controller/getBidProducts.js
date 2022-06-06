const RedisClient = require("../../../config/cache");
const db = require("../../../config/database.js")

const getBidProducts = async (socket) => {

    try{
        const keys = await RedisClient.keys('product*');

        const underdogs = [];

        const popular = [];

        for(let i=0; i<keys.length; i++){

            const auctionStatus = await RedisClient.hgetall(keys[i]);

            if(popular.length < 6 && underdogs.length < 6){

                if(auctionStatus.totalBids >= 20){

                    popular.push(parseInt(keys[i].split(':')[1]));

                }else if(auctionStatus.totalBids <= 10){

                    underdogs.push(parseInt(keys[i].split(':')[1]));

                }
            }else{

                return;

            }
        }

        const underdogsDetail = await db.query(`SELECT * FROM auction WHERE auction_id IN (${underdogs})`);

        const popularDetail = await db.query(`SELECT * FROM auction WHERE auction_id IN (${popular})`);

        socket.emit('homeProducts', underdogsDetail, popularDetail);

    }catch(error){

        console.log('error from getBidProduct'+ '\n'+error);
        
    }

}

module.exports = getBidProducts;