import { useState } from "react";
import { Radio, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Station {
  id: string;
  name: string;
  url: string;
  genre: string;
}

const stations: Station[] = [
  { id: "1", name: "Радіо ROKS", url: "#", genre: "Рок" },
  { id: "2", name: "Хіт FM", url: "#", genre: "Поп" },
  { id: "3", name: "Наше Радіо", url: "#", genre: "Українська музика" },
  { id: "4", name: "Kiss FM", url: "#", genre: "Dance" },
  { id: "5", name: "Радіо Aristocrats", url: "#", genre: "Джаз" },
];

export default function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [volume, setVolume] = useState([70]);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = (station: Station) => {
    if (currentStation?.id === station.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentStation(station);
      setIsPlaying(true);
    }
    console.log(`Playing: ${station.name}`);
  };

  return (
    <div className="grid lg:grid-cols-[1fr_350px] gap-6">
      <div className="bg-card rounded-lg border border-card-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Radio className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-card-foreground">Українське радіо</h2>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="space-y-2">
            {stations.map((station) => (
              <div
                key={station.id}
                className={`p-4 rounded-lg border hover-elevate cursor-pointer transition-colors ${
                  currentStation?.id === station.id
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
                onClick={() => togglePlay(station)}
                data-testid={`station-${station.id}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{station.name}</h3>
                    <p className="text-sm text-muted-foreground">{station.genre}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay(station);
                    }}
                  >
                    {currentStation?.id === station.id && isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Сейчас играет</h3>
        
        {currentStation ? (
          <div className="space-y-6">
            <div>
              <p className="text-lg font-medium">{currentStation.name}</p>
              <p className="text-sm text-muted-foreground">{currentStation.genre}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Громкость</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                  data-testid="button-mute"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
              </div>
              <Slider
                value={isMuted ? [0] : volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="w-full"
                data-testid="slider-volume"
              />
            </div>

            <div className="flex items-center justify-center p-8 bg-primary/10 rounded-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Radio className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {isPlaying ? "Воспроизведение..." : "Пауза"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            <Radio className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Выберите станцию для воспроизведения</p>
          </div>
        )}
      </Card>
    </div>
  );
}
