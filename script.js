function submitMessage() {
    let userInput = document.getElementById('user-input').value;

    if (userInput.trim() !== "") {
        let messageContainer = document.createElement('div');
        messageContainer.classList.add('message');

        // Check if the input contains an image URL
        const imageUrlPattern = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))/i;
        if (imageUrlPattern.test(userInput)) {
            messageContainer.innerHTML = `<img src="${userInput}" alt="Imagem" style="max-width: 100%; opacity: 0.8;">`;
        } else {
            messageContainer.innerHTML = `<p style="opacity: 0.8;">${userInput}</p>`;
        }

        let scrollContainer = document.getElementById('scroll-container');

        // Shift all existing messages downward
        let messages = document.querySelectorAll('.message');
        messages.forEach((msg) => {
            let currentTop = parseInt(msg.style.top) || 80;
            msg.style.top = `${currentTop + 100}px`; // Move each message downward
        });

        // Set a random horizontal position
        let randomX = Math.floor(Math.random() * (scrollContainer.offsetWidth - 150));
        messageContainer.style.position = 'absolute';
        messageContainer.style.left = `${randomX}px`;
        messageContainer.style.top = `80px`; // Always place new messages at the top

        scrollContainer.appendChild(messageContainer); // Add new message

        // Clear input field
        document.getElementById('user-input').value = "";
    }
}
