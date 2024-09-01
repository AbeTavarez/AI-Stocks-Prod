import StockTickerPrice from "@/components/stock-picker-form";

export default function Advisor() {
  return (
    <div className="h-screen p-20">
      <h1 className="text-2xl mb-10">AI Stock Price Agent</h1>


      <div>
        {/* IMAGE  */}
        <StockTickerPrice />
      </div>


      <div className="text-3xl bg-red-600">
        This is NOT real financial advice!
      </div>
    </div>
  );
}
