import Link from "next/link";

type ServiceCardProps = {
  service: string;
  description: string;
  pathName: string;
};

export default function ServiceCard({
  service,
  description,
  pathName,
}: ServiceCardProps) {
  return (
    <Link
      href={pathName}
      className="hover:scale-105 transition ease-in-out"
    >
      <div className="flex flex-col justify-around text-center h-72 border-4 bg-slate-800 rounded-lg p-5 border-green-200">
        <div className="text-xl font-bold">{service}</div>
        <p className="text-lg">{description}</p>
      </div>
    </Link>
  );
}
