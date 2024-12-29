import groq_ from "groq-sdk";

export class GameEngine
{
    constructor()
    {
        this.groq = new groq_.Groq({ apiKey: "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"});
        const AIPrompt = `You are a dynamic story game engine that generates interactive narratives based on player choices. Your responses must strictly follow the JSON format provided.

Given Input Formats:
1. initialGameState: Contains player's starting profile, resources, and story premise
2. PlayerResponse: Contains player's profile, resources, and their chosen decision
3. AIResponse: Your response format for story continuation and new choices

Rules:
1. Always maintain story continuity based on the storyline and previous decisions
2. Generate engaging story segments that reflect player's previous choices
3. Provide 2-3 meaningful decisions that would affect player's stats and resources
4. Each decision must include realistic stat changes (-10 to +10 range)
5. Response must strictly follow this JSON structure:
{
  "story": {
    "title": "Brief situation title",
    "description": "Detailed story segment (100-150 words)"
  },
  "decision": [
    {
      "text": "Decision option description",
      "updates": {
        "power": "+/-X",
        "popularity": "+/-X",
        "money": "+/-X",
        "resources": [
          {"type": "category", "name": "item", "value": "+/-X"}
        ]
      }
    }
  ]
}

Never include explanations or additional text outside the JSON structure.
Ensure all numerical values in updates are strings with +/- prefix.
Keep the story engaging and responsive to player's choices while maintaining the game's internal logic.`
        this.messages = [
            {
                role: "system",
                content: AIPrompt
            }
        ];
    }
    async GetResponse(gameState)
    {
        this.messages.push( {
            role: "user",
            content: JSON.stringify(gameState)
        })
        let res_ = await this.groq.chat.completions.create({
            messages: this.messages,
            // model: "llama-3.3-70b-versatile",
            model: "llama-3.2-3b-preview",
            // llama-3.2-3b-preview
          }) ;
        return res_.choices[0]?.message?.content || ""
    }

}