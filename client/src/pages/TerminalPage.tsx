import AgentStatus from "@/components/AgentStatus";
import TerminalView from "@/components/TerminalView";
import ThemeToggle from "@/components/ThemeToggle";

export default function TerminalPage() {
  return (
    <div className="flex flex-col h-screen">
      <header className="border-b border-border bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Терминал рассуждений</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Двухагентная система принятия решений
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <AgentStatus type="main" state="thinking" />
        <div className="h-[calc(100vh-250px)]">
          <TerminalView />
        </div>
      </div>
    </div>
  );
}
