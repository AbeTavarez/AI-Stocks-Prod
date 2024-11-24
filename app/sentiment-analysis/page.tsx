"use client";
import { useState, useEffect } from "react";
import { getSentiment } from "../actions/getSentiment";
import { SentimentResult } from "../types";

export default function SentimentAnalysis() {
  const [sentimentResult, setSentimentResult] =
    useState<SentimentResult | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const sentimentData = await getSentiment("AAPL");
      console.log(sentimentData);
      setSentimentResult(sentimentData);
    };
    fetchData();
  }, []);

  return (
    <main>
      <h1>Sentiment Analysis</h1>

      <div>
        {sentimentResult && (
          <div>
            <h2>{sentimentResult.mainSentiment}</h2>
            <h2>{sentimentResult.posts[0].title}</h2>
            <h2>{sentimentResult.sentimentCount.positive}</h2>
            <h2>{sentimentResult.sentimentCount.negative}</h2>
            <h2>{sentimentResult.sentimentCount.neutral}</h2>
          </div>
        )}
      </div>
    </main>
  );
}
