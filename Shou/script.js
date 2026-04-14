let players = [];
let currentPlayerIndex = 0;
const totalSquares = 16;
const gridSize = 4;


// Questions for each category
const questions = {
    'Medication Facts': [{
            question: "Which category of medication is frequently prescribed for individuals dealing with anxiety?",
            answers: ["Antibiotics", "Antidepressants", "Antihistamines", "Painkillers"],
            correct: 1
        },
        {
            question: "Why is adhering to the prescribed dosage of mental health medication crucial?",
            answers: ["To minimize adverse effects", "To avoid addiction", "To make the medication more effective", "To prevent overdose"],
            correct: 0
        },
        {
            question: "True or False: Antidepressants typically require several weeks to exhibit noticeable effects.",
            answers: ["True", "False"],
            correct: 0
        },
        {
            question: "What is the most appropriate course of action if you experience unexpected side effects from your medication?",
            answers: ["Immediately stop the medication", "Consult your healthcare provider", "Increase the dosage", "Ignore the symptoms"],
            correct: 1
        },
        {
            question: "Mental health medications are believed to be effective primarily because they:",
            answers: ["Balance neurotransmitters in the brain", "Boost overall physical health", "Eliminate mental illness entirely", "Suppress emotional responses"],
            correct: 0
        },
    ],
    'Therapy and Alternatives': [{
            question: "What is the main goal of Cognitive Behavioral Therapy (CBT)?",
            answers: ["To improve communication skills", "To help people change unhelpful thoughts and behaviors", "To teach relaxation techniques", "To diagnose mental health disorders"],
            correct: 1
        },
        {
            question: "What is psychotherapy commonly known as?",
            answers: ["Talking therapy", "Physical therapy", "Medication therapy", "Group therapy"],
            correct: 0
        },
        {
            question: "Which of the following is an example of a mindfulness technique?",
            answers: ["Deep breathing and meditation", "Overloading your schedule", "Avoiding emotions", "Staying physically inactive"],
            correct: 0
        },
        {
            question: "Psychotherapy refers to the practice of:",
            answers: ["Analyzing dreams", "Discussing personal issues with a trained professional", "Using medication to treat mental health conditions", "Engaging in group exercise"],
            correct: 1
        },
        {
            question: "Why is regular exercise frequently recommended as part of mental health treatment?",
            answers: ["It increases the production of endorphins, which improve mood", "It distracts from emotional issues", "It helps build resilience to stress", "None of the above"],
            correct: 0
        },
    ],
    'Stigma and Perception': [{
            question: "What is one major reason people may hesitate to seek help for mental health concerns?",
            answers: ["Fear of social judgment", "Lack of motivation", "They believe mental health is a myth", "None of the above"],
            correct: 0
        },
        {
            question: "True or False: The stigma surrounding mental health has no impact on individuals' willingness to seek treatment.",
            answers: ["True", "False"],
            correct: 1
        },
        {
            question: "Which of the following is a common misconception about mental illness?",
            answers: ["It only affects certain individuals", "It is often temporary", "It's a sign of personal weakness", "All of the above"],
            correct: 2
        },
        {
            question: "How can society help reduce the stigma around mental health?",
            answers: ["Promoting open discussions and education", "Discouraging people from talking about mental health", "Focusing solely on physical health", "None of the above"],
            correct: 0
        },
        {
            question: "Which demographic is particularly vulnerable to the effects of mental health stigma?",
            answers: ["Doctors", "Individuals with mental health disorders", "Politicians", "None of the above"],
            correct: 1
        },
    ],
    'Reflection': [{
            question: "What is one effective coping mechanism for managing stress?",
            answers: ["Engaging in regular physical activity", "Avoiding stressful situations altogether", "Ignoring your emotions", "None of the above"],
            correct: 0
        },
        {
            question: "How does journaling about your emotions benefit mental health?",
            answers: ["It facilitates self-awareness and emotional clarity", "It increases emotional turmoil", "It is an ineffective strategy", "None of the above"],
            correct: 0
        },
        {
            question: "Discussing your emotions with others can be helpful because:",
            answers: ["It allows for emotional release and self-reflection", "It distracts from the real problem", "It makes you dependent on others", "None of the above"],
            correct: 0
        },
        {
            question: "What is an example of a reflective practice that promotes emotional well-being?",
            answers: ["Writing about your daily experiences in a journal", "Constantly ruminating on past mistakes", "Binge-watching TV shows to forget about stress", "None of the above"],
            correct: 0
        },
        {
            question: "How does regular physical activity contribute to improved mental health?",
            answers: ["It triggers the release of endorphins, reducing stress", "It makes physical exhaustion your primary focus", "It causes emotional detachment", "None of the above"],
            correct: 0
        },
    ],
};




document.getElementById('addPlayerButton').addEventListener('click', function () {
    const nameInput = document.getElementById('playerName');
    const colorInput = document.getElementById('playerColor');

    const playerName = nameInput.value.trim();
    const playerColor = colorInput.value;

    if (playerName) {
        addPlayer(playerName, playerColor);
        nameInput.value = '';
    } else {
        alert("Please enter a valid player name.");
    }
});

function addPlayer(name, color) {
    players.push({ name, color, position: 0 });
    updatePlayerDisplay();
}

function updatePlayerDisplay() {
    const playerDisplay = document.getElementById('playerDisplay');
    playerDisplay.innerHTML = '';
    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.textContent = `${player.name} - Position: ${player.position}`;
        playerDiv.style.color = player.color;
        playerDisplay.appendChild(playerDiv);
    });
}

