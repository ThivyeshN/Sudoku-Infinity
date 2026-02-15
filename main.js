// Updating the difficulty mapping
function resetGame(difficulty) {
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
            throw new Error('Invalid difficulty level');
    }
    // The rest of the resetGame function logic goes here...
}