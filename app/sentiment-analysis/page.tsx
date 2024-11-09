"use client";
import { useEffect, useState } from "react";
import handler from "../actions/reddit";

export default function Sentiment() {
  const [sentimentResult, setSentimentResult] = useState([]);
  useEffect(() => {
    const fetchData = async (ticker: string) => {
      try {
     

        const result = await handler(ticker);
        console.log(result);
        setSentimentResult(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData('AAPL');
  }, []);

  return (
    <div>
      <h1>Sentiment</h1>

      {/* <div>
        {sentimentResult.length > 1  &&sentimentResult.map((r, i) => (
          <div key={i}>
            <h2>{r.title}</h2>
            <h2>{r.sentiment}</h2>
            
          </div>
        ))}
      </div> */}
    </div>
  );
}
