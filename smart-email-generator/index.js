import { createCompletion, loadModel } from "gpt4all";
import readline from "readline";

async function startChatbot() {
    const model = await loadModel("orca-mini-3b-gguf2-q4_0.gguf", {
        verbose: true,
        device: "cpu",
        nCtx: 3072,
    });

    const chat = await model.createChatSession({
        temperature: 1,
        systemPrompt: `### System:
You are an experienced assistant who writes clear, professional, and helpful real-world emails.`,
    });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log("Chatbot started! Type your message (type 'exit' to quit):");

    async function chatLoop() {
        rl.question("> ", async (input) => {
            if (input.trim().toLowerCase() === "exit") {
                rl.close();
                await model.dispose();
                console.log("Chat ended.");
                return;
            }

            // Stage 1: Check if it's a real email request
            //         const checkPrompt = `Determine whether the following request is asking you to write a real email for actual communication. A bit of fun is fine

            // Request: "${input}"

            // Reply with only "yes" or "no".`;
            const checkPrompt = `
CONTENT SAFETY ANALYSIS TASK:

You are a content moderator for a professional email generator. Analyze the user input to determine if it contains genuinely harmful or inappropriate content.

ONLY BLOCK if the request contains:
- Direct hate speech, slurs, or discrimination
- Explicit profanity or vulgar language
- Clear threats or intimidation
- Personal attacks or harassment
- Sexual content or inappropriate references
- Requests to deceive, scam, or mislead others

EXAMPLES OF UNSAFE REQUESTS:
- "Write an email calling someone [slur/profanity]"
- "Create a threatening email to intimidate someone"
- "Write a harassing message with insults"
- "Generate a deceptive email to trick people"

EXAMPLES OF SAFE REQUESTS (ALLOW THESE):
- "Write a leave request email"
- "Create a complaint email about poor service"
- "Generate an urgent meeting request"
- "Write a firm but professional email about deadline concerns"
- "Create an email expressing disappointment professionally"
- "Write an email about planned leave in the coming month"

IMPORTANT: 
- Professional emails can express concerns, complaints, or urgent matters
- Allow requests for legitimate business communications
- Only block genuinely harmful or inappropriate content
- When unsure about borderline cases, lean toward ALLOWING the request

USER INPUT TO ANALYZE: "${input}"

Strictly Reply with only "yes" or "no".`;

            const checkRes = await createCompletion(chat, checkPrompt);
            const checkReply = (checkRes.choices[0].message.content || checkRes.choices[0].message).trim().toLowerCase();
            console.log("\n🤖 Checking replyyyy: " + checkReply);
            if (checkReply.includes("allow") || checkReply.includes("yes")) {
                // Stage 2: Actually generate the email
                const emailPrompt = `Please write a complete email for the following request:\n\n"${input}"`;
                const res = await createCompletion(chat, emailPrompt);
                const reply = res.choices[0].message.content || res.choices[0].message;
                console.log("\n📧 Email Draft:\n" + reply + "\n");
            } else {
                // Deny unrelated requests
                console.log("❌ I only assist with writing real-world emails. Please ask me to draft a real email.");
            }

            chatLoop();
        });
    }

    chatLoop();
}

startChatbot();