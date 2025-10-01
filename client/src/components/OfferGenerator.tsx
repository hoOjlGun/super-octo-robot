import { useState } from "react";
import { Sparkles, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function OfferGenerator() {
  const [niche, setNiche] = useState("");
  const [tone, setTone] = useState("professional");
  const [offer, setOffer] = useState("");
  const { toast } = useToast();

  const generateOffer = () => {
    const offers = {
      professional: `🎯 Профессиональное предложение для ${niche || "вашей ниши"}

Уважаемый клиент,

Предлагаем вам эксклюзивное решение, разработанное специально для ${niche || "вашего бизнеса"}. Наш опыт и экспертиза гарантируют результат.

✓ Индивидуальный подход
✓ Гарантия качества
✓ Поддержка 24/7

Свяжитесь с нами сегодня для получения персонального предложения!`,
      casual: `👋 Привет!

Хочешь крутое решение для ${niche || "твоего проекта"}? Мы знаем, как сделать это просто и эффективно!

💪 Быстро, качественно, без лишних слов
🚀 Начни уже сегодня
😎 Результат гарантирован

Жми сюда и получи свой оффер!`,
      aggressive: `🔥 СРОЧНОЕ ПРЕДЛОЖЕНИЕ! ${niche || "ТОЛЬКО СЕЙЧАС!"}

⚡ УСПЕЙ ВОСПОЛЬЗОВАТЬСЯ! ⚡

Не упусти шанс получить МАКСИМАЛЬНЫЙ результат для ${niche || "твоего бизнеса"}!

✅ ОГРАНИЧЕННОЕ ВРЕМЯ
✅ ЭКСКЛЮЗИВНЫЕ УСЛОВИЯ
✅ ГАРАНТИЯ 100%

ДЕЙСТВУЙ СЕЙЧАС! ⏰`,
    };

    setOffer(offers[tone as keyof typeof offers]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(offer);
    toast({
      title: "Скопировано!",
      description: "Оффер скопирован в буфер обмена",
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 h-full">
      <div className="bg-card rounded-lg border border-card-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-card-foreground">Настройки оффера</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="niche">Ниша / Тематика</Label>
            <Input
              id="niche"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="Например: интернет-магазин"
              data-testid="input-niche"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Тональность</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger id="tone" data-testid="select-tone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Профессиональная</SelectItem>
                <SelectItem value="casual">Неформальная</SelectItem>
                <SelectItem value="aggressive">Агрессивная</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={generateOffer}
            className="w-full"
            data-testid="button-generate"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Сгенерировать оффер
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-card-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-card-foreground">Результат</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              disabled={!offer}
              data-testid="button-copy"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={generateOffer}
              disabled={!offer}
              data-testid="button-regenerate"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Textarea
          value={offer}
          readOnly
          className="min-h-[300px] font-sans"
          placeholder="Сгенерированный оффер появится здесь..."
          data-testid="textarea-offer"
        />
      </div>
    </div>
  );
}
