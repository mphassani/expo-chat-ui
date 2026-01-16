# @tovia/chat-ui

A reusable chat UI component for Expo + React Native applications.

## Installation

```bash
bun add @cryterion/expo-chat-ui
```

## Usage

### Basic Usage

```tsx
import { Chat, ChatMessage } from '@cryterion/expo-chat-ui';

function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Your AI/backend logic here...
  };

  return (
    <Chat
      messages={messages}
      onSend={handleSend}
      isLoading={isLoading}
    />
  );
}
```

### With Custom Theme

```tsx
import { Chat, ChatTheme } from '@tovia/chat-ui';

const customTheme: Partial<ChatTheme> = {
  colors: {
    primary: '#007AFF',
    userBubble: '#007AFF',
    assistantBubble: '#E5E5EA',
    userText: '#FFFFFF',
    assistantText: '#000000',
  },
};

function ChatScreen() {
  return (
    <Chat
      messages={messages}
      onSend={handleSend}
      theme={customTheme}
    />
  );
}
```

### Using Individual Components

You can also use the individual building blocks:

```tsx
import { MessageList, ChatInput, MessageBubble } from '@tovia/chat-ui';

function CustomChat() {
  return (
    <View style={{ flex: 1 }}>
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput onSend={handleSend} />
    </View>
  );
}
```

## API

### `<Chat />` Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `messages` | `ChatMessage[]` | Yes | Array of messages to display |
| `onSend` | `(text: string) => void \| Promise<void>` | Yes | Callback when user sends a message |
| `isLoading` | `boolean` | No | Shows typing indicator when true |
| `disabled` | `boolean` | No | Disables input when true |
| `theme` | `Partial<ChatTheme>` | No | Custom theme colors |
| `renderEmptyState` | `ReactNode \| () => ReactNode` | No | Custom empty state |
| `onCopyMessage` | `(message: ChatMessage) => void` | No | Custom copy handler |

### `ChatMessage` Type

```ts
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number | Date;
  meta?: Record<string, unknown>;
}
```

### `ChatTheme` Type

```ts
interface ChatTheme {
  mode: 'light' | 'dark';
  colors: {
    primary: string;
    background: string;
    inputBackground: string;
    userBubble: string;
    assistantBubble: string;
    userText: string;
    assistantText: string;
    text: string;
    textMuted: string;
    placeholder: string;
    border: string;
    sendButtonDisabled: string;
  };
}
```

## License

MIT
