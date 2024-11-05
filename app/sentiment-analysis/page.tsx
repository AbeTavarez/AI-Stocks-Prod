"use client";
import { useEffect } from "react";
import handler from "../actions/reddit";

export default function Sentiment() {
  
  useEffect(() => {
    const fetchData = async (ticker: string) => {
      try {
     

        const res = await handler('AAPL');
        const data = await res.json()
        console.log(data);
        
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData('AAPL');
  }, []);

  return (
    <div>
      <h1>Sentiment</h1>
    </div>
  );
}
