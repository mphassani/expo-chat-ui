# @cryterion/expo-chat-ui

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
import { Chat, ChatTheme } from '@cryterion/expo-chat-ui';

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

### Markdown Messages

```tsx
import { Chat } from '@cryterion/expo-chat-ui';

function ChatScreen() {
  return (
    <Chat
      messages={messages}
      onSend={handleSend}
      messageFormat="markdown"
    />
  );
}
```

By default, markdown rendering applies to `assistant` and `system` messages when `messageFormat="markdown"`.

```tsx
<Chat
  messages={messages}
  onSend={handleSend}
  messageFormat="markdown"
  markdownRoles={['assistant', 'user']}
/>
```

### Custom Message Content Rendering

```tsx
import { Chat, RenderMessageContentArgs } from '@cryterion/expo-chat-ui';
import { View } from 'react-native';

function ChatScreen() {
  return (
    <Chat
      messages={messages}
      onSend={handleSend}
      messageFormat="markdown"
      renderMessageContent={({ defaultContent, isUser }: RenderMessageContentArgs) => (
        <View style={{ opacity: isUser ? 0.95 : 1 }}>
          {defaultContent}
        </View>
      )}
    />
  );
}
```

### Using Individual Components

You can also use the individual building blocks:

```tsx
import { MessageList, ChatInput, MessageBubble } from '@cryterion/expo-chat-ui';

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
| `placeholder` | `string` | No | Input placeholder |
| `emptyStateTitle` | `string` | No | Empty state title |
| `emptyStateSubtitle` | `string` | No | Empty state subtitle |
| `keyboardVerticalOffset` | `number` | No | Keyboard offset for iOS `KeyboardAvoidingView` |
| `autoCorrect` | `boolean` | No | Toggle input autocorrect |
| `spellCheck` | `boolean` | No | Toggle input spellcheck |
| `keyboardType` | `KeyboardTypeOptions` | No | Input keyboard type |
| `messageFormat` | `'plain' \| 'markdown'` | No | Message rendering mode (defaults to `'plain'`) |
| `markdownRoles` | `('user' \| 'assistant' \| 'system')[]` | No | Roles rendered as markdown when `messageFormat='markdown'` (defaults to `['assistant','system']`) |
| `renderMessageContent` | `(args: RenderMessageContentArgs) => ReactNode` | No | Full custom message content renderer |

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

### `RenderMessageContentArgs` Type

```ts
interface RenderMessageContentArgs {
  message: ChatMessage;
  isUser: boolean;
  theme: ChatTheme;
  defaultContent: ReactNode;
  isMarkdown: boolean;
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

## Contributing

We welcome contributions! This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automated versioning and releases.

### Commit Message Format

All commits must follow the conventional commit format:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat:` - A new feature (triggers minor version bump)
- `fix:` - A bug fix (triggers patch version bump)
- `docs:` - Documentation changes only
- `style:` - Code style changes (formatting, missing semicolons, etc.)
- `refactor:` - Code changes that neither fix bugs nor add features
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks, dependency updates, etc.

**Breaking Changes:**
- Add `!` after the type/scope (e.g., `feat!:`) or
- Include `BREAKING CHANGE:` in the footer

This triggers a major version bump.

**Examples:**
```bash
feat: add message reactions
fix(input): disable autocorrect on iOS
feat(theme)!: replace color system with new tokens
docs: update installation instructions
chore: update dependencies
```

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes
4. Run type check: `bun run typecheck`
5. Commit using conventional commits: `git commit -m "feat: add my feature"`
6. Push to your fork: `git push origin feat/my-feature`
7. Open a Pull Request

## Release Process

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) for automated versioning and publishing on NPM.

**How it works:**
- When commits are pushed to `main`, semantic-release analyzes commit messages
- Based on conventional commits, it determines the next version number
- Automatically updates `package.json` and generates `CHANGELOG.md`
- Creates a GitHub release with release notes
- Publishes the package to npm

**Version Bumping:**
- `fix:` commits → Patch release (1.0.0 → 1.0.1)
- `feat:` commits → Minor release (1.0.0 → 1.1.0)
- `BREAKING CHANGE:` → Major release (1.0.0 → 2.0.0)

## License

MIT
