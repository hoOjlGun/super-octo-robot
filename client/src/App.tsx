import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ActivityBar, { type ModuleType } from "@/components/ActivityBar";
import StatusBar from "@/components/StatusBar";
import TerminalPage from "@/pages/TerminalPage";
import IDEPage from "@/pages/IDEPage";
import OffersPage from "@/pages/OffersPage";
import SnakePage from "@/pages/SnakePage";
import RadioPage from "@/pages/RadioPage";
import SettingsPage from "@/pages/SettingsPage";

const moduleConfig = {
  terminal: { title: "Терминал рассуждений", subtitle: "Двухагентная система принятия решений" },
  ide: { title: "IDE", subtitle: "Редактор кода с поддержкой AI" },
  offers: { title: "Генератор офферов", subtitle: "AI-генерация продающих предложений" },
  snake: { title: "Змейка", subtitle: "Классическая игра для отдыха" },
  radio: { title: "Украинское радио", subtitle: "Онлайн-радиостанции СНГ" },
  settings: { title: "Настройки", subtitle: "Конфигурация системы и агентов" },
};

function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>(() => {
    const saved = localStorage.getItem("activeModule") as ModuleType | null;
    return saved || "terminal";
  });
  const [mainAgentState, setMainAgentState] = useState<"idle" | "thinking" | "completed">("thinking");
  const [revisorAgentState, setRevisorAgentState] = useState<"idle" | "thinking" | "completed">("idle");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("activeModule", activeModule);
  }, [activeModule]);

  const renderModule = () => {
    switch (activeModule) {
      case "terminal":
        return <TerminalPage />;
      case "ide":
        return <IDEPage />;
      case "offers":
        return <OffersPage />;
      case "snake":
        return <SnakePage />;
      case "radio":
        return <RadioPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <TerminalPage />;
    }
  };

  const currentConfig = moduleConfig[activeModule];

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex h-screen bg-background">
          <ActivityBar activeModule={activeModule} onModuleChange={setActiveModule} />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="border-b border-border bg-background px-6 py-3 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold" data-testid="module-title">
                  {currentConfig.title}
                </h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {currentConfig.subtitle}
                </p>
              </div>
            </header>

            <main className="flex-1 overflow-hidden">
              {renderModule()}
            </main>

            <StatusBar 
              mainAgentState={mainAgentState} 
              revisorAgentState={revisorAgentState} 
            />
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
