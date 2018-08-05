document.addEventListener('DOMContentLoaded', () => {
    var socket = io.connect('http://' + document.domain + ':' + location.port);
    var name='';
    socket.on('connect', () => {
        name = prompt("Enter name");
        socket.emit('user connected', {
            user_name: name,
        });
    });

    document.querySelector('#user-input').addEventListener('submit', function(e) {
        e.preventDefault();
        let userInput = document.querySelector('.message').value;
        socket.emit('message received', {
            user_name: name,
            user_input: userInput,
        })
        document.querySelector('.message').value = '';
    })
    
    socket.on('send message', function(msg) {
        const h3 = document.createElement('h3');
        h3.innerHTML = `<b>${msg["user_name"]}:</b> ${msg["user_input"]}`;
        document.querySelector('.msg-box').appendChild(h3);
    })
})