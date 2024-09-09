import StockPickerForm from "@/components/stock-picker-form";
import ServiceCard from "@/components/ui/service-card";

export default function Advisor() {
  return (
    <main className="h-full p-20 font-sans">
      <h1 className="text-3xl mb-10 font-extrabold">AI Stock Advisor</h1>

      <p className="text-center mt-5 font-semibold text-3xl">Unlock the Future of Investing with AI</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-20 my-10">
        <ServiceCard
          service="Stock Prediction"
          pathName="/prediction"
          description="Get a short stock prediction based on the stock historical data."
        />
        <ServiceCard
          service="Sentiment Analysis"
          pathName="/sentiment"
          description="Determine the market sentiment surrounding specific stocks."
        />
        <ServiceCard
          service="Personalized Financial Planning"
          pathName="/sentiment"
          description="Get a tailored investment plan based on your personal financial goal."
        />
        <ServiceCard
          service="Historical Data Insights"
          pathName="/sentiment"
          description="Get detailed insights and visualizations of historical stock performance."
        />
        <ServiceCard
          service="Market Scenarios Simulation"
          pathName="/sentiment"
          description="Simulate different market conditions (e.g., bull or bear markets) and see how your stocks would perform."
        />
        <ServiceCard
          service="Risk Assessment"
          pathName="/sentiment"
          description="Assess the risk level of your portfolios or potential investments."
        />
      </div>

      <StockPickerForm />

      <div className="text-3xl bg-red-600 p-2 mt-5">
        Disclaimer: This is NOT real financial advice!
      </div>
    </main>
  );
}
