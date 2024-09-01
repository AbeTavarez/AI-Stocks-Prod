'use server'
import OpenAI from "openai";
import { fetchStocksData } from "./stocks-actions";

// OPENAI Client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export async function getPrediction(symbols: string[]) {
    try {
        const stocksResults = await fetchStocksData(symbols);
        console.log('====== HERE =========', stocksResults);

        const stocksHistoricalData = stocksResults.filter(r => !r.error);

        console.log(stocksHistoricalData);

        if (stocksHistoricalData.length < 0) {
            throw new Error("No historical data found.");
        }

        // OPEN AI


        
        
    } catch (e) {
        console.error(e);
        
    }
}
