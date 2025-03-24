import { initializeApp } from "https://www.gstatic.com/firebasejs/13.35.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/13.35.1/firebase-auth.js";

let messageCount = 0;
let selectedFile = null; 

function scrollToBottom() {
    const chatContainer = document.getElementById("chatContainer");
    chatContainer.scrollTop = chatContainer.scrollHeight;
}


function appendMessage(sender, message, id = null) {
    const messageHtml = `
      <div class="message ${sender}">
        <div class="msg-header">${capitalizeFirstLetter(sender)}</div>
        <div class="msg-body" ${id ? `id="${id}"` : ""}>${message}</div>
      </div>
    `;
    document.getElementById("chatContainer").insertAdjacentHTML('beforeend', messageHtml);
    scrollToBottom();
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function sendMessage() {
    const inputField = document.getElementById("text");
    const rawText = inputField.value;

    if (!rawText && !selectedFile) return; 

    appendMessage("You", rawText || "File Sent"); 
    inputField.value = ""; 

    const formData = new FormData();
    formData.append("msg", rawText);
    if (selectedFile) {
        formData.append("file", selectedFile);
    }

    fetchBotResponse(formData);
}


function fetchBotResponse(formData) {
    fetch("/get", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.text())
        .then((data) => displayBotResponse(data))
        .catch(() => displayError())
        .finally(() => {
            selectedFile = null; 
        });
}


function displayBotResponse(data) {
    const botMessageId = `botMessage-${messageCount++}`; 
    appendMessage("Thara", "", botMessageId); 
    const botMessageDiv = document.getElementById(botMessageId);
    botMessageDiv.textContent = ""; 

    let index = 0;
    const interval = setInterval(() => {
        if (index < data.length) {
            botMessageDiv.textContent += data[index++]; 
        } else {
            clearInterval(interval);
        }
    }, 30);
}


function displayError() {
    appendMessage("model error", "Failed to fetch a response from the server.");
}


function attachEventListeners() {
    const sendButton = document.getElementById("send");
    const invisibleDisplay = document.getElementById("content");
    const stopButton = document.getElementById("stop");
    const inputField = document.getElementById("text");
    const attachmentButton = document.getElementById("attachment");
    const fileInput = document.getElementById("fileInput");

    sendButton.addEventListener("click", () => {
        sendMessage();
        invisibleDisplay.style.display = "none";
        sendButton.style.display = "none";
        stopButton.style.display = "inline-block";
    });

    inputField.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendMessage();
            invisibleDisplay.style.display = "none";
            sendButton.style.display = "none";
            stopButton.style.display = "inline-block";
        }
    });
    stopButton.addEventListener("click", () => {
        sendMessage();
        invisibleDisplay.style.display = "none";
        stopButton.style.display = "none";
        sendButton.style.display = "inline-block";
    });
    
    attachmentButton.addEventListener("click", () => {
        fileInput.click();
    });

    
    fileInput.addEventListener("change", (event) => {
        selectedFile = event.target.files[0];
        appendMessage("You", `Selected File: ${selectedFile.name}`);
    });
}

document.addEventListener("DOMContentLoaded", attachEventListeners);

const firebaseConfig = {
    apiKey: "AIzaSyAJstztwK4tEYGCxitjlS6Tu9uQUvpxkXs",
    authDomain: "thara-ai.firebaseapp.com",
    projectId: "thara-ai",
    storageBucket: "thara-ai.appspot.com",
    messagingSenderId: "570219477650",
    appId: "1:570219477650:web:3ca7a8a297ccfd1a02444b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (!user) {
        document.getElementById("loginDialog").style.display = "block";
        document.getElementById("overlay").style.display = "block";
    }
});

window.redirectToLogin = function () {
    window.location.href = "login.html"; 
};

window.closeDialog = function () {
    document.getElementById("loginDialog").style.display = "none";
    document.getElementById("overlay").style.display = "none";
};