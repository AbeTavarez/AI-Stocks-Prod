"use server";
import OpenAI from "openai";

// OPEN AI Client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function GET(ticker: String) {
  try {
    const API_URL = `https://oauth.reddit.com/r/stocks/search?q=${ticker}&limit=10&sort=new`;

    // ===== Get reddit auth token =====
    const auth = Buffer.from(
      `${process.env.REDDIT_WEB_APP}:${process.env.REDDIT_SECRET}`,
    ).toString("base64");

    const tokenRes = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth}`,
      },
      body: `grant_type=client_credentials&redirect_uri=${process.env.REDIRECT_URI}`,
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;
    // console.log(accessToken);

    // ===== Fetch subreddit data =====
    const res = await fetch(
      `https://oauth.reddit.com/r/stocks/search?q=${ticker}&limit=11&sort=new&restrict_sr=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const listings = await res.json();
    console.log(listings);

    // Prepare data
    const posts = listings.data.children.map((p) => {
      if (!p.data.stickied) {
        
        return {
          title: p.data.title,
          selfText: p.data.selftext,
        };
      }
    });

    // ===== Posts Sentiment Analysis ======
    const postsSentiment = await Promise.all(
      posts.map(async (p) => {
        const prompt = `
          Your task is to analyze the sentiment of the following text and classify it as positive, negative, or neutral.

          You will be provided with a title and content, analyze both the title and the content before analyzing the sentiment.

          {
            title: ${p.title},
            content: ${p.selfText}
          }

          Do not add any other extra information, just provide the sentiment.
        `;

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
        });

        const sentiment = completion.choices[0].message.content;
        console.log(sentiment);

        return {
          ...posts,
          sentiment,
        };
      }),
    );
    console.log(postsSentiment);
    return postsSentiment;

    // return data;
  } catch (error) {
    console.error(error);
  }
}
