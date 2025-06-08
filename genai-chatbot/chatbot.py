import os
import logging
import openai

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

# openai.api_key = os.getenv("OPENAI_API_KEY")

def chat_with_bot(messages):
    try:
        client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0.7
        )
        logging.info(f"Response from OpenAI: {response}")
        return response.choices[0].message.content
    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        return f"An error occurred: {str(e)}"

# Main function to initiate the conversation
if __name__ == "__main__":
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello, who won the FIFA World Cup in 2018?"}
    ]

    answer = chat_with_bot(messages)
    print("Bot:", answer)