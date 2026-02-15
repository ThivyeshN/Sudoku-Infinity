function resetGame() {
    const difficulty = document.getElementById('difficulty').value;
    let clueCount;

    switch (difficulty) {
        case 'easy':
            clueCount = 50;
            break;
        case 'med':
            clueCount = 40;
            break;
        case 'hard':
            clueCount = 30;
            break;
        default:
            clueCount = 40; // Default to medium if no valid selection
    }

    // Additional logic for resetting the game with the clue count.
    initializeGame(clueCount);
}