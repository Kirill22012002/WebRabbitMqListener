const ws = new WebSocket('ws://localhost:8080');
const messageList = document.getElementById('message-list');

ws.onmessage = function(event) {
    const message = document.createElement('div');
    message.className = 'message';
    try {
        const jsonMessage = JSON.parse(event.data);
        message.innerHTML = "<pre>" + JSON.stringify(jsonMessage, null, 2) + "</pre>";
    } catch (e) {
        message.textContent = event.data;
    }

    messageList.appendChild(message);
};