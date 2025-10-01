import { Brain, CheckCircle2, Loader2 } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

type AgentState = "idle" | "thinking" | "completed";

interface StatusBarProps {
  mainAgentState?: AgentState;
  revisorAgentState?: AgentState;
}

export default function StatusBar({ 
  mainAgentState = "idle", 
  revisorAgentState = "idle" 
}: StatusBarProps) {
  const getAgentIcon = (state: AgentState) => {
    switch (state) {
      case "thinking":
        return <Loader2 className="w-3 h-3 animate-spin" />;
      case "completed":
        return <CheckCircle2 className="w-3 h-3 text-chart-2" />;
      default:
        return <Brain className="w-3 h-3" />;
    }
  };

  const getStateText = (state: AgentState) => {
    switch (state) {
      case "thinking":
        return "Размышляет";
      case "completed":
        return "Завершено";
      default:
        return "Готов";
    }
  };

  return (
    <div className="h-6 bg-sidebar border-t border-sidebar-border flex items-center justify-between px-3 text-xs">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2" data-testid="status-main-agent">
          {getAgentIcon(mainAgentState)}
          <span className="text-sidebar-foreground">
            Главный: {getStateText(mainAgentState)}
          </span>
        </div>
        <div className="flex items-center gap-2" data-testid="status-revisor-agent">
          {getAgentIcon(revisorAgentState)}
          <span className="text-sidebar-foreground">
            Ревизор: {getStateText(revisorAgentState)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-muted-foreground">WebLLM: Готов</span>
        <ThemeToggle />
      </div>
    </div>
  );
}
