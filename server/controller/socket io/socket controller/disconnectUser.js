const RedisClient = require("../../../config/cache");

const disconnectUser = async (socket) => {
    try {
        if (socket.request.session.user) {
            const username = socket.request.session.user.username;
            await RedisClient.hset(
                `username:${username}`,
                'connected', false
            )
            console.log("disconnected");
        }
    } catch (error) {
        console.log("we cannot disconnect u" + error);
    }
}

module.exports = disconnectUser;