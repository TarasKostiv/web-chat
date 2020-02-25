console.log("code connected");
var messages = document.getElementById("messages");
var roomNameInput = document.getElementById("roomname-input");
var sendButton = document.getElementById("send-btn");
var userMessage = document.getElementById("message-input").value;

// по нажатию на кнопку отправить - отправить на сервер nickname:message
sendButton.addEventListener("click", sendUserMessage);

start();

// Каждые 500 милисекунд забирать сообщения
function start() {
  getMessagesFromServer();
  // setInterval(getMessagesFromServer, 2000);
}

var lastMessages = [];
// Шаг 1:
// Получить сообщения с сервера
async function getMessagesFromServer() {
  // Получаем название комнаты
  var roomname = roomNameInput.value;
  // Получаем ассинхронный ответ
  var response = await fetch(
    `https://fchatiavi.herokuapp.com/get/${roomname}/?offset=0&limit=1000000`
  );
  // Декодируем его из строки в обьекты javascript
  response = await response.json();

  if (response == null) {
    messages.innerHTML = "No messages";
    return;
  }
  // Сформировать HTML меседжей
  var messagesHTML = fromMessagesHTML(response);
  // Добавить в messages-wrapper письма.
  messages.innerHTML = messagesHTML;

  // Если сообщений больше чем в прошлый раз проскролить вниз
  if (lastMessages.length < response.length) {
    scrollToEnd();
  }

  // Remember message
  lastMessages = response;
}

// Отправить сообщение
async function sendUserMessage() {
  // Take room name
  var roomname = roomNameInput.value;

  // Take what user wrote in nickname input
  var userNickname = document.getElementById("nickname-input").value;
  // Take what user wrote in message input
  userMessage = document.getElementById("message-input").value;

  if (userNickname.length === 0) {
    alert("You should write nickname");
    return;
  }

  if (userMessage.length === 0) {
    alert("You should write any message");
    return;
  }

  await fetch(`https://fchatiavi.herokuapp.com/send/${roomname}/`, {
    method: "POST",
    body: JSON.stringify({
      Name: userNickname,
      Message: userMessage
    })
  });

  getMessagesFromServer();
}

// Formate HTML code
function fromMessagesHTML(messages) {
  var allMessagesHTML = "";
  for (var i = 0; i < messages.length; i++) {
    var messageData = messages[i];
    // Create message
    var message = `
        <div class="container d-block  ">
				<div class="row bg-light pt-3 pl-3 pr-3 mb-3 rounded" style="text-align: left ;">
					<h3 id="nickname">${messageData.Name}</h3>
					<p id="message">${messageData.Message}</p>
        </div>
        </div>
      `;
    allMessagesHTML = allMessagesHTML + message;
  }
  return allMessagesHTML;
}

// Scroll to end
function scrollToEnd() {
  messages.scrollTop = messages.scrollHeight;
}

// Add emoji

var emojis = [
  "😀",
  "😁",
  "😂",
  "🤣",
  "😄",
  "😊",
  "😋",
  "😎",
  "😍",
  "😘",
  "🥰",
  "😚",
  "🤔",
  "🤨",
  "😐",
  "😑",
  "🙄",
  "😥",
  "😮",
  "😪",
  "😯",
  "😴",
  "😜",
  "😤",
  "😢",
  "😨",
  "😩",
  "😡",
  "😠",
  "🤬",
  "🤥",
  "🤫",
  "😰",
  "😱",
  "🥵",
  "🥶",
  "😳"
];

function addEmoji(emoji) {
  console.log(emoji - 1);
  takenEmoji = emojis[emoji - 1];
  if (putEmojiSpace) {
    document.getElementById("message-input").value +=
      userMessage + " " + takenEmoji;
  } else if (!putEmojiSpace) {
    document.getElementById("message-input").value += userMessage + takenEmoji;
  }
}

// Settings

var putEmojiSpace;

var isSavePutEmojiSpace;
var emojiSpaceCheckBox = document.getElementById("emojiSpace");

var messageFontSize;

var isChangeMessageFontSize;
var getFontSize = document.getElementById("fontSize");

function saveSettingOptions() {
  isSavePutEmojiSpace = emojiSpaceCheckBox.checked;
  console.log(isSavePutEmojiSpace);

  isChangeMessageFontSize = getFontSize.value;
  console.log(isChangeMessageFontSize);
}

function dontSaveSettingOptions() {
  putEmojiSpace = isSavePutEmojiSpace;
  emojiSpaceCheckBox.checked = isSavePutEmojiSpace;
  console.log(putEmojiSpace);

  getFontSize.value = isChangeMessageFontSize;
  console.log(getFontSize.value);
}

function saveSettings() {
  if (emojiSpaceCheckBox.checked === true) {
    putEmojiSpace = true;
    console.log(putEmojiSpace);
  } else if (emojiSpaceCheckBox.checked === false) {
    putEmojiSpace = false;
    console.log(putEmojiSpace);
  }

  messageFontSize = getFontSize.value;
  document.getElementById("message-input").style.fontSize = messageFontSize;
  console.log(messageFontSize);
}
