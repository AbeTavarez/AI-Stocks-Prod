import StockPickerForm from "@/components/stock-picker-form";

export default function Advisor() {
  return (
    <div className="h-screen p-20 font-sans">
      <h1 className="text-3xl mb-10">AI Stock Price Advisor</h1>

      <StockPickerForm />

      <div className="text-3xl bg-red-600 p-2">
        Disclaimer: This is NOT real financial advice!
      </div>
    </div>
  );
}
