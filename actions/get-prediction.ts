"use server";
import OpenAI from "openai";
import { fetchStocksData } from "./stocks-actions";

// OPEN AI Client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getPrediction(symbols: string[]) {
  try {
    const stocksResults = await fetchStocksData(symbols);
    // console.log("====== HERE =========", stocksResults);

    if (stocksResults.length <= 0) {
      throw new Error("No historical data found, please try again.");
    }

    // Check for errors on rejected
     stocksResults.forEach((item) => {
      if (item.error) throw new Error(`${item?.error}, please try again.`);
    });

    // OPEN AI
    const prompt = [
      `Your task is to provide a brief stock price prediction for each of the following stocks based on the provided historical data delimited by triple quotes. Also search for the latest stock trends for each stock and predict the price for the next opening day. 

      Format the response inside a HTML div with other semantic elements, and don't add any other extra markup.`,
      `
        The data is organized as follow:
        {
            symbol: <stock symbol ticker>,
            data: <historical data>
        }
        The <historical data> is organized as follow:
        {
            c: The close price for the symbol in the given time period,
            h: The highest price for the symbol in the given time period,
            l: The lowest price for the symbol in the given time period,
            n: The number of transactions in the aggregate window,
            o: The open price for the symbol in the given time period,
            otc: Whether or not this aggregate is for an OTC ticker. This field will be left off if false,
            t: The Unix Msec timestamp for the start of the aggregate window,
            v: The trading volume of the symbol in the given time period,
            vw: The volume weighted average price
        }

        Here is the actual data:
        """
        `,
    ];

    // Push an object with historical data to the prompt array
    stocksResults.forEach((symbol) => {
      // console.log(symbol);

      const dataObj = {
        symbol: symbol?.ticker,
        data: symbol.results?.map((obj) => JSON.stringify(obj)).join(""),
      };
      // console.log(dataObj)
      prompt.push(JSON.stringify(dataObj));
    });

    // console.log(prompt);

    // Completion API Call
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a stock market expert." },
        { role: "user", content: prompt.join("") },
      ],
    });

    const prediction = completion.choices[0].message.content;
    console.log(prediction);
    return prediction;
  } catch (e: any) {
    console.error("RETURN ERROR::::", e);
    return e.message;
  }
}
