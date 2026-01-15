// Types
export type {
  ChatMessage,
  ChatTheme,
  ChatThemeColors,
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
