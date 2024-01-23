# Node.js OpenAI Chatbot Example

This is a simple Node.js application that uses the OpenAI API to generate a short paragraph based on a given topic.

## Prerequisites

Before running the application, make sure you have the following:

- Node.js installed
- OpenAI API key (you can obtain this from the [OpenAI website](https://beta.openai.com/signup/))

## Installation

1. Clone the repository:
```bash
    git clone https://github.com/jmrashed/express-openapi-generator.git
```
2. Install dependencies:
```bash
npm install
```
3. Create a .env file in the project root and add your OpenAI API key:
```bash
API_KEY=your_openai_api_key
```


# Demo 
<img src="./Screenshot 2024-01-23 at 6.53.00 PM.png">

## Usage
1. Start the server:
```bash
npx nodemon index.js
```
2. Open your browser and go to `http://localhost:3000`.
3. Enter a topic in the input field and click the "Generate" button.
4. The server will use the OpenAI API to generate a short paragraph based on the provided topic.