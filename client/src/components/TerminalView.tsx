import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  type: "user" | "agent" | "system";
  content: string;
  timestamp: Date;
}

export default function TerminalView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "system",
      content: "Система инициализирована. Двухагентная архитектура активна.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: "Анализирую запрос... Главный агент: генерирую решение. Ревизор: проверяю логику.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMessage]);
    }, 500);

    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-card-border">
      <div className="p-4 border-b border-card-border flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="font-semibold text-card-foreground">Терминал рассуждений</h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.type === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : msg.type === "system"
                    ? "bg-muted text-muted-foreground text-sm"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <p className="font-mono text-sm">{msg.content}</p>
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                {msg.timestamp.toLocaleTimeString("ru-RU")}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-card-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Введите запрос для агента..."
            className="flex-1"
            data-testid="input-terminal"
          />
          <Button onClick={handleSend} data-testid="button-send">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
