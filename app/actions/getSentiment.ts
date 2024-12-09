"use server";
import OpenAI from "openai";
import {
  RedditPost,
  ParsedPost,
  SentimentCount,
  SentimentResult,
} from "../types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// In-memory cache for the access token
let cachedAccessToken: string | null = null;
let tokenExpiryTime = 0;
let accessToken = null;

export async function getSentiment(ticker: string) {
  try {
    // NEW =================================================================
    const now = Date.now();
    // Check if a valid token is cached
    if (cachedAccessToken && now < tokenExpiryTime) {
      console.log("Returning cached access token");
      accessToken = cachedAccessToken;
    } else {
      // ==== Reddit Auth Token ===============
      const auth = Buffer.from(
        `${process.env.REDDIT_WEB_APP}:${process.env.REDDIT_SECRET}`,
      ).toString("base64");

      const redditRes = await fetch(
        "https://www.reddit.com/api/v1/access_token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${auth}`,
          },
          body: `grant_type=client_credentials`,
        },
      );

      console.log("RES::::: ", redditRes?.headers?.get("content-type"));
      console.log("AUTH RES::::: ", redditRes);

      //? Check ================
      if (!redditRes.ok) {
        throw new Error("Failed to get Reddit Auth Token");
      }

      const tokenData = await redditRes.json();
      //   console.log(tokenData);
      console.log("HEREEEEEEEEEEEE", tokenData.expires_in);

      cachedAccessToken = tokenData.access_token;
      tokenExpiryTime = now + tokenData.expires_in * 1000;
      accessToken = tokenData.access_token;
    }
    console.log("ACCESS TOKEN::: ", accessToken);
    // console.log(ticker);

    // ===== Fetch SubReddit Data =============
    const res = await fetch(
      `https://oauth.reddit.com/r/stocks/search?q=${ticker}&limit=5&sort=new&restrict_sr=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": `web:${process.env.REDDIT_WEB_APP}:v0.1 (by /u/abe_http)`,
          Accept: "*/*",
          Connection: "keep-alive",
          "Accept-Encoding": "gzip, deflate, br",
        },
      },
    );

    console.log("DATA RES::: ", res);

    const subRedditData = await res.json();
    console.log("SUBREDDIT DATA::: ", subRedditData.data);

    // ===== Prepare Data =====================

    const posts: ParsedPost[] = subRedditData.data.children.map(
      (p: RedditPost) => {
        return {
          title: p.data.title,
          content: p.data.selftext,
        };
      },
    );

    // console.log('POST+++++++', posts);

    // ============== Posts Sentiment Analysis =================
    const postsSentiment = await Promise.all(
      posts.map(async (p) => {
        const prompt = `
            Your task is to analyze the sentiment of the following text and classify it as positive, negative, or neutral.

            You will be provided with a title and content, analyze both the title and the content before analyzing the sentiment.
            
            {
                title: ${p.title},
                content: ${p.content}
            }

            Do not add any other extra information, just provide the sentiment.

            Provide only one word as the output: positive, negative, or neutral. 
            `;

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
        });

        const sentiment = completion.choices[0].message.content || "neutral";
        // console.log(sentiment);

        return {
          ...p,
          sentiment,
        };
      }),
    );
    // console.log(postsSentiment);

    // return postsSentiment;

    // Aggregate the sentiment
    const sentimentCount: SentimentCount = {
      positive: 0,
      negative: 0,
      neutral: 0,
    };

    postsSentiment.forEach((post) => {
      if (post.sentiment === "positive") sentimentCount.positive += 1;
      else if (post.sentiment === "negative") sentimentCount.negative += 1;
      else sentimentCount.neutral += 1;
    });

    // Decide the main sentiment using OpenAI
    const summaryPrompt = `
      Based on the following sentiment counts from social media posts about the stock ticker ${ticker}, determine the main overall sentiment:
      - Positive: ${sentimentCount.positive} posts
      - Negative: ${sentimentCount.negative} posts
      - Neutral: ${sentimentCount.neutral} posts

      Only respond with "positive", "negative", or "neutral".
    `;

    const mainSentimentCompletion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: summaryPrompt }],
    });

    const mainSentiment = mainSentimentCompletion.choices[0].message.content
      ?.trim()
      .toLowerCase();

    console.log(mainSentiment);

    if (!mainSentiment) {
      throw new Error("Error generating Main Sentiment");
    }

    // Return main sentiment and individual post details
    const sentiment: SentimentResult = {
      mainSentiment,
      posts: postsSentiment,
      sentimentCount,
    };

    console.log(sentiment);

    return sentiment;
  } catch (e: any) {
    console.error(e);
  }
}
