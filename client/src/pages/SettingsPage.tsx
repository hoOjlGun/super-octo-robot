import { Settings, Brain, Palette } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ThemeToggle from "@/components/ThemeToggle";

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-screen">
      <header className="border-b border-border bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Настройки</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Конфигурация системы и агентов
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 text-primary" />
              <h2 className="font-semibold">Внешний вид</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="theme">Темная тема</Label>
                  <p className="text-sm text-muted-foreground">
                    Использовать темную цветовую схему
                  </p>
                </div>
                <Switch id="theme" defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-5 h-5 text-primary" />
              <h2 className="font-semibold">Агенты</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="main-agent">Главный агент</Label>
                  <p className="text-sm text-muted-foreground">
                    Активировать основного агента
                  </p>
                </div>
                <Switch id="main-agent" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="revisor">Агент-ревизор</Label>
                  <p className="text-sm text-muted-foreground">
                    Активировать агента проверки
                  </p>
                </div>
                <Switch id="revisor" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-correct">Автокоррекция</Label>
                  <p className="text-sm text-muted-foreground">
                    Автоматическое исправление ошибок
                  </p>
                </div>
                <Switch id="auto-correct" defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="font-semibold">Общие</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="offline">Офлайн режим</Label>
                  <p className="text-sm text-muted-foreground">
                    Работа без интернета (WebLLM)
                  </p>
                </div>
                <Switch id="offline" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics">Аналитика</Label>
                  <p className="text-sm text-muted-foreground">
                    Сбор анонимной статистики использования
                  </p>
                </div>
                <Switch id="analytics" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
