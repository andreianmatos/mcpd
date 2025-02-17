// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgH87UffFjDxhivjeAMGefsuRLAkD0MJ4",
    authDomain: "pdmc-31064.firebaseapp.com",
    projectId: "pdmc-31064",
    storageBucket: "pdmc-31064.firebasestorage.app",
    messagingSenderId: "1024703909545",
    appId: "1:1024703909545:web:0db1d41284f0ab313963b8",
    measurementId: "G-8SYZYQZHSE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

// Function to submit message
function submitMessage() {
    let userInput = document.getElementById('user-input').value;

    // Check if there is any input
    if (userInput.trim() !== "") {
        addMessageToFirestore(userInput); // Add message to Firestore

        let messageContainer = document.createElement('div');
        messageContainer.classList.add('message');

        // Check if the input contains an image URL
        const imageUrlPattern = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))/i;
        if (imageUrlPattern.test(userInput)) {
            messageContainer.innerHTML = `<img src="${userInput}" alt="Imagem" style="max-width: 100%; opacity: 0.8;">`;
        } else {
            messageContainer.innerHTML = `<p style="opacity: 0.8;">${userInput}</p>`;
        }

        addMessageToChat(messageContainer); // Add the message to the chat

        // Clear the input field after submission
        document.getElementById('user-input').value = "";
    }
}

// Function to add the message to the chat
function addMessageToChat(messageContainer) {
    let scrollContainer = document.getElementById('scroll-container');

    // Shift all existing messages downward
    let messages = document.querySelectorAll('.message');
    messages.forEach((msg) => {
        let currentTop = parseInt(msg.style.top) || 80;
        msg.style.top = `${currentTop + 100}px`; // Move each message downward
    });

    // Set a random horizontal position for the new message
    let randomX = Math.floor(Math.random() * (scrollContainer.offsetWidth - 150));
    messageContainer.style.position = 'absolute';
    messageContainer.style.left = `${randomX}px`;
    messageContainer.style.top = `80px`; // Always place new messages at the top

    scrollContainer.appendChild(messageContainer); // Add the new message
}

// Function to add message to Firestore
async function addMessageToFirestore(message) {
    try {
        const docRef = await addDoc(collection(db, "messages"), {
            text: message,
            timestamp: new Date()
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// Function to load old messages
async function loadOldMessages() {
    const q = query(collection(db, "messages"), orderBy("timestamp")); // Order by timestamp

    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const message = doc.data().text;
            const messageContainer = document.createElement('div');
            messageContainer.classList.add('message');

            // Check if the message contains an image URL
            const imageUrlPattern = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))/i;
            if (imageUrlPattern.test(message)) {
                messageContainer.innerHTML = `<img src="${message}" alt="Imagem" style="max-width: 100%; opacity: 0.8;">`;
            } else {
                messageContainer.innerHTML = `<p style="opacity: 0.8;">${message}</p>`;
            }

            addMessageToChat(messageContainer); // Add the message to the chat
        });
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
}

// Load old messages when the page loads
window.onload = loadOldMessages;

// Add event listener to button for message submission
document.getElementById('submit-button').addEventListener('click', submitMessage);  
