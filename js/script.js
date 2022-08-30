const socket=io('http://localhost:8000',{
    transports:['websocket','polling','flashsocket'],
});

const form=document.getElementById('send-container');
const messageinput=document.getElementById('messageinp');
const container=document.querySelector('.container');
// var audio=new Audio(ting.mp3);

const append=(messages,position)=>{
    let messageElement=document.createElement('div');
    messageElement.innerHTML=messages;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    container.append(messageElement);
    // if(position=='left'){
    //     audio.play();
    // }
};

const name=prompt('Enter Your Name To Join');
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    append(`${name} Joined The Chat`,'right');
})

socket.on('receive',data=>{
    append(`${data.name} : ${data.message}`,'left');
})

socket.on('leave',name=>{
    append(`${name} Left The Chat`,'right');
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinput.value;
    append(`You : ${message}`,'right');
    socket.emit('send',message);
    messageinput.value="";
})
