const socket=io('http://localhost:8000');

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageIp');
const messageContainer=document.querySelector(".container");

const append=(message, position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
})
const username=prompt("enter your name to join");
socket.emit('new-user-joined', username);
socket.on('user-joined',data=>{
    append(`${data} joined the chat`,'center');
})
socket.on('recieve',data=>{
    append(`${data.name}: ${data.message}`,'left');
})
socket.on('leave',name=>{
    append(`${name} left the chat`,'center');
})
//emit means creating an event and sending it to nodejs server
//on means listening an event