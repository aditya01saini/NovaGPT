import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "assistant",
          content:
            "You are a helpful assistant. Answer clearly in plain text only.",
        },

        {
          role: "user",
          content: message,
        },
      ],
    }),
  };

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      options,
    );

    const data = await response.json();
    //console.log(data.choices[0].message.content)
    return data.choices[0].message.content;
  } catch (err) {
    console.error(err);
    // res.status(500).send("Server error");
  }
};


export default getOpenAIAPIResponse;
