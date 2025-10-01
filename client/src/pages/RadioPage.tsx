import RadioPlayer from "@/components/RadioPlayer";
import ThemeToggle from "@/components/ThemeToggle";

export default function RadioPage() {
  return (
    <div className="flex flex-col h-screen">
      <header className="border-b border-border bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Украинское радио</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Онлайн-радиостанции СНГ
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-1 p-6 overflow-auto">
        <RadioPlayer />
      </div>
    </div>
  );
}
