// Types
export type {
  ChatMessage,
  ChatMessageRole,
  ChatTheme,
  ChatThemeColors,
  MessageFormat,
  RenderMessageContentArgs,
  ChatProps,
  MessageBubbleProps,
  MessageListProps,
  ChatInputProps,
} from './types';

// Components
export { Chat } from './components/Chat';
export { ChatInput } from './components/ChatInput';
export { MessageBubble } from './components/MessageBubble';
export { MessageList } from './components/MessageList';

// Theme utilities
export {
  lightTheme,
  darkTheme,
  lightColors,
  darkColors,
  getDefaultTheme,
  mergeTheme,
} from './theme/defaultTheme';
