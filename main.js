console.log("code connected");
var messages = document.getElementById("messages");
var roomNameInput = document.getElementById("roomname-input");
var sendButton = document.getElementById("send-btn");
var userMessage = document.getElementById("message-input").value;

// on click send to serever nickname:message
sendButton.addEventListener("click", sendUserMessage);

start();

// All 500 milliseconds take messa
function start() {
  getMessagesFromServer();
  setInterval(getMessagesFromServer, 2000);
}

var lastMessages = [];
// Step 1:
// Take message from server
async function getMessagesFromServer() {
  // Take room name
  var roomname = roomNameInput.value;
  // Take asynchronous answer
  var response = await fetch(
    `https://fchatiavi.herokuapp.com/get/${roomname}/?offset=0&limit=1000000`
  );
  // Decoding it from sting to object javascript
  response = await response.json();

  if (response == null) {
    messages.innerHTML = "No messages";
    return;
  }
  // Creat html messagede
  var messagesHTML = fromMessagesHTML(response);
  // Add to messages-wrapper message
  messages.innerHTML = messagesHTML;

  // Scrool down
  if (lastMessages.length < response.length) {
    scrollToEnd();
  }

  // Remember message
  lastMessages = response;
}

// Send message
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

  document.getElementById("message-input").value = "";
}

// Formate HTML code
function fromMessagesHTML(messages) {
  var allMessagesHTML = "";
  for (var i = 0; i < messages.length; i++) {
    var messageData = messages[i];
    var firstLetterOfName = messageData.Name[0];
    // Create message
    var message = `
        <div class="container d-block">
          <div class="row bg-light pt-3 pl-3 pr-3 mb-3 rounded" style="text-align: left;">
            <div class="name-container d-flex align-items-center mb-2">
              <div class="avatar border">
                <span class="avatar-placeholder">${firstLetterOfName}</span>
              </div>
              <h4 id="nickname" class="ml-1 mt-1">${messageData.Name}</h4>
            </div><br />
            <p id="message">${messageData.Message}</p>
          </div>
        </div>
      `;
    allMessagesHTML = allMessagesHTML + message;
  }
  return allMessagesHTML;
}

// Close warning block
var warningBlock = document.getElementById("warning-block");

function closeWarningBlock() {
  warningBlock.style.cssText = "display: none;";
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
  "😳",
  "🤑",
  "🤢"
];

function addEmoji(emoji) {
  console.log(emoji - 1);
  takenEmoji = emojis[emoji - 1];
  if (putEmojiSpace) {
    document.getElementById("message-input").value += " " + takenEmoji + " ";
  } else if (!putEmojiSpace) {
    document.getElementById("message-input").value += takenEmoji;
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
  document.getElementById("message-input").style.cssText =
    "font-size:" + messageFontSize + "px ;";
  console.log(messageFontSize);
}

// reset
function resetSettings() {
  getFontSize.value = 16;
  document.getElementById("message-input").style.cssText = "font-size: 1rem ;";

  emojiSpaceCheckBox.checked = false;
  putEmojiSpace = false;
}
