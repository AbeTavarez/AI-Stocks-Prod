"use server";
import { restClient } from "@polygon.io/client-js";
import {
  yesterdaysDateString,
  getTwoYearsBackFromYesterday,
  getMonthsBackFromYesterday,
} from "@/lib/dateHelper";

import { IAggs } from "@polygon.io/client-js";

const rest = restClient(process.env.POLY_API_KEY);

const yesterday = yesterdaysDateString();
const twoYearsBack = getTwoYearsBackFromYesterday();
const monthsBack = getMonthsBackFromYesterday(1);

interface StockDataResult extends IAggs {
  error?: {error: string, status: string},
  
}

export async function fetchStocksData(symbols: string[]) {
  // Fetch each symbol data
  const fetchStock = async (symbol: string) => {
    try {
      const data = await rest.stocks.aggregates(
        symbol,
        1,
        "day",
        monthsBack,
        yesterday,
      );
      // console.log("DATA::: ", data);

      // Reject if no data was found
      if (data.status !== "OK" || data.resultsCount === 0) {
        return Promise.reject(
          `Data not available for ticker symbol ${data.ticker}`,
        );
        // throw new Error(`Data not available for ticker symbol ${data.ticker}`);
      }

      // success
      return data;
    } catch (e) {
      console.error(`Error fetching data for ${symbol}:`, e);
      // return e;
    }
  };

  try {
    // Promises array; Call the API concurrently up to 5 calls per min
    const results = await Promise.allSettled(symbols.map(fetchStock));

    // console.log("RESULTS::: ", results);

    // map over the promises
    return results.map((result) => {
      // console.log(result);

      if (result.status === "fulfilled") {
        console.log('RESULT', result.value);
        
        return result.value as StockDataResult;
      } else {
        console.error("Promise rejected:", result.reason);

        const error: StockDataResult = {
          error: result.reason,
        };
        return error;
      }
    });
  } catch (e) {
    console.error("Unexpected error in fetchStocksData:", e);
    throw new Error("Failed to fetch stocks data");
  }
}
