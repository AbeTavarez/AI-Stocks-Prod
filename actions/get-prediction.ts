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
      `
      Your task is to provide a brief stock price prediction for the next stock market opening day.
      You will be provided with a list of stock symbols and their historical data as follow:
        {
            symbol: <stock symbol>,
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

        Use the historical data and search for the latest trends before making your prediction.

        Format the response of each of the stock symbols in HTML just like the two example below:
        
        Example #1:

        <section>
          <h2>Stock Price Predictions</h2>
            <div>
              <h3>GME (GameStop Corp.)</h3>
              <p><strong>Latest Close Price:</strong> $21.85</p>
              <p><strong>Latest Trend:</strong> GME has shown a consistent pattern of volatility with a recent upward trend, reaching highs of $28.10.</p>
              <p><strong>Prediction for Next Opening Day:</strong> $22.10</p>
              <p><strong>Analysis:</strong> price prediction considers the recent upward trend following a lower close, alongside potential market movements. Trading volume has been significantly high, indicating increased interest which could lead to a slight price increase.</p>
            </div>
        </section>

        Example #2:

        <section>
          <h2>Stock Price Predictions</h2>
          <div>
              <h3>DELL (DELL Technologies Inc.)</h3>
              <p><strong>Latest Close Price:</strong> $117.5</p>
              <p><strong>Latest Trend:</strong> DELL has shown a consistent pattern of volatility with a recent upward trend, reaching highs of $118.84.</p>
              <p><strong>Prediction for Next Opening Day:</strong> $118.25</p>
              <p><strong>Analysis:</strong> The stock has shown a stable upward momentum, closing higher than its opening price in several recent sessions. Considering the latest trend and historical performance, the prediction estimates a slight increase at the next opening.
              </p>
          </div>

          <div>
              <h3>AAPL (Apple Inc.)</h3>
              <p><strong>Latest Close Price:</strong> $217.70</p>
              <p><strong>Latest Trend:</strong> IBM has shown a consistent pattern of volatility with a recent upward trend, reaching highs of $218.84.</p>   
              <p><strong>Prediction for Next Opening Day:</strong> I predict the opening price for IBM will be around <strong>$218.50</strong>, reflecting the recent bullish momentum.</p>
          </div>
        </section>

        Don't add any other extra markup.

        The actual historical data will start right after this line:
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
    return { prediction };
  } catch (e: any) {
    console.error("RETURN ERROR::::", e);
    return { message: e.message };
  }
}
