import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChatMessage, MessageBubbleProps } from '../types';

/**
 * Format timestamp to time string (e.g., "2:30 PM")
 */
function formatTime(timestamp: number | Date): string {
  const date = typeof timestamp === 'number' ? new Date(timestamp) : timestamp;
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Default copy to clipboard implementation
 */
async function defaultCopyToClipboard(message: ChatMessage): Promise<void> {
  await Clipboard.setStringAsync(message.content);
}

export function MessageBubble({ message, theme, onCopy }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const { colors } = theme;

  const backgroundColor = isUser ? colors.userBubble : colors.assistantBubble;
  const textColor = isUser ? colors.userText : colors.assistantText;
  const mutedColor = isUser ? colors.userBubbleMuted : colors.assistantBubbleMuted;

  const handleCopy = () => {
    if (onCopy) {
      onCopy(message);
    } else {
      defaultCopyToClipboard(message);
    }
  };

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.assistantContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          { backgroundColor },
          isUser ? styles.userBubble : styles.assistantBubble,
        ]}
      >
        <Text style={[styles.messageText, { color: textColor }]}>
          {message.content}
        </Text>
        <View style={styles.footer}>
          <Text style={[styles.timestamp, { color: mutedColor }]}>
            {formatTime(message.timestamp)}
          </Text>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={handleCopy}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="copy-outline" size={14} color={mutedColor} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  assistantContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
    gap: 8,
  },
  timestamp: {
    fontSize: 11,
  },
  copyButton: {
    padding: 2,
  },
});
