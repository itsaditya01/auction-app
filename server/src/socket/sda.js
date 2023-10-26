const socket = io();

socket.emit('join', {userId: 12, username: 'asd',room: 213}, (error) => {

});

socket.emit('sendBid', 35, (error) => {
    
})

socket.on('bid', bidDetails => {
    console.log(bidDetails);
})

socket.on("message", (message) => {
  console.log(message);
 
});
