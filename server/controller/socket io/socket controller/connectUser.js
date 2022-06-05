const RedisClient = require("../../../config/cache.js");

const connectUser = async (socket)=>{
    try{
        if(socket.request.session.user){
            socket.user = {...socket.request.session.user};
            socket.join(socket.user.id);

            RedisClient.hset(
                `username:${socket.user.username}`,
                `id`, `${socket.user.id}`,
                `connected`, true
            );
            console.log("connected user")
        }
    }catch(error){
        console.log(error);
    }
}

module.exports = connectUser;
