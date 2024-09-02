"use server";
import OpenAI from "openai";
import { fetchStocksData } from "./stocks-actions";

// OPEN AI Client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getPrediction(symbols: string[]) {
  try {
    const stocksResults = await fetchStocksData(symbols);
    console.log("====== HERE =========", stocksResults);

    // TODO: check for stock errors
    const stocksHistoricalData = stocksResults.filter((r) => !r.error);

    console.log(stocksHistoricalData);

    if (stocksHistoricalData.length < 0) {
      throw new Error("No historical data found.");
    }

    // OPEN AI
    const prompt = [
      "Provide a brief stock price prediction for each of the following stocks based on the provided historical data of the last two years.",
      `
        The data is organized as follow:
        {
            symbol: stock symbol ticker,
            data: [historical data]
        }
        The [historical data] is organized as follow:
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

        Here is the data:
        `,
    ];

    //
    stocksHistoricalData.forEach((item) => {
        console.log(item?.symbol.results);
        
      const dataObj = {
        symbol: item.symbol?.ticker,
        data: item?.symbol.results.map(obj => JSON.stringify(obj)).join(""),
      };
      prompt.push(JSON.stringify(dataObj));
    });

    console.log(prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a stock market expert." },
        { role: "user", content: prompt.join('') },
      ],
    });

    const prediction = completion.choices[0].message.content;
    console.log(prediction);
  } catch (e) {
    console.error(e);
  }
}
