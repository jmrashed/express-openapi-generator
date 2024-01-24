require("dotenv").config()
const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require("openai");
const app = express();
const port = 3000;
const openai = new OpenAI({
    apiKey: process.env['API_KEY'], // This is the default and can be omitted
});
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { message: 'Hello, EJS!' });
});
app.post('/', async (req, res) => {
    const { title } = req.body;
    if (title) {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `Give me an short paragraph based on topic ${title}` }],
            model: 'gpt-3.5-turbo',
        });
      return  res.json({ response:  chatCompletion.choices[0].message.content });
    }
    return res.json({ response: 'emplty title' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
