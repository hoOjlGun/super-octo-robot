import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from "@/components/Sidebar";
import TerminalPage from "@/pages/TerminalPage";
import IDEPage from "@/pages/IDEPage";
import OffersPage from "@/pages/OffersPage";
import SnakePage from "@/pages/SnakePage";
import RadioPage from "@/pages/RadioPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={TerminalPage} />
      <Route path="/ide" component={IDEPage} />
      <Route path="/offers" component={OffersPage} />
      <Route path="/snake" component={SnakePage} />
      <Route path="/radio" component={RadioPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex h-screen bg-background">
          <Sidebar />
          <main className="flex-1 overflow-hidden">
            <Router />
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
