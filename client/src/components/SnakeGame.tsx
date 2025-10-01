import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("snakeHighScore");
    return saved ? parseInt(saved) : 0;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>("RIGHT");

  const gridSize = 20;
  const cellSize = 20;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      
      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };

        switch (direction) {
          case "UP":
            head.y -= 1;
            break;
          case "DOWN":
            head.y += 1;
            break;
          case "LEFT":
            head.x -= 1;
            break;
          case "RIGHT":
            head.x += 1;
            break;
        }

        if (
          head.x < 0 ||
          head.x >= gridSize ||
          head.y < 0 ||
          head.y >= gridSize ||
          prevSnake.some((segment) => segment.x === head.x && segment.y === head.y)
        ) {
          setIsPlaying(false);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        if (head.x === food.x && head.y === food.y) {
          setScore((prev) => {
            const newScore = prev + 10;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem("snakeHighScore", newScore.toString());
            }
            return newScore;
          });
          setFood({
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 150);

    return () => clearInterval(gameLoop);
  }, [direction, food, isPlaying, gridSize, highScore]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "hsl(var(--background))";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "hsl(var(--primary))";
    snake.forEach((segment) => {
      ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize - 1, cellSize - 1);
    });

    ctx.fillStyle = "hsl(var(--destructive))";
    ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize - 1, cellSize - 1);
  }, [snake, food, cellSize]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection("RIGHT");
    setScore(0);
    setIsPlaying(false);
  };

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-6">
      <div className="bg-card rounded-lg border border-card-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-card-foreground">Змейка</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              data-testid="button-playpause"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={resetGame} data-testid="button-reset">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={gridSize * cellSize}
            height={gridSize * cellSize}
            className="border border-border rounded-md"
          />
        </div>

        <p className="text-sm text-muted-foreground text-center mt-4">
          Используйте стрелки для управления
        </p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Статистика</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Текущий счёт</p>
            <p className="text-3xl font-bold text-primary" data-testid="text-score">
              {score}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Рекорд</p>
            <p className="text-2xl font-semibold text-chart-2" data-testid="text-highscore">
              {highScore}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