function initializeGame() {
    currentPlayerIndex = 0;
    updateBoard();
    updateTurnDisplay();

    // Hide the start button, player input section, and player display
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('playerInput').style.display = 'none';
    document.getElementById('playerDisplay').style.display = 'none';

    // Show the game section and reset button
    document.getElementById('gameSection').style.display = 'block';
    document.getElementById('resetButton').style.display = 'block';
}

function updateTurnDisplay() {
    const currentTurn = document.getElementById('currentTurn');
    currentTurn.textContent = `${players[currentPlayerIndex].name}'s Turn`;
    document.getElementById('answerQuestionButton').style.display = 'block';
}


function updateBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        square.textContent = `Square ${i + 1}`;

        // Create a marker container for each square
        const markerContainer = document.createElement('div');
        markerContainer.className = 'marker-container';

        // Add markers for all players currently on this square
        players.forEach(player => {
            if (player.position === i) {
                const marker = document.createElement('div');
                marker.className = 'player-marker';
                marker.setAttribute('data-player', player.name);  // Track player name
                marker.style.backgroundColor = player.color;
                marker.textContent = player.name.charAt(0).toUpperCase();
                markerContainer.appendChild(marker);
            }
        });

        square.appendChild(markerContainer);
        board.appendChild(square);
    }
}

document.getElementById('answerQuestionButton').addEventListener('click', function () {
    askQuestion();
});

function askQuestion() {
    const player = players[currentPlayerIndex];
    const category = getCategoryBasedOnPosition(player.position);
    const questionSet = questions[category];
    const questionIndex = Math.floor(Math.random() * questionSet.length);
    const questionObj = questionSet[questionIndex];

    showQuestionModal(questionObj);
}

function showQuestionModal(questionObj) {
    const questionText = document.getElementById('questionText');
    const answerButtons = document.getElementById('answerButtons');

    questionText.textContent = questionObj.question;
    answerButtons.innerHTML = '';

    questionObj.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-button';
        button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
        button.addEventListener('click', () => handleAnswer(index, questionObj.correct, questionObj.answers));
        answerButtons.appendChild(button);
    });

    document.getElementById('questionModal').style.display = 'flex';
}

function handleAnswer(selectedIndex, correctIndex, answers) {
    const overlay = document.getElementById('answerOverlay');

    // Display whether the answer was correct or wrong
    if (selectedIndex === correctIndex) {
        overlay.textContent = 'Correct!';
        movePlayerForward();
    } else {
        overlay.textContent = `Wrong! Correct Answer: ${answers[correctIndex]}`;
        nextPlayer();
    }

    overlay.style.display = 'flex';

    // Hide the overlay and question modal after 2 seconds
    setTimeout(() => {
        overlay.style.display = 'none';
        document.getElementById('questionModal').style.display = 'none';
    }, 2000);
}

function updateBoardWithAnimation(fromPosition, toPosition) {
    const board = document.getElementById('board');
    const previousMarker = board.querySelector(`.marker-container[data-position="${fromPosition}"]`);
    const newMarkerContainer = board.querySelector(`.marker-container[data-position="${toPosition}"]`);

    if (previousMarker) previousMarker.innerHTML = '';  // Clear the previous marker

    // Create a new player marker with animation
    const player = players[currentPlayerIndex];
    const marker = document.createElement('div');
    marker.className = 'player-marker moving';  // Add the 'moving' class for animation
    marker.style.backgroundColor = player.color;
    marker.textContent = player.name.charAt(0).toUpperCase();

    newMarkerContainer.appendChild(marker);
}

function animatePlayerMovement(fromPosition, toPosition) {
    const board = document.getElementById('board');
    const movingPlayer = players[currentPlayerIndex];

    // Find the marker to animate
    const marker = document.querySelector(
        `.player-marker[data-player="${movingPlayer.name}"]`
    );

    // Calculate the target square's position
    const fromSquare = board.querySelector(`.square:nth-child(${fromPosition + 1})`);
    const toSquare = board.querySelector(`.square:nth-child(${toPosition + 1})`);

    const fromRect = fromSquare.getBoundingClientRect();
    const toRect = toSquare.getBoundingClientRect();

    // Calculate the translation values
    const deltaX = toRect.left - fromRect.left;
    const deltaY = toRect.top - fromRect.top;

    // Apply translation animation
    marker.style.transition = 'transform 0.5s ease-out';
    marker.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    // Reset the position after the animation completes
    marker.addEventListener('transitionend', () => {
        marker.style.transition = '';
        marker.style.transform = '';

        // Move the marker to the new square in the DOM
        const newContainer = toSquare.querySelector('.marker-container');
        newContainer.appendChild(marker);
    });
}


function movePlayerForward() {
    const player = players[currentPlayerIndex];
    player.position++;

    if (player.position >= totalSquares - 1) {
        document.getElementById('answerOverlay').textContent = `${player.name} wins!`;
        document.getElementById('answerOverlay').style.display = 'flex';
        setTimeout(resetGame, 3000);
    } else {
        nextPlayer();
    }
    updateBoard();
}



function nextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updateTurnDisplay();
}

function getCategoryBasedOnPosition(position) {
    if (position < 4) return 'Medication Facts';
    if (position < 8) return 'Therapy and Alternatives';
    if (position < 12) return 'Stigma and Perception';
    return 'Reflection';
}


function resetGame() {
    players = [];
    currentPlayerIndex = 0;

    // Reset the display
    document.getElementById('gameSection').style.display = 'none';
    document.getElementById('startButton').style.display = 'block';
    document.getElementById('playerInput').style.display = 'flex';
    document.getElementById('playerDisplay').style.display = 'block';
    document.getElementById('playerDisplay').innerHTML = '';
    document.getElementById('resetButton').style.display = 'none';  // Hide reset button
}