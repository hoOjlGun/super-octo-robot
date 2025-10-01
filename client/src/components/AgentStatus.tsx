import { useState } from "react";
import { Brain, CheckCircle2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type AgentType = "main" | "revisor";
type AgentState = "idle" | "thinking" | "completed";

interface AgentStatusProps {
  type: AgentType;
  state?: AgentState;
}

export default function AgentStatus({ type, state = "idle" }: AgentStatusProps) {
  const [agentType, setAgentType] = useState<AgentType>(type);

  const isMain = agentType === "main";
  const label = isMain ? "Главный агент" : "Агент-ревизор";

  return (
    <div className="bg-card border border-card-border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isMain ? 'bg-primary/10' : 'bg-accent/50'}`}>
            <Brain className={`w-5 h-5 ${isMain ? 'text-primary' : 'text-accent-foreground'}`} />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{label}</h3>
            <div className="flex items-center gap-2 mt-1">
              {state === "idle" && (
                <Badge variant="secondary" className="text-xs">
                  Ожидание
                </Badge>
              )}
              {state === "thinking" && (
                <Badge variant="default" className="text-xs flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Размышляет
                </Badge>
              )}
              {state === "completed" && (
                <Badge variant="default" className="text-xs flex items-center gap-1 bg-chart-2">
                  <CheckCircle2 className="w-3 h-3" />
                  Завершено
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAgentType(isMain ? "revisor" : "main")}
          data-testid="toggle-agent"
        >
          Переключить
        </Button>
      </div>
    </div>
  );
}
