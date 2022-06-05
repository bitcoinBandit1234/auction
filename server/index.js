const express = require("express")
const http = require("http")
const cors = require('cors')
const { corsConfig, expressSession, sessionWrap } = require('./controller/server_controller.js')
const { Server } = require("socket.io");
const {connectUser, disconnectUser, productBid, updateBid, setWinner, getBidProducts} = require("./controller/socket_controller.js");

// Importing routes

const authRoute = require('./routes/authRoute.js');
const productRoute = require('./routes/productRoute.js');

const app = express();

const server = http.createServer(app);

// Using necessary middlewares

app.use(express.json());
app.use(cors(corsConfig));
app.use("/auctionImg", express.static("auctionImg"));
app.use(expressSession);

// socket.io configuration
const io = new Server(server,  {cors: corsConfig});
io.use(sessionWrap(expressSession));
io.on("connection", (socket) => {

  connectUser(socket);

  socket.on('joinBid', (auction_id)=>{
    productBid(socket, auction_id, io);
  });

  socket.on('getHomeDisplay', ()=>{
    getBidProducts(socket);
  })

  socket.on('updateBid', (auction_id)=>{
    updateBid(socket, auction_id, io);
  });

  socket.on('disconnecting', ()=>{
    disconnectUser(socket);
  });

  socket.on('setWinner', (auction_id)=>{
    setWinner(socket, auction_id);
  });

  socket.on('joinChat', (room)=>{
    socket.join(room);
  });

  socket.on('sendMessage', (data)=>{
    socket.to(data.room).emit("receiveMessage", data);
  })
});


// Endpoints

app.use('/auth', authRoute);
app.use('/product', productRoute);

server.listen(process.env.SERVER_PORT, ()=>{
    
    console.log(`server running on port: ${process.env.SERVER_PORT}`)
    
})

