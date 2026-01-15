import React from 'react';
import { StyleSheet, View } from 'react-native';
import { mergeTheme } from '../theme/defaultTheme';
import { ChatProps } from '../types';
import { ChatInput } from './ChatInput';
import { MessageList } from './MessageList';

/**
 * Main Chat component that combines MessageList and ChatInput
 *
 * @example
 * ```tsx
 * <Chat
 *   messages={messages}
 *   onSend={handleSend}
 *   isLoading={isLoading}
 *   theme={{ mode: 'dark' }}
 * />
 * ```
 */
export function Chat({
  messages,
  onSend,
  isLoading,
  disabled,
  theme: themeProp,
  renderEmptyState,
  onCopyMessage,
  placeholder,
  emptyStateTitle,
  emptyStateSubtitle,
}: ChatProps) {
  const theme = mergeTheme(themeProp);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <MessageList
        messages={messages}
        isLoading={isLoading}
        theme={theme}
        renderEmptyState={renderEmptyState}
        onCopyMessage={onCopyMessage}
        emptyStateTitle={emptyStateTitle}
        emptyStateSubtitle={emptyStateSubtitle}
      />
      <ChatInput
        onSend={onSend}
        disabled={disabled || isLoading}
        theme={theme}
        placeholder={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
