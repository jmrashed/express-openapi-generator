const OpenAI = require("openai");
const asyncHandler = require("express-async-handler");

const { env } = require("../config/env");
const route = require("../routes/v1");

/**
 * match id is a number
 */

route.get("/generator", (req, res) => {
  res.render("index", { message: "Hello, EJS!" });
});

route.post(
  "/generator",
  asyncHandler(async function getMatches(req, res) {
    console.log(env.OPENAI_KEY);
    try {
      const openai = new OpenAI({
        apiKey: env.OPENAI_KEY,
      });

      const { title } = req.body;

      if (title) {
        const chatCompletion = await openai.chat.completions.create({
          messages: [
            {
              role: "user",
              content: `Give me an short paragraph based on topic ${title}`,
            },
          ],
          model: "gpt-3.5-turbo",
        });
        return res.json({
          response: chatCompletion.choices[0].message.content,
        });
      }
      return res.json({ response: "emplty title" });
    } catch (error) {
      console.error(error);
    }
  })
);

module.exports = route;
