import OfferGenerator from "@/components/OfferGenerator";

export default function OffersPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 overflow-auto">
        <OfferGenerator />
      </div>
    </div>
  );
}
