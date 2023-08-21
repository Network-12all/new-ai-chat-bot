// Select DOM elements
const harmbuger = document.getElementById('harmbuger');
const sideBar = document.getElementById("left-nav");
const cancelBar = document.querySelector(".add-btn");
const resetButton = document.getElementById('resetButton');
const sendButton = document.getElementById('sendButton');
const input = document.getElementById('input');
const humanDiv = document.querySelector('.human .question');
const aiDiv = document.querySelector('.ai .answer');
const messageSection = document.querySelector('.message');

// Event listeners
harmbuger.addEventListener("click", () => {
  sideBar.style.display = 'block';
});

cancelBar.addEventListener("click", () => {
  sideBar.style.display = 'none';
});

resetButton.addEventListener('click', () => {
  location.reload();
});

sendButton.addEventListener('click', async () => {
  const inputValue = input.value;
  if (inputValue.trim() !== '') {
    const newParagraph = document.createElement('p');
    newParagraph.textContent = inputValue;

    humanDiv.appendChild(newParagraph);
    input.value = '';

    // Use the OpenAI API to get a response
    const apiKey = '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';
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: inputValue,
        max_tokens: 50
      })
    });

    const responseData = await response.json();
    const aiResponse = responseData.choices[0].text.trim();

    if (aiResponse) {
      const aiParagraph = document.createElement('p');
      aiParagraph.textContent = aiResponse;
      aiDiv.appendChild(aiParagraph);
    } else {
      const errorParagraph = document.createElement('p');
      errorParagraph.textContent = 'No answer available.';
      aiDiv.appendChild(errorParagraph);
    }

    // Show the message section
    messageSection.classList.add('show');
  }
});

setInterval(() => {
   let time = document.getElementById('time');
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let day_nighy = "AM";
    
    if (hours > 12){
      hours = hours - 12;
      day_nighy = "PM";
    }
    
    if (hours < 10) {
      hours = "0" + hours;
    }
    
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    
    if (seconds < 10){
      seconds = "0" + seconds;
    }
    
    time.textContent = `${hours}  :  ${minutes}  :  ${seconds}  ${day_nighy}`;
});
