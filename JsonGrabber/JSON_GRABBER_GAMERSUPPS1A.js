import fetch from 'node-fetch';
import fs from 'fs';

const playerId = 69; // Replace with actual player ID
const playerEmail = 'your_email@example.com'; // Replace with actual player email
const apiUrlPlayAllowed = `https://vs-gamersupps-game.fly.dev/proxy/game/play/allowed?player_id=${playerId}`;
const apiUrlPrizes = 'https://vs-gamersupps-game.fly.dev/proxy/game/prizes?ashtml=true';
const apiUrlPlayGame = "https://vs-gamersupps-game.fly.dev/proxy/game/play";

// Check if Player is Allowed to Play
fetch(apiUrlPlayAllowed)
    .then(response => response.json())
    .then(data => {
        fs.writeFile('api_responses.txt', "1. Check if Player is Allowed to Play:\n" + JSON.stringify(data, null, 2) + "\n\n", { flag: 'a' }, err => {
            if (err) console.error(err);
        });
    });

// Fetch Prizes
fetch(apiUrlPrizes)
    .then(response => response.text())
    .then(data => {
        fs.writeFile('api_responses.txt', "2. Fetch Prizes:\n" + data + "\n\n", { flag: 'a' }, err => {
            if (err) console.error(err);
        });
    });

// Play Game
const gameData = {
    claw_position: 10, // Example value
    player_id: playerId,
    player_email: playerEmail
};

fetch(apiUrlPlayGame, {
    method: "POST",
    headers: {
        "Accepts": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify(gameData),
})
.then(response => response.json())
.then(data => {
    fs.writeFile('api_responses.txt', "3. Play Game:\n" + JSON.stringify(data, null, 2), { flag: 'a' }, err => {
        if (err) console.error(err);
    });
});
