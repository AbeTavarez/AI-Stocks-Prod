import Hero from "@/components/ui/hero";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 font-sans">
      
      <Hero />

      <div className="mt-32">
        <p className=" text-2xl md:text-5xl text-center leading-loose">
          Welcome to the next generation of stock market analysis. Our
          AI-powered chatbot harnesses the power of advanced machine learning
          algorithms to analyze historical stock data and provide accurate
          predictions, helping you make informed investment decisions.
        </p>
      </div>

      <div className="flex gap-5">
        <div className="flex justify-center items-center my-32 bg-green-300 h-96 w-80 md:w-96 rounded-ss-full">
          <Link
            href="/#how-it-works"
            className="font-bold text-black hover:underline"
            style={{ fontSize: "2rem" }}
          >
            How it Works
          </Link>
        </div>
        <div className="flex justify-center items-center my-32 bg-green-300 h-96 w-80 md:w-96 rounded-se-full">
          <Link
            href="/advisor"
            className="font-bold text-black hover:underline"
            style={{ fontSize: "2rem" }}
          >
            Get started
          </Link>
        </div>
      </div>

      <div className="my-32">
        <h2 className="text-5xl font-semibold mb-5 text-center">
          Why Choose Our AI Chatbot?
        </h2>

        <ul className="text-xl md:text-2xl">
          <li className="list-disc">
            Data-Driven Insights: Leveraging vast amounts of historical stock
            data, our chatbot delivers data-driven predictions to guide your
            investment strategy.
          </li>
          <li className="list-disc">
            Real-Time Predictions: Get instant predictions and market trends
            directly from our chatbot, allowing you to stay ahead of the curve.
          </li>
          <li className="list-disc">
            User-Friendly Interface: Chat with our intuitive AI to receive
            easy-to-understand insights, whether you&apos;re a seasoned investor
            or just starting out.
          </li>
          <li className="list-disc">
            Personalized Advice: Tailored recommendations based on your
            portfolio and investment goals.
          </li>
        </ul>
      </div>

      <div id='how-it-works' className="my-32">
        <h2 className="text-5xl font-semibold mb-5 text-center">
          How It Works
        </h2>

        <ul className="text-xl md:text-2xl">
          <li className="list-decimal">
            Connect: Simply start a conversation with our chatbot and input the
            stocks you&apos;re interested in.
          </li>
          <li className="list-decimal">
            Analyze: Our AI analyzes the historical data and applies
            cutting-edge prediction models to forecast potential stock
            movements.
          </li>
          <li className="list-decimal">
            User-Friendly Interface: Chat with our intuitive AI to receive
            easy-to-understand insights, whether you&apos;re a seasoned investor
            or just starting out.
          </li>
          <li className="list-decimal">
            Predict: Receive real-time predictions and insights on stock
            performance, helping you make well-informed decisions.
          </li>
        </ul>
      </div>

      <div className="my-32">
        <h2 className="text-5xl font-semibold mb-5 text-center">
          Who Can Benefit?
        </h2>

        <ul className="text-xl md:text-2xl">
          <li className="list-disc">
            Individual Investors: Whether you&apos;re new to investing or
            looking to optimize your strategy, our chatbot offers insights to
            help grow your portfolio.
          </li>
          <li className="list-disc">
            Financial Advisors: Enhance your advisory services with AI-driven
            predictions to provide better guidance to your clients.
          </li>
          <li className="list-disc">
            Traders: Stay ahead of market trends and make timely trades with our
            accurate stock predictions.
          </li>
        </ul>
      </div>

      <div className="mt-32 text-center">
        <h2 className="text-5xl mb-10 font-semibold">Start Predicting Your Success Today</h2>
        <p className=" text-2xl md:text-5xl text-center leading-loose">
          Don’t let the market&apos;s unpredictability hold you back. Join
          countless others who trust our AI-powered chatbot to navigate the
          complexities of the stock market. Start chatting now and take control
          of your financial future.
        </p>
      </div>
    </main>
  );
}
