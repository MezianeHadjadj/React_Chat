var path = require('path');
var fs = require('fs');
var express = require('express');

// Server part
var app = express();
app.use('/', express.static(path.join(__dirname, 'public')));

var server = app.listen(8000);
console.log('Server listening on port 8000');


// Socket.IO part
var io = require('socket.io')(server);

var sendChats = function (socket) {
	fs.readFile('chat_data.json', 'utf8', function(err, chats) {
		chats = JSON.parse(chats);
		socket.emit('chats', chats);
	});
};

io.on('connection', function (socket) {
  console.log('New client connected!');
  
  socket.on('fetchChats', function () {
		sendChats(socket);
	});

	socket.on('newChat', function (chat, callback) {
		fs.readFile('chat_data.json', 'utf8', function(err, chats) {
			chats = JSON.parse(chats);
			chats.push(chat);
			fs.writeFile('chat_data.json', JSON.stringify(chats, null, 4), function (err) {
				io.emit('chats', chats);
				callback(err);
			});
		});
	});
});