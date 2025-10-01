import { Code, Terminal, FileText, Gamepad2, Radio, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type ModuleType = "terminal" | "ide" | "offers" | "snake" | "radio" | "settings";

interface ActivityBarProps {
  activeModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
}

const modules = [
  { id: "terminal" as ModuleType, icon: Terminal, label: "Терминал" },
  { id: "ide" as ModuleType, icon: Code, label: "IDE" },
  { id: "offers" as ModuleType, icon: FileText, label: "Офферы" },
  { id: "snake" as ModuleType, icon: Gamepad2, label: "Змейка" },
  { id: "radio" as ModuleType, icon: Radio, label: "Радио" },
];

export default function ActivityBar({ activeModule, onModuleChange }: ActivityBarProps) {
  return (
    <div className="w-12 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-2">
      <div className="flex-1 flex flex-col gap-1">
        {modules.map((module) => {
          const Icon = module.icon;
          const isActive = activeModule === module.id;

          return (
            <Tooltip key={module.id}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onModuleChange(module.id)}
                  className={cn(
                    "w-10 h-10 hover-elevate",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}
                  data-testid={`activity-${module.id}`}
                >
                  <Icon className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{module.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onModuleChange("settings")}
            className={cn(
              "w-10 h-10 hover-elevate",
              activeModule === "settings" && "bg-sidebar-accent text-sidebar-accent-foreground"
            )}
            data-testid="activity-settings"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Настройки</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
