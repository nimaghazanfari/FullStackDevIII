$(function () {
  var typingTimer;                //timer identifier
  var doneTypingInterval = 2000;  //time in ms, 2 second for example

  //buttons and inputs
  var message = $("#message");
  var username = $("#username");
  var send_message = $("#send_message");
  var send_username = $("#send_username");
  var chatroom = $("#chatroom");
  var feedback = $("#feedback");

  message.on('keydown', () => {
    clearTimeout(typingTimer);

    socket.emit('typing');

  });

  message.on('keyup', () => {
    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
      
      //to clear feedback box
      socket.emit('blured');

    }, doneTypingInterval);

  });

  //Emit message
  send_message.click(function () {
    socket.emit('new_message', { message: message.val() });
  });

  //Emit a username
  send_username.click(function () {
    console.log(username.val());
    socket.emit('change_username', { username: username.val() });
  });

  //set up socket.io event listeners
  var socket = io.connect('http://localhost:3000');

  socket.on('new_message', data => {
    console.log(data);
    chatroom.append($('<p>', { class: 'message', text: `${data.username}: ${data.message}` }));
  });

  socket.on('typing', data => {
    feedback.html($('<p>', { text: `${data.username} is typing...` }));
  });

  socket.on('blured', data => {
    feedback.html('');
  });

});
