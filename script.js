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

// time 

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




sendButton.addEventListener('click', async () => {
  const inputValue = input.value;
  if (inputValue.trim() !== '') {
    const newHumanDiv = document.createElement('div');
    newHumanDiv.classList.add('human');

    const pic = document.createElement('div');
    pic.classList.add('pic');
    const picContent = document.createElement('p');
    picContent.textContent = 'ks';
    pic.appendChild(picContent);
    newHumanDiv.appendChild(pic);

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    const newQuestion = document.createElement('p');
    newQuestion.textContent = inputValue;
    questionDiv.appendChild(newQuestion);
    newHumanDiv.appendChild(questionDiv);

    messageSection.appendChild(newHumanDiv);

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
      const newAIDiv = document.createElement('div');
      newAIDiv.classList.add('ai');

      const pic = document.createElement('div');
      pic.classList.add('pic');
      const picContent = document.createElement('p');
      picContent.innerHTML = '<i class="fas fa-robot"></i>';
      pic.appendChild(picContent);
      newAIDiv.appendChild(pic);

      const answerDiv = document.createElement('div');
      answerDiv.classList.add('answer');
      const newAnswer = document.createElement('p');
      newAnswer.textContent = aiResponse;
      answerDiv.appendChild(newAnswer);
      newAIDiv.appendChild(answerDiv);

      messageSection.appendChild(newAIDiv);
    } else {
      const newAIDiv = document.createElement('div');
      newAIDiv.classList.add('ai');

      const pic = document.createElement('div');
      pic.classList.add('pic');
      const picContent = document.createElement('p');
      picContent.innerHTML = '<i class="fas fa-robot"></i>';
      pic.appendChild(picContent);
      newAIDiv.appendChild(pic);

      const answerDiv = document.createElement('div');
      answerDiv.classList.add('answer');
      const errorAnswer = document.createElement('p');
      errorAnswer.textContent = 'No answer available.';
      answerDiv.appendChild(errorAnswer);
      newAIDiv.appendChild(answerDiv);

      messageSection.appendChild(newAIDiv);
    }

    // Show the message section
    messageSection.classList.add('show');
  }
});


const authorElements = document.querySelectorAll('#author');
const questionElements = document.querySelectorAll('#question1');

const questions = [
    { author: 'Alice', question: 'What is your favorite color?' },
    { author: 'Bob', question: 'What is the capital of France?' },
    { author: 'Charlie', question: 'What is the meaning of life?' },
    // Add more question objects here
];

function displayRandomQuestions() {
    questionElements.forEach((questionElement, index) => {
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        authorElements[index].textContent = `Question by ${randomQuestion.author}:`;
        questionElement.textContent = randomQuestion.question;
    });
}

// Display random questions when the page loads
displayRandomQuestions();


document.addEventListener('DOMContentLoaded', () => {
  // ... Your existing code ...

  // Select the .down-1 and .down-2 elements
  const down1 = document.querySelector('.down-1');
  const down2 = document.querySelector('.down-2');

  // Add event listeners to .down-1 and .down-2
  down1.addEventListener('click', () => {
    // Get the question from the elements
    const question = document.querySelector('#question1').textContent;
    // Simulate sending the question to human
    simulateUserMessage(question);
    // Simulate AI response
    simulateAIResponse(question);
  });

  down2.addEventListener('click', () => {
    // Get the question from the elements
    const question = document.querySelector('#question2').textContent;
    // Simulate sending the question to human
    simulateUserMessage(question);
    // Simulate AI response
    simulateAIResponse(question);
  });

  // ... Your existing code ...

  // Simulate user message and AI response
  function simulateUserMessage(question) {
    // Create a new user message element and add it to the message section
    const newUserDiv = document.createElement('div');
    newUserDiv.classList.add('human');
    newUserDiv.innerHTML = `
      <div class="pic">
        <p>ks</p>
      </div>
      <div class="question">
        ${question}
      </div>
    `;
    messageSection.appendChild(newUserDiv);
  }

  async function simulateAIResponse(question) {
    // Use the OpenAI API to get a response
    // ... Your existing API code ...

    // Simulate AI response using responseData
    const aiResponse = 'Simulated AI Response';

    // Create a new AI message element and add it to the message section
    const newAIDiv = document.createElement('div');
    newAIDiv.classList.add('ai');
    newAIDiv.innerHTML = `
      <div class="pic">
        <p><i class="fas fa-robot"></i></p>
      </div>
      <div class="answer">
        ${aiResponse}
      </div>
    `;
    messageSection.appendChild(newAIDiv);

    // Show the message section
    messageSection.classList.add('show');
  }

  // ... Your existing code ...
});
