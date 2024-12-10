const chatform = document.getElementById("chat-form");
const chatscroll = document.querySelector(".chat-messages");

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const room = urlParams.get('room');

const showroom = document.getElementById("room-name");
const showuser = document.getElementById("users");
const socket = io();

console.log(username, room);

socket.emit('chatroom',{username,room});



socket.on("message",message=>{
    console.log(message);
    dispmessage(message);
	chatscroll.scrollTop = chatscroll.scrollHeight;
});



socket.on("roomsetup",({room,user})=>{
displayroom(room);
displayuser(user);

})





chatform.addEventListener("submit", (e)=>{
e.preventDefault();
const msg = e.target.elements.msg.value;

socket.emit("chatmessage",msg);


chatmessage(msg);
e.target.elements.msg.value= "";

})



//this function wellcom the user in the page
function dispmessage(message){
let newh1 = document.createElement("div");

newh1.innerHTML=`	<div class="message">
						<p class="meta">${message.nameofuser}<span>${message.time}</span></p>
						<p class="text">
							${message.text}
						</p>
					</div>` ;
document.querySelector(".chat-messages").appendChild(newh1);                        

}




function chatmessage(msg){
let chattext = document.createElement("div");
chattext.classList.add=('message');
chattext.innerHTML= `<div class="message">
						<p class="meta">${username} <span>9:12</span></p>
						<p class="text">
							${msg}
						</p>
					</div>
                        `;
document.querySelector('.chat-messages').appendChild(chattext);



}
function displayroom(room){
	showroom.innerText=room;

}
function displayuser(user){
showuser.innerHTML=user.map(users=>`<li>  ${users.username}  <li>`).join('')
	
};