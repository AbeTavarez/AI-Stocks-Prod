"use client";

import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { getPrediction } from "@/actions/get-prediction";

export default function StockPickerForm() {
  const [symbol, setSymbol] = useState("");
  const [symbols, setSymbols] = useState<string[]>([]);

  const onAddStockSymbol = (e: FormEvent) => {
    e.preventDefault();
    setSymbols((prevState) => [...prevState, symbol.toUpperCase()]);
    setSymbol("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getPrediction(symbols)
  }

  return (
    <div className="bg-green-600 w-full rounded-lg">
      <div className="h-5">
        {symbols.length > 0 && (
          <div className="flex justify-center pt-2">
            {symbols.map((s) => (
              <div key={s} className="mr-5 font-semibold">
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      <form className="flex flex-col items-center p-5 mb-10" onSubmit={handleSubmit}>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter stock symbol (e.g., AAPL)"
          className="text-black w-full p-1 rounded"
          required
        />

        <Button
          className="bg-green-400 my-2 font-medium disabled:bg-transparent"
          onClick={onAddStockSymbol}
          disabled={symbol.length < 1}
        >
          Add Stock Symbol
        </Button>

        <Button className="bg-black my-2 font-medium disabled:bg-transparent" disabled={symbols.length < 1}>
          Get Prediction
        </Button>
      </form>
    </div>
  );
}
