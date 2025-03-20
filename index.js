const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");



let userMessage;
const API_KEY = "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";

const createChatLi = (message, ClassName) => {
    // Create a chat <li> element with passed message and ClassName
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", ClassName);
    let chatContent =  ClassName === "outgoing" ?  `<p>${message}</p>` : `<p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL =  "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

// Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}]
        })
    }

    // Send POST request to API, get response
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(()=> chatbox.scrollTo(0, chatbox.scrollHeight));
}



const handleChat = ()=>{
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(()=>{
        // Display "Thinking..." message while waiting for the response 
        const incomingChatLi =  createChatLi("Thinking...", "incoming")
        chatbox.appendChild(incomingChatLi);
        generateResponse(incomingChatLi);
    }, 600);
}

sendChatBtn.addEventListener("click", handleChat);
