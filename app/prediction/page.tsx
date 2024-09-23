"use client";
import { FormEvent, useState, useEffect, useRef } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { getPrediction } from "@/actions/get-prediction";

export default function PredictionPage() {
  const [symbol, setSymbol] = useState("");
  const [symbols, setSymbols] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLInputElement>(null);

  // focus on input
  useEffect(() => {
    textareaRef.current?.focus();
  });

  /**
   * onAddStockSymbol
   * @param e
   * @returns
   */
  const onAddStockSymbol = (e: FormEvent) => {
    e.preventDefault();
    if (symbols.length >= 5) return;

    setSymbols((prevState) => [...prevState, symbol.toUpperCase()]);
    setSymbol("");
  };

  /**
   * Handle Submit
   * @param e
   * @returns
   */
  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await getPrediction(symbols);
      console.log("RES::: ", res);

      if (res.message) {
        setError(res.message);
        return;
      }

      setPrediction(res);
      setSymbols([]);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className="h-full p-20">
      <h1 className="text-4xl font-bold text-center">Stock Prediction</h1>

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

      <form
        className="flex flex-col items-center p-5 mb-10"
        onSubmit={handleSubmit}
      >
        <input
          ref={textareaRef}
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter stock symbol (e.g., AAPL)"
          className="text-black p-1 rounded mb-2 w-[50%]"
          required={symbols.length < 1}
        />

        <small className="text-sm font-medium mb-5">
          Enter one stock symbol at a time (e.g. AAPL){" "}
          <i className="text-green-300">the max you can add is five.</i>
        </small>
        {symbols.length >= 5 && (
          <small className="text-sm font-medium mb-5 text-red-400">
            Max reached
          </small>
        )}

        <Button
          className="bg-blue-600 my-2 font-medium disabled:bg-transparent"
          onClick={onAddStockSymbol}
          disabled={symbol.length < 1}
        >
          Add Stock Symbol
        </Button>

        <Button
          className="bg-green-500 my-2 font-medium disabled:bg-transparent"
          disabled={symbols.length < 1}
        >
          <div className="flex justify-center">
            {loading && <ArrowPathIcon className="size-6 mr-2 animate-spin" />}{" "}
            Get Prediction
          </div>
        </Button>
      </form>

      <>
        {error && (
          <div className="text-sm text-red-600 text-center">{error}</div>
        )}
      </>

      <>
        {prediction && (
          <div
            className="prediction"
            dangerouslySetInnerHTML={{ __html: prediction }}
          />
        )}
      </>
    </main>
  );
}
