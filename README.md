# 🤖 AI Система Нового Поколения

> Универсальная бесплатная AI-система с двухагентной архитектурой, работающая полностью в браузере без серверов. Интерфейс в стиле VSCode расширения с полной поддержкой русского языка для СНГ региона.

## 📋 Оглавление

- [Обзор проекта](#обзор-проекта)
- [Архитектура системы](#архитектура-системы)
- [Технологический стек](#технологический-стек)
- [План реализации WebLLM](#план-реализации-webllm)
- [Двухагентная архитектура](#двухагентная-архитектура)
- [Модули системы](#модули-системы)
- [Установка и запуск](#установка-и-запуск)
- [Дорожная карта](#дорожная-карта)
- [Примеры использования](#примеры-использования)

## 🎯 Обзор проекта

AI Система - это революционное решение, объединяющее:
- ✅ **Абсолютно бесплатное** использование (WebLLM в браузере)
- ✅ **Полная приватность** (все расчеты локально)
- ✅ **Двухагентная архитектура** (основной агент + агент-ревизор)
- ✅ **VSCode-подобный интерфейс** (знакомый и удобный)
- ✅ **Многофункциональность** (терминал, IDE, генератор офферов, игры, радио)
- ✅ **Русская локализация** (для СНГ региона)

### Ключевые особенности

1. **Браузерные AI модели** - никаких серверов, никаких API ключей
2. **Двухуровневая проверка** - главный агент генерирует, ревизор проверяет
3. **Универсальность** - от кода до развлечений в одном интерфейсе
4. **Приватность** - данные не покидают устройство пользователя

## 🏗️ Архитектура системы

### Общая структура

```
┌─────────────────────────────────────────────────────────┐
│                    VSCode UI Layer                      │
│  ┌──────────┐  ┌─────────────────────────────────────┐ │
│  │ Activity │  │         Main Workspace              │ │
│  │   Bar    │  │  ┌──────────────────────────────┐  │ │
│  │          │  │  │   Active Module (Terminal,   │  │ │
│  │ Terminal │  │  │   IDE, Offers, Snake, Radio) │  │ │
│  │   IDE    │  │  └──────────────────────────────┘  │ │
│  │  Offers  │  │                                     │ │
│  │  Snake   │  │                                     │ │
│  │  Radio   │  └─────────────────────────────────────┘ │
│  │ Settings │                                          │
│  └──────────┘                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Status Bar                         │   │
│  │  Main Agent: ● | Revisor: ● | WebLLM: Ready     │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Компонентная архитектура

```typescript
App
├── ActivityBar (боковая панель навигации)
├── Header (заголовок модуля)
├── MainWorkspace (рабочая область)
│   ├── TerminalPage (терминал рассуждений)
│   ├── IDEPage (редактор кода)
│   ├── OffersPage (генератор офферов)
│   ├── SnakePage (игра)
│   ├── RadioPage (радио)
│   └── SettingsPage (настройки)
└── StatusBar (статус агентов)
```

## 🛠️ Технологический стек

### Frontend
- **React 18** - UI библиотека
- **TypeScript** - типизация
- **Tailwind CSS** - стилизация
- **Shadcn/ui** - компоненты
- **Vite** - сборка

### AI & ML
- **WebLLM** - браузерные языковые модели
- **@mlc-ai/web-llm** - NPM пакет для WebLLM
- **Gemini CLI** (опционально) - агент-консультант

### Шрифты
- **Inter** - основной шрифт
- **JetBrains Mono** - моноширинный для кода

## 🚀 План реализации WebLLM

### Фаза 1: Интеграция WebLLM (2-3 дня)

#### Шаг 1: Установка зависимостей

```bash
npm install @mlc-ai/web-llm
```

#### Шаг 2: Создание WebLLM сервиса

```typescript
// client/src/services/webllm.ts
import * as webllm from "@mlc-ai/web-llm";

export class WebLLMService {
  private engine: webllm.MLCEngineInterface | null = null;
  private modelId = "Llama-3-8B-Instruct-q4f32_1-MLC";

  async initialize(
    onProgress?: (report: webllm.InitProgressReport) => void
  ) {
    this.engine = await webllm.CreateMLCEngine(this.modelId, {
      initProgressCallback: onProgress,
    });
  }

  async generate(
    prompt: string,
    onUpdate?: (text: string) => void
  ): Promise<string> {
    if (!this.engine) {
      throw new Error("Engine not initialized");
    }

    const messages: webllm.ChatCompletionMessageParam[] = [
      { role: "user", content: prompt },
    ];

    const reply = await this.engine.chat.completions.create({
      messages,
      stream: true,
    });

    let fullResponse = "";
    
    for await (const chunk of reply) {
      const delta = chunk.choices[0]?.delta?.content || "";
      fullResponse += delta;
      onUpdate?.(fullResponse);
    }

    return fullResponse;
  }

  async cleanup() {
    if (this.engine) {
      await this.engine.unload();
      this.engine = null;
    }
  }
}

export const webLLM = new WebLLMService();
```

#### Шаг 3: Интеграция в терминал

```typescript
// client/src/components/TerminalView.tsx
import { webLLM } from "@/services/webllm";

export default function TerminalView() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [initProgress, setInitProgress] = useState(0);

  useEffect(() => {
    webLLM.initialize((report) => {
      setInitProgress(report.progress * 100);
      if (report.progress === 1) {
        setIsInitialized(true);
      }
    });
  }, []);

  const handleSend = async () => {
    if (!isInitialized) return;

    const response = await webLLM.generate(
      input,
      (text) => {
        // Обновление UI в реальном времени
        setStreamingResponse(text);
      }
    );

    setMessages((prev) => [
      ...prev,
      { type: "agent", content: response },
    ]);
  };

  // ...
}
```

### Фаза 2: Двухагентная архитектура (3-4 дня)

#### Архитектура агентов

```typescript
// client/src/services/agents.ts
import { webLLM } from "./webllm";

export interface AgentMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export class MainAgent {
  private systemPrompt = `Ты главный coding агент. 
  Твоя задача - генерировать качественное решение для запроса пользователя.
  Отвечай на русском языке.`;

  async process(userInput: string): Promise<string> {
    const messages: AgentMessage[] = [
      { role: "system", content: this.systemPrompt },
      { role: "user", content: userInput },
    ];

    return await webLLM.generate(
      this.formatMessages(messages)
    );
  }

  private formatMessages(messages: AgentMessage[]): string {
    return messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n\n");
  }
}

export class RevisorAgent {
  private systemPrompt = `Ты агент-ревизор.
  Твоя задача - проверить решение главного агента на:
  1. Корректность логики
  2. Безопасность кода
  3. Соответствие best practices
  4. Полноту решения
  
  Если находишь проблемы - предлагай исправления.
  Отвечай на русском языке.`;

  async review(
    originalRequest: string,
    mainAgentResponse: string
  ): Promise<{
    approved: boolean;
    feedback: string;
    suggestions?: string[];
  }> {
    const prompt = `
Исходный запрос: ${originalRequest}

Решение главного агента: ${mainAgentResponse}

Проведи ревью и предоставь обратную связь.
    `;

    const response = await webLLM.generate(
      `${this.systemPrompt}\n\n${prompt}`
    );

    return this.parseReview(response);
  }

  private parseReview(response: string) {
    // Парсинг ответа ревизора
    const approved = response.toLowerCase().includes("одобрено");
    
    return {
      approved,
      feedback: response,
      suggestions: this.extractSuggestions(response),
    };
  }

  private extractSuggestions(text: string): string[] {
    // Извлечение предложений из текста
    const suggestions: string[] = [];
    const lines = text.split("\n");
    
    lines.forEach((line) => {
      if (
        line.includes("предлагаю") ||
        line.includes("рекомендую") ||
        line.match(/^\d+\./)
      ) {
        suggestions.push(line.trim());
      }
    });

    return suggestions;
  }
}
```

#### Координатор агентов

```typescript
// client/src/services/agentCoordinator.ts
import { MainAgent } from "./agents";
import { RevisorAgent } from "./agents";

export class AgentCoordinator {
  private mainAgent = new MainAgent();
  private revisorAgent = new RevisorAgent();

  async processRequest(
    userInput: string,
    onMainAgentStart?: () => void,
    onMainAgentComplete?: (response: string) => void,
    onRevisorStart?: () => void,
    onRevisorComplete?: (review: any) => void
  ): Promise<{
    finalResponse: string;
    reviewPassed: boolean;
    iterations: number;
  }> {
    let iterations = 0;
    let currentResponse = "";
    let reviewPassed = false;
    const maxIterations = 3;

    while (!reviewPassed && iterations < maxIterations) {
      iterations++;

      // Главный агент генерирует решение
      onMainAgentStart?.();
      currentResponse = await this.mainAgent.process(userInput);
      onMainAgentComplete?.(currentResponse);

      // Ревизор проверяет
      onRevisorStart?.();
      const review = await this.revisorAgent.review(
        userInput,
        currentResponse
      );
      onRevisorComplete?.(review);

      reviewPassed = review.approved;

      if (!reviewPassed && review.suggestions) {
        // Добавляем фидбек для следующей итерации
        userInput = `${userInput}\n\nУчти следующие замечания:\n${review.suggestions.join("\n")}`;
      }
    }

    return {
      finalResponse: currentResponse,
      reviewPassed,
      iterations,
    };
  }
}

export const coordinator = new AgentCoordinator();
```

### Фаза 3: Оптимизация производительности (1-2 дня)

#### Web Worker для WebLLM

```typescript
// client/src/workers/webllm.worker.ts
import * as webllm from "@mlc-ai/web-llm";

let engine: webllm.MLCEngineInterface | null = null;

self.addEventListener("message", async (e) => {
  const { type, payload } = e.data;

  switch (type) {
    case "initialize":
      try {
        engine = await webllm.CreateMLCEngine(
          payload.modelId,
          {
            initProgressCallback: (report) => {
              self.postMessage({
                type: "init-progress",
                payload: report,
              });
            },
          }
        );
        self.postMessage({ type: "initialized" });
      } catch (error) {
        self.postMessage({
          type: "error",
          payload: error.message,
        });
      }
      break;

    case "generate":
      if (!engine) {
        self.postMessage({
          type: "error",
          payload: "Engine not initialized",
        });
        return;
      }

      try {
        const reply = await engine.chat.completions.create({
          messages: payload.messages,
          stream: true,
        });

        for await (const chunk of reply) {
          const delta = chunk.choices[0]?.delta?.content || "";
          self.postMessage({
            type: "chunk",
            payload: delta,
          });
        }

        self.postMessage({ type: "complete" });
      } catch (error) {
        self.postMessage({
          type: "error",
          payload: error.message,
        });
      }
      break;
  }
});
```

#### Использование Worker

```typescript
// client/src/services/webllm.ts
export class WebLLMService {
  private worker: Worker | null = null;

  async initialize() {
    this.worker = new Worker(
      new URL("../workers/webllm.worker.ts", import.meta.url),
      { type: "module" }
    );

    return new Promise((resolve, reject) => {
      this.worker!.addEventListener("message", (e) => {
        if (e.data.type === "initialized") {
          resolve(true);
        } else if (e.data.type === "error") {
          reject(new Error(e.data.payload));
        }
      });

      this.worker!.postMessage({
        type: "initialize",
        payload: { modelId: this.modelId },
      });
    });
  }

  async generate(
    prompt: string,
    onChunk?: (text: string) => void
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let fullResponse = "";

      const handler = (e: MessageEvent) => {
        const { type, payload } = e.data;

        switch (type) {
          case "chunk":
            fullResponse += payload;
            onChunk?.(fullResponse);
            break;
          case "complete":
            this.worker!.removeEventListener("message", handler);
            resolve(fullResponse);
            break;
          case "error":
            this.worker!.removeEventListener("message", handler);
            reject(new Error(payload));
            break;
        }
      };

      this.worker!.addEventListener("message", handler);
      this.worker!.postMessage({
        type: "generate",
        payload: { messages: [{ role: "user", content: prompt }] },
      });
    });
  }
}
```

## 🤝 Двухагентная архитектура

### Принципы работы

1. **Главный агент (Main Agent)**
   - Генерирует решения на основе запросов
   - Пишет код, создает контент
   - Работает быстро и креативно

2. **Агент-ревизор (Revisor Agent)**
   - Проверяет решения главного агента
   - Ищет ошибки и уязвимости
   - Предлагает улучшения

3. **Итеративный процесс**
   - Главный → Ревизор → (если не прошло) → Главный (с учетом замечаний)
   - Максимум 3 итерации
   - Гарантия качества результата

### Пример работы

```
Пользователь: "Создай функцию сортировки массива"

┌─────────────────────────────────┐
│ Главный агент: Генерирует код   │
│ function sort(arr) {            │
│   return arr.sort()             │
│ }                               │
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ Ревизор: Проверяет                      │
│ ❌ Проблема: мутирует исходный массив   │
│ ❌ Проблема: не работает с числами      │
│ Предлагаю: [...arr].sort((a,b) => a-b) │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│ Главный агент: Исправляет       │
│ function sort(arr) {            │
│   return [...arr].sort((a,b) => │
│     a - b                       │
│   )                             │
│ }                               │
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│ Ревизор: ✅ Одобрено             │
└─────────────────────────────────┘
```

## 📦 Модули системы

### 1. Терминал рассуждений
- Интерактивный чат с AI
- Визуализация процесса мышления
- История диалогов
- Статусы агентов в реальном времени

### 2. IDE (Редактор кода)
- Подсветка синтаксиса
- Запуск кода (песочница)
- AI ассистент для кода
- Форматирование

### 3. Генератор офферов
- Создание продающих текстов
- Выбор тональности
- Копирование результата
- Регенерация вариантов

### 4. Игра "Змейка"
- Классическая механика
- Сохранение рекорда
- Управление стрелками
- Статистика игр

### 5. Украинское радио
- Онлайн станции
- Управление громкостью
- Информация о треке
- Избранные станции

### 6. Настройки
- Конфигурация агентов
- Выбор модели WebLLM
- Настройки интерфейса
- Управление данными

## 💻 Установка и запуск

### Требования
- Node.js 18+
- npm или yarn
- Современный браузер (Chrome 90+, Firefox 88+)
- 4+ GB RAM (для WebLLM)

### Быстрый старт

```bash
# Клонирование репозитория
git clone <repository-url>
cd ai-system

# Установка зависимостей
npm install

# Установка WebLLM (на следующем этапе)
npm install @mlc-ai/web-llm

# Запуск в dev режиме
npm run dev

# Сборка для продакшена
npm run build
```

### Структура проекта

```
ai-system/
├── client/
│   ├── src/
│   │   ├── components/       # Компоненты UI
│   │   │   ├── ActivityBar.tsx
│   │   │   ├── StatusBar.tsx
│   │   │   ├── TerminalView.tsx
│   │   │   └── ...
│   │   ├── pages/           # Модули-страницы
│   │   │   ├── TerminalPage.tsx
│   │   │   ├── IDEPage.tsx
│   │   │   └── ...
│   │   ├── services/        # Бизнес-логика
│   │   │   ├── webllm.ts
│   │   │   ├── agents.ts
│   │   │   └── agentCoordinator.ts
│   │   ├── workers/         # Web Workers
│   │   │   └── webllm.worker.ts
│   │   └── App.tsx          # Главный компонент
│   └── index.html
├── server/                  # Express сервер
├── shared/                  # Общие типы
└── package.json
```

## 🗺️ Дорожная карта

### ✅ Фаза 1: Прототип (Завершено)
- [x] VSCode-подобный интерфейс
- [x] Модули (Терминал, IDE, Офферы, Змейка, Радио)
- [x] Система навигации
- [x] Темная тема
- [x] Русская локализация

### 🔄 Фаза 2: WebLLM интеграция (В процессе)
- [ ] Установка @mlc-ai/web-llm
- [ ] Базовый WebLLM сервис
- [ ] Интеграция в терминал
- [ ] Streaming ответов
- [ ] Web Worker оптимизация

### 📋 Фаза 3: Двухагентная система
- [ ] Главный агент
- [ ] Агент-ревизор  
- [ ] Координатор агентов
- [ ] Итеративный процесс
- [ ] Визуализация работы агентов

### 🚀 Фаза 4: Расширенные возможности
- [ ] Выбор моделей (Llama, Phi, Mistral)
- [ ] Gemini CLI интеграция
- [ ] Голосовой ввод/вывод
- [ ] Экспорт/импорт сессий
- [ ] Плагины и расширения

### 🎨 Фаза 5: UX улучшения
- [ ] Drag & Drop файлов
- [ ] Сплит-панели
- [ ] Горячие клавиши
- [ ] Темы оформления
- [ ] Анимации и переходы

## 📚 Примеры использования

### Пример 1: Простой запрос в терминал

```typescript
// Пользователь вводит
"Создай функцию для валидации email"

// Главный агент генерирует
function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Ревизор проверяет и улучшает
✅ Одобрено с замечанием:
- Добавить проверку на длину
- Учесть internationalized emails
- Добавить JSDoc комментарий

// Финальное решение
/**
 * Validates email address format
 * @param email - Email string to validate
 * @returns true if valid, false otherwise
 */
function validateEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

### Пример 2: Генерация оффера

```typescript
// Настройки
Ниша: "Фитнес тренер"
Тональность: "Профессиональная"

// Результат
🎯 Профессиональное предложение для Фитнес тренер

Уважаемый клиент,

Предлагаем вам персональную программу тренировок, 
разработанную с учетом ваших целей и возможностей.

✓ Индивидуальный подход
✓ Онлайн и офлайн формат
✓ Гарантия результата за 3 месяца

Начните путь к идеальной форме уже сегодня!
```

### Пример 3: Работа в IDE

```typescript
// Пользователь пишет код
const data = [1, 2, 3, 4, 5];

// AI предлагает
// 💡 Предложение: добавить обработку ошибок
try {
  const data = [1, 2, 3, 4, 5];
  const sum = data.reduce((a, b) => a + b, 0);
  console.log(`Сумма: ${sum}`);
} catch (error) {
  console.error('Ошибка вычисления:', error);
}
```

## 🔗 Полезные ссылки

### WebLLM
- [Официальная документация](https://webllm.mlc.ai/)
- [GitHub репозиторий](https://github.com/mlc-ai/web-llm)
- [Примеры использования](https://github.com/mlc-ai/web-llm/tree/main/examples)
- [Доступные модели](https://webllm.mlc.ai/#chat-demo)

### Gemini
- [Google AI Studio](https://makersuite.google.com/)
- [Gemini API документация](https://ai.google.dev/docs)
- [Gemini CLI](https://www.npmjs.com/package/@google/generative-ai)

### React & TypeScript
- [React документация](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite руководство](https://vitejs.dev/guide/)

### Дизайн система
- [Shadcn/ui компоненты](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide иконки](https://lucide.dev/)

### Инструменты разработки
- [VSCode](https://code.visualstudio.com/)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

## 🤝 Вклад в проект

Мы приветствуем вклад сообщества! Вот как вы можете помочь:

1. 🐛 **Сообщайте о багах** - создайте issue с подробным описанием
2. 💡 **Предлагайте фичи** - опишите желаемую функциональность
3. 🔧 **Присылайте PR** - следуйте code style проекта
4. 📖 **Улучшайте документацию** - помогите другим разобраться
5. 🌍 **Переводите интерфейс** - добавьте новые языки

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE) файл для деталей

## 👨‍💻 Авторы

- **Команда разработки** - [Ваше имя/организация]
- **Сообщество** - спасибо всем контрибьюторам!

## 🙏 Благодарности

- MLC AI Team за WebLLM
- Google за Gemini
- Vercel за Shadcn/ui
- Сообщество React и TypeScript

---

**Создано с ❤️ для СНГ региона | 2024**

*Бесплатно. Приватно. Мощно.*
