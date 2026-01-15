import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ChatInputProps } from '../types';

export function ChatInput({
  onSend,
  disabled,
  theme,
  placeholder = 'Type a message...',
}: ChatInputProps) {
  const [text, setText] = useState('');
  const { colors } = theme;

  const handleSend = () => {
    const trimmedText = text.trim();
    if (trimmedText && !disabled) {
      onSend(trimmedText);
      setText('');
    }
  };

  const canSend = text.trim().length > 0 && !disabled;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
          },
        ]}
      >
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: colors.inputBackground },
          ]}
        >
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder={placeholder}
            placeholderTextColor={colors.placeholder}
            value={text}
            onChangeText={setText}
            multiline
            maxLength={2000}
            editable={!disabled}
            onSubmitEditing={handleSend}
            blurOnSubmit={false}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor: canSend
                  ? colors.primary
                  : colors.sendButtonDisabled,
              },
            ]}
            onPress={handleSend}
            disabled={!canSend}
            activeOpacity={0.7}
          >
            <Ionicons name="send" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 8,
    paddingRight: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
