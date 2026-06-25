// App State
let gameState = {
    teamCount: 2,
    bonusValue: 5,
    scores: []
};

// DOM Elements
const setupPage = document.getElementById('setup-page');
const scoreboardPage = document.getElementById('scoreboard-page');
const startBtn = document.getElementById('start-btn');
const exitBtn = document.getElementById('exit-btn');
const teamsContainer = document.getElementById('teams-container');

// Start Game Event
startBtn.addEventListener('click', () => {
    const teamCountInput = parseInt(document.getElementById('team-count').value);
    const bonusValueInput = parseInt(document.getElementById('bonus-value').value);

    // Validation
    if (isNaN(teamCountInput) || teamCountInput < 1) {
        alert('Please enter a valid number of teams (at least 1).');
        return;
    }

    gameState.teamCount = teamCountInput;
    gameState.bonusValue = isNaN(bonusValueInput) ? 0 : bonusValueInput;
    
    // Initialize scores array to 0 for each team
    gameState.scores = Array(gameState.teamCount).fill(0);

    renderScoreboard();
    
    // Switch views
    setupPage.classList.add('hidden');
    scoreboardPage.classList.remove('hidden');
});

// Exit Game Event
exitBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to exit? Current scores will be lost.')) {
        scoreboardPage.classList.add('hidden');
        setupPage.classList.remove('hidden');
    }
});

// Render the scoreboard dynamically based on state
function renderScoreboard() {
    teamsContainer.innerHTML = ''; // Clear previous content

    for (let i = 0; i < gameState.teamCount; i++) {
        const teamBox = document.createElement('div');
        teamBox.className = 'team-box';

        teamBox.innerHTML = `
            <div class="team-name">Team ${i + 1}</div>
            <div class="team-score" id="score-team-${i}">0</div>
            <div class="action-btns">
                <button class="btn btn-primary" onclick="updateScore(${i}, 1)">+1 Point</button>
                <button class="btn btn-success" onclick="updateScore(${i}, ${gameState.bonusValue})">+${gameState.bonusValue} Bonus</button>
                <button class="btn btn-danger" onclick="updateScore(${i}, -1)">-1 Point</button>
            </div>
        `;
        teamsContainer.appendChild(teamBox);
    }
}

// Global scope function for button clicks to modify scores
window.updateScore = function(teamIndex, points) {
    gameState.scores[teamIndex] += points;
    
    // Fallback to prevent negative scores if desired (optional)
    if (gameState.scores[teamIndex] < 0) gameState.scores[teamIndex] = 0;

    // Update DOM directly for performance
    document.getElementById(`score-team-${teamIndex}`).innerText = gameState.scores[teamIndex];
};