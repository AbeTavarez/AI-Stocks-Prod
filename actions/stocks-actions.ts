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
  try {
    
    // concurrently call the api up to 5 calls per min
    const _result = await Promise.all(
      symbols.map(async (symbol) => {
        const data = await rest.stocks.aggregates(
          symbol,
          1,
          "day",
          twoYearsBack,
          yesterday,
        );
        console.log("DATA::: ", data);
      }),
    );
    console.log("RESULT::: ", _result);
  } catch (e) {
    console.error(e);
  }
}
