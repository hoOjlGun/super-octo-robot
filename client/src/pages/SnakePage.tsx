import SnakeGame from "@/components/SnakeGame";

export default function SnakePage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 overflow-auto">
        <SnakeGame />
      </div>
    </div>
  );
}
