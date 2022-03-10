"use strict";

const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_IMG = "https://icon-library.com/images/person-image-icon/person-image-icon-12.jpg";
const PERSON_IMG = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtFq93ATVDmO6zlMdXcTGzF81WfbiNbSH3-w&usqp=CAU";

msgerForm.addEventListener("submit", event => {
  event.preventDefault();
  // Get Messagefrom form
  const PERSON_NAME = user;
  const msgText = {
    text: msgerInput.value,
    name: PERSON_NAME
  };
  if (!msgText) return;
  socket.emit('chatmessage', msgText);
  appendMessage(PERSON_NAME, PERSON_IMG, 'right', msgText.text);
  msgerInput.value = "";
});

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;
  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse(message) {
  const msgText = message.text
  const delay = msgText.split(" ").length * 100;
  setTimeout(() => {
    appendMessage(message.username, BOT_IMG, message.side, msgText);
  }, delay);
}


function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();
  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Admin Chat
const socket = io();

function Startmessage() {
  let userr = user;
  return userr;
}

socket.on('Smessage', message => {
  appendMessage(message.username, BOT_IMG, message.side, message.text);
});

let chaticon = document.getElementById('chaticon');
chaticon.addEventListener('click', () => {
  msgerChat.innerHTML = ``;
  let self = Startmessage();
  setTimeout(() => {
    appendMessage('System', BOT_IMG, 'left', `Hello ${self}, Welcome to Chatbox !`);
  }, 500);
  socket.emit('Systemmessage', self);
});

socket.on('chat', message => {
  appendMessage(message.username, BOT_IMG, message.side, message.text);
})