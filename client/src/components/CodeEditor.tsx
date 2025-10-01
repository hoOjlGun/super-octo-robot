import { useState } from "react";
import { Code2, Play, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CodeEditor() {
  const [code, setCode] = useState(`// Пример кода на JavaScript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`);

  const [output, setOutput] = useState("");

  const runCode = () => {
    console.log("Запуск кода...");
    setOutput("Результат: 55\n\nКод выполнен успешно!");
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-card-border">
      <div className="p-4 border-b border-card-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-card-foreground">Редактор кода</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" data-testid="button-format">
            <FileCode className="w-4 h-4 mr-2" />
            Форматировать
          </Button>
          <Button onClick={runCode} size="sm" data-testid="button-run">
            <Play className="w-4 h-4 mr-2" />
            Запустить
          </Button>
        </div>
      </div>

      <Tabs defaultValue="code" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-2">
          <TabsTrigger value="code">Код</TabsTrigger>
          <TabsTrigger value="output">Вывод</TabsTrigger>
        </TabsList>

        <TabsContent value="code" className="flex-1 p-4 m-0">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full font-mono text-sm resize-none"
            placeholder="Напишите код здесь..."
            data-testid="textarea-code"
          />
        </TabsContent>

        <TabsContent value="output" className="flex-1 p-4 m-0">
          <div className="w-full h-full bg-background rounded-md p-4 font-mono text-sm">
            {output || "Нажмите 'Запустить' для выполнения кода"}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
