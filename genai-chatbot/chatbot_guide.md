# ChatCompletion AI Bot - Complete Guide

---

## 1. Environment Setup (Mac M1)

### Initial Setup
- Open Terminal
- Create project folder and navigate into it:

```bash
cd ~/Desktop
mkdir genai-chatbot
cd genai-chatbot
```

### Virtual Environment Setup
- Create Python virtual environment:

```bash
python3 -m venv venv
```

- Activate the virtual environment:

```bash
source venv/bin/activate
```

- Install OpenAI Python package:

```bash
pip install openai
```

## 2. Store OpenAI API Key Securely

### Temporary Setup (Current Session)
- Export API key in terminal session:

```bash
export OPENAI_API_KEY="your_api_key_here"
```

### Permanent Setup
- To persist, add this line to your `~/.zshrc` file:

```bash
export OPENAI_API_KEY="your_api_key_here"
```

- Reload shell config:

```bash
source ~/.zshrc
```

## 3. Writing the Chatbot Python Script (`chatbot.py`)

### Import Libraries & Load API Key

```python
import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")
```

### Define the Chat Function

```python
def chat_with_bot(messages):
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=messages,
        temperature=0.7
    )
    return response.choices[0].message['content']
```

### Example Usage in Main Script

```python
if __name__ == "__main__":
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who won FIFA World Cup 2018?"}
    ]
    answer = chat_with_bot(messages)
    print("Bot:", answer)
```

## 4. Running Your Bot

- Ensure your virtual environment is active (you should see `(venv)` prefix in terminal)
- Run the script:

```bash
python chatbot.py
```

## 5. Folder Structure

```
genai-chatbot/
├── venv/          # virtual environment folder (auto-created)
├── chatbot.py     # your main script
```

## 6. Common Error - Quota Exceeded

### Error Details
- **Error message**: `429 - insufficient_quota`
- **Meaning**: Your OpenAI API quota has been used up or billing is not set up

### Fix Steps
- Check your usage at: https://platform.openai.com/account/usage
- Add billing details here: https://platform.openai.com/account/billing
- **Important**: Without active quota, API calls will fail

## 7. Optional: Interactive Chat Loop (Enhancement)

Add a continuous loop to chat repeatedly with the bot:

```python
if __name__ == "__main__":
    messages = [{"role": "system", "content": "You are a helpful assistant."}]
    
    print("Start chatting with the bot! Type 'exit' to quit.")
    
    while True:
        user_input = input("You: ")
        
        if user_input.lower() == "exit":
            break
            
        messages.append({"role": "user", "content": user_input})
        bot_response = chat_with_bot(messages)
        print("Bot:", bot_response)
        messages.append({"role": "assistant", "content": bot_response})
```

## 8. Simple Chat Flow Diagram

```
User Input ---> [chat_with_bot()] ---> OpenAI API
    ^                                       |
    |---------------------------------------|
                    Response
```

## 9. Complete Working Example

Here's the full `chatbot.py` file with interactive chat:

```python
import os
import openai

# Set up OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

def chat_with_bot(messages):
    """
    Send messages to OpenAI's ChatCompletion API and return the response
    """
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0.7
        )
        return response.choices[0].message['content']
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    # Initialize conversation with system message
    messages = [{"role": "system", "content": "You are a helpful assistant."}]
    
    print("🤖 ChatBot Ready! Type 'exit' to quit.")
    print("=" * 40)
    
    while True:
        user_input = input("\nYou: ")
        
        if user_input.lower() in ['exit', 'quit', 'bye']:
            print("👋 Goodbye!")
            break
            
        # Add user message to conversation history
        messages.append({"role": "user", "content": user_input})
        
        # Get bot response
        bot_response = chat_with_bot(messages)
        print(f"Bot: {bot_response}")
        
        # Add bot response to conversation history
        messages.append({"role": "assistant", "content": bot_response})
```

## 10. Troubleshooting Tips

### Virtual Environment Issues
- Make sure `(venv)` appears in your terminal prompt
- If not active, run: `source venv/bin/activate`

### API Key Issues
- Verify key is set: `echo $OPENAI_API_KEY`
- Make sure there are no extra spaces or quotes

### Import Errors
- Ensure OpenAI package is installed in the virtual environment
- Try: `pip list` to see installed packages

---

**Keep this guide handy for your ChatCompletion AI Bot development journey!**