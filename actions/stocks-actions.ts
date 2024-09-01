"use server";
import { restClient } from "@polygon.io/client-js";
import {
  yesterdaysDateString,
  getTwoYearsBackFromYesterday,
} from "@/utils/dateHelper";

const rest = restClient(process.env.POLY_API_KEY);

const yesterday = yesterdaysDateString();
const twoYearsBack = getTwoYearsBackFromYesterday();

export async function fetchStocksData(symbols: string[]) {
  const fetchStock = async (symbol: string) => {
    try {
      const data = await rest.stocks.aggregates(
        symbol,
        1,
        "day",
        twoYearsBack,
        yesterday,
      );
      console.log("DATA::: ", data);

      // Reject if no data was found
      if (data.resultsCount === 0) {
        throw new Error(`Data not available for ticker symbol ${data.ticker}`);
      }
      // success
      return { symbol: data };
    } catch (e) {
      console.error(`Error fetching data for ${symbol}:`, e);
      return {
        symbol,
        error: e instanceof Error ? e.message : "An unknown error occurred",
      };
    }
  };
  try {
    // Call the API concurrently up to 5 calls per min
    const results = await Promise.allSettled(symbols.map(fetchStock));

    console.log("RESULTS::: ", results);

    return results.map((result) => {
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        console.error("Promise rejected:", result.reason);
        return {
          symbol: "Unknown", // We don't know which symbol caused the error here
          error:
            result.reason instanceof Error
              ? result.reason.message
              : "An unknown error occurred",
        };
      }
    });
  } catch (e) {
    console.error('Unexpected error in fetchStocksData:', e);
    throw new Error('Failed to fetch stocks data');
  }
}
