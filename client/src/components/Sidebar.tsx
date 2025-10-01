import { Link, useLocation } from "wouter";
import { Code, Terminal, FileText, Gamepad2, Radio, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Terminal, label: "Терминал", path: "/" },
  { icon: Code, label: "IDE", path: "/ide" },
  { icon: FileText, label: "Офферы", path: "/offers" },
  { icon: Gamepad2, label: "Змейка", path: "/snake" },
  { icon: Radio, label: "Радио", path: "/radio" },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">AI Система</h1>
        <p className="text-sm text-muted-foreground mt-1">Двухагентная архитектура</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link key={item.path} href={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 hover-elevate",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Link href="/settings">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 hover-elevate"
            data-testid="nav-settings"
          >
            <Settings className="w-5 h-5" />
            <span>Настройки</span>
          </Button>
        </Link>
      </div>
    </aside>
  );
}
