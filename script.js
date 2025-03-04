const ws = new WebSocket('ws://localhost:8080');
const messageList = document.getElementById('message-list');

ws.onmessage = function(event) {
    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = event.data;
    messageList.appendChild(message);
};