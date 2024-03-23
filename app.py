import os
from dotenv import load_dotenv
from flask import Flask, request

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

load_dotenv()

app = Flask(__name__)

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

llm = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=GOOGLE_API_KEY , temperature=0.3)

tweet_prompt = PromptTemplate.from_template("drawing insights from the given transcript return a string that contains the following information in this output format, username: 'fill in usrname', query: 'user query', time preferred: 'user time preferred' {transcript}.")

tweet_chain = LLMChain(llm=llm, prompt=tweet_prompt, verbose=True)

@app.route('/generate_tweet', methods=['POST'])
def generate_tweet():
    if request.method == 'POST':
        transcript = request.json.get('transcript', '')
        if transcript:
            resp = tweet_chain.run(transcript=transcript)
            return str(resp)
        else:
            return "transcript not provided in the request body", 400
    else:
        return "Unsupported method", 405

if __name__ == '__main__':
    app.run(debug=True)
