import { Prediction } from "@/app/types";

export default function PredictionItem(props: Prediction) {
  const { symbol, latestClosePrice, latestTrend, nextDayPrediction, analysis } =
    props;
  return (
    <section className="prediction">
      <h2>Stock Price Predictions</h2>
      <div>
        <h3>{symbol}</h3>
        <p>
          <strong>Latest Close Price:</strong> ${latestClosePrice}
        </p>
        <p>
          <strong>Latest Trend:</strong> {latestTrend}
        </p>
        <p>
          <strong>Prediction for Next Opening Day:</strong> ${nextDayPrediction}
        </p>
        <p>
          <strong>Analysis:</strong> {analysis}
        </p>
      </div>
    </section>
  );
}
