import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ChatMessage, MessageListProps } from '../types';
import { MessageBubble } from './MessageBubble';

/**
 * Default empty state component
 */
function DefaultEmptyState({
  title,
  subtitle,
  iconColor,
  textColor,
  textMutedColor,
}: {
  title: string;
  subtitle: string;
  iconColor: string;
  textColor: string;
  textMutedColor: string;
}) {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="chatbubbles-outline" size={64} color={iconColor} />
      <Text style={[styles.emptyTitle, { color: textColor }]}>{title}</Text>
      <Text style={[styles.emptySubtitle, { color: textMutedColor }]}>
        {subtitle}
      </Text>
    </View>
  );
}

/**
 * Typing indicator component
 */
function TypingIndicator({ bubbleColor, dotColor }: { bubbleColor: string; dotColor: string }) {
  return (
    <View style={styles.loadingContainer}>
      <View style={[styles.typingIndicator, { backgroundColor: bubbleColor }]}>
        <View style={[styles.dot, styles.dot1, { backgroundColor: dotColor }]} />
        <View style={[styles.dot, styles.dot2, { backgroundColor: dotColor }]} />
        <View style={[styles.dot, styles.dot3, { backgroundColor: dotColor }]} />
      </View>
    </View>
  );
}

export function MessageList({
  messages,
  isLoading,
  theme,
  renderEmptyState,
  onCopyMessage,
  emptyStateTitle = 'Start a conversation',
  emptyStateSubtitle = 'Type a message below to get started',
}: MessageListProps) {
  const flatListRef = useRef<FlatList>(null);
  const { colors } = theme;

  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  const renderItem = ({ item }: { item: ChatMessage }) => (
    <MessageBubble message={item} theme={theme} onCopy={onCopyMessage} />
  );

  const renderEmptyStateComponent = () => {
    if (renderEmptyState) {
      if (typeof renderEmptyState === 'function') {
        return renderEmptyState();
      }
      return renderEmptyState;
    }

    return (
      <DefaultEmptyState
        title={emptyStateTitle}
        subtitle={emptyStateSubtitle}
        iconColor={colors.text}
        textColor={colors.text}
        textMutedColor={colors.textMuted}
      />
    );
  };

  const renderLoadingIndicator = () => {
    if (!isLoading) return null;
    return (
      <TypingIndicator
        bubbleColor={colors.loadingBubble}
        dotColor={colors.loadingDots}
      />
    );
  };

  // Using key to force remount when transitioning between empty/non-empty states
  // This fixes the scroll size not resetting when clearing messages
  const listKey = messages.length === 0 ? 'empty' : 'populated';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        key={listKey}
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          messages.length === 0 && styles.emptyListContent,
        ]}
        ListEmptyComponent={renderEmptyStateComponent}
        ListFooterComponent={renderLoadingIndicator}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 16,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'flex-start',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.6,
  },
  dot3: {
    opacity: 0.8,
  },
});
