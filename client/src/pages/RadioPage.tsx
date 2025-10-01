import RadioPlayer from "@/components/RadioPlayer";

export default function RadioPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 overflow-auto">
        <RadioPlayer />
      </div>
    </div>
  );
}
