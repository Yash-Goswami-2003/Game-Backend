import express from 'express';
import { GameEngine } from './main.js';
import cors from 'cors';

const app = express();
const port = 3000;
const gameEngine = new GameEngine();

// Middleware
app.use(express.json());
app.use(cors());

// Initialize game state
app.post('/start-game', async (req, res) => {
    try {
        const initialGameState = req.body;
        const response = await gameEngine.GetResponse(initialGameState);
        res.json(JSON.parse(response));
    } catch (error) {
        res.status(500).json({ error: 'Failed to start game' });
    }
});

// Handle player decisions
app.post('/make-decision', async (req, res) => {
    try {
        const gameState = req.body;
        const response = await gameEngine.GetResponse(gameState);
        res.json(JSON.parse(response));
    } catch (error) {
        res.status(500).json({ error: 'Failed to process decision' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Game server running at http://localhost:${port}`);
});
