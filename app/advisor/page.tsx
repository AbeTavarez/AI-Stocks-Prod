"use client";
import ServiceCard from "@/components/ui/service-card";
import { services } from "@/lib/services-data";

export default function Advisor() {
  return (
    <main className="h-full p-20 font-sans">
      <h1 className="text-3xl font-extrabold">AI Stock Advisor</h1>

      <p className="text-center my-32 font-bold text-3xl">
        Unlock the Future of Investing with AI
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 my-5">
        {services.map((service) => (
          <ServiceCard {...service} key={service.name} />
        ))}
      </div>
    </main>
  );
}
