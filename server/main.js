let express = require('express');
let app = express();
let server = require ('http').Server(app);
let io = require('socket.io')(server);

let messages = [{
  id: 1,
  text: "Hola soy un mensaje",
  author: "ozzrocker95"
}];

app.use(express.static('public'));

app.get('/hello', function(req, res) {
  res.status(200).send("Hola Mundo");
});

io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets');
  socket.emit('messages', messages);

  socket.on('new-message', function(data) {
    messages.push(data);

    io.sockets.emit('messages', messages);
  });
});

server.listen(8080, function() {
  console.log("Servidor corriendo en http://localhost:8080");
});
