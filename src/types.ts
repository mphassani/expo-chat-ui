import { ReactNode } from 'react';
import { KeyboardTypeOptions } from 'react-native';

/**
 * Represents a single chat message
 */
export interface ChatMessage {
  /** Unique identifier for the message */
  id: string;
  /** Role of the message sender */
  role: 'user' | 'assistant' | 'system';
  /** Text content of the message */
  content: string;
  /** Timestamp of when the message was sent (ms since epoch or Date) */
  timestamp: number | Date;
  /** Optional metadata for extending message data */
  meta?: Record<string, unknown>;
}

/**
 * Theme colors for the chat UI
 */
export interface ChatThemeColors {
  /** Primary/accent color (used for send button, etc.) */
  primary: string;
  /** Main background color */
  background: string;
  /** Input field background */
  inputBackground: string;
  /** User message bubble background */
  userBubble: string;
  /** Assistant message bubble background */
  assistantBubble: string;
  /** Text color inside user bubbles */
  userText: string;
  /** Text color inside assistant bubbles */
  assistantText: string;
  /** Primary text color */
  text: string;
  /** Muted/secondary text color */
  textMuted: string;
  /** Placeholder text color */
  placeholder: string;
  /** Border color */
  border: string;
  /** Disabled send button color */
  sendButtonDisabled: string;
  /** Muted color for icons/timestamps in user bubbles */
  userBubbleMuted: string;
  /** Muted color for icons/timestamps in assistant bubbles */
  assistantBubbleMuted: string;
  /** Loading indicator bubble background */
  loadingBubble: string;
  /** Loading indicator dots color */
  loadingDots: string;
}

/**
 * Complete theme configuration
 */
export interface ChatTheme {
  /** Color mode */
  mode: 'light' | 'dark';
  /** Theme colors */
  colors: ChatThemeColors;
}

/**
 * Props for the main Chat component
 */
export interface ChatProps {
  /** Array of messages to display */
  messages: ChatMessage[];
  /** Callback when user sends a message */
  onSend: (text: string) => void | Promise<void>;
  /** Shows typing indicator when true */
  isLoading?: boolean;
  /** Disables input when true */
  disabled?: boolean;
  /** Custom theme (merged with defaults based on mode) */
  theme?: Partial<ChatTheme> & { colors?: Partial<ChatThemeColors> };
  /** Custom empty state renderer */
  renderEmptyState?: ReactNode | (() => ReactNode);
  /** Custom copy message handler (defaults to expo-clipboard) */
  onCopyMessage?: (message: ChatMessage) => void;
  /** Input placeholder text */
  placeholder?: string;
  /** Empty state title */
  emptyStateTitle?: string;
  /** Empty state subtitle */
  emptyStateSubtitle?: string;
  /** Keyboard vertical offset for KeyboardAvoidingView (defaults to 0) */
  keyboardVerticalOffset?: number;
  /** Enable/disable autocorrect (defaults to true) */
  autoCorrect?: boolean;
  /** Enable/disable spell check (defaults to true) */
  spellCheck?: boolean;
  /** Keyboard type (defaults to 'default') */
  keyboardType?: KeyboardTypeOptions;
}

/**
 * Props for MessageBubble component
 */
export interface MessageBubbleProps {
  /** The message to display */
  message: ChatMessage;
  /** Theme colors */
  theme: ChatTheme;
  /** Custom copy handler */
  onCopy?: (message: ChatMessage) => void;
}

/**
 * Props for MessageList component
 */
export interface MessageListProps {
  /** Array of messages to display */
  messages: ChatMessage[];
  /** Shows typing indicator when true */
  isLoading?: boolean;
  /** Theme configuration */
  theme: ChatTheme;
  /** Custom empty state renderer */
  renderEmptyState?: ReactNode | (() => ReactNode);
  /** Custom copy handler */
  onCopyMessage?: (message: ChatMessage) => void;
  /** Empty state title */
  emptyStateTitle?: string;
  /** Empty state subtitle */
  emptyStateSubtitle?: string;
}

/**
 * Props for ChatInput component
 */
export interface ChatInputProps {
  /** Callback when user sends a message */
  onSend: (text: string) => void | Promise<void>;
  /** Disables input when true */
  disabled?: boolean;
  /** Theme configuration */
  theme: ChatTheme;
  /** Placeholder text */
  placeholder?: string;
  /** Enable/disable autocorrect (defaults to true) */
  autoCorrect?: boolean;
  /** Enable/disable spell check (defaults to true) */
  spellCheck?: boolean;
  /** Keyboard type (defaults to 'default') */
  keyboardType?: KeyboardTypeOptions;
}
