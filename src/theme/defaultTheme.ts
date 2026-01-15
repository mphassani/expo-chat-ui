import { ChatTheme, ChatThemeColors } from '../types';

/**
 * Default light theme colors
 * Based on the original Tovia app theme
 */
export const lightColors: ChatThemeColors = {
  primary: '#FF8360',
  background: '#EFF1ED',
  inputBackground: '#FFFFFF',
  userBubble: '#FF8360',
  assistantBubble: '#E8E4D3',
  userText: '#FFFFFF',
  assistantText: '#2A2B2A',
  text: '#2A2B2A',
  textMuted: 'rgba(0, 0, 0, 0.5)',
  placeholder: '#999999',
  border: 'rgba(0, 0, 0, 0.1)',
  sendButtonDisabled: '#CCCCCC',
  userBubbleMuted: 'rgba(255, 255, 255, 0.7)',
  assistantBubbleMuted: 'rgba(0, 0, 0, 0.4)',
  loadingBubble: '#E8E4D3',
  loadingDots: '#888888',
};

/**
 * Default dark theme colors
 */
export const darkColors: ChatThemeColors = {
  primary: '#FF8360',
  background: '#2A2B2A',
  inputBackground: '#3A3B3A',
  userBubble: '#FF8360',
  assistantBubble: '#3A3B3A',
  userText: '#FFFFFF',
  assistantText: '#F8F4E3',
  text: '#F8F4E3',
  textMuted: 'rgba(255, 255, 255, 0.5)',
  placeholder: '#666666',
  border: 'rgba(255, 255, 255, 0.1)',
  sendButtonDisabled: '#666666',
  userBubbleMuted: 'rgba(255, 255, 255, 0.7)',
  assistantBubbleMuted: 'rgba(255, 255, 255, 0.5)',
  loadingBubble: '#3A3B3A',
  loadingDots: '#888888',
};

/**
 * Default light theme
 */
export const lightTheme: ChatTheme = {
  mode: 'light',
  colors: lightColors,
};

/**
 * Default dark theme
 */
export const darkTheme: ChatTheme = {
  mode: 'dark',
  colors: darkColors,
};

/**
 * Get the default theme based on mode
 */
export function getDefaultTheme(mode: 'light' | 'dark' = 'light'): ChatTheme {
  return mode === 'dark' ? darkTheme : lightTheme;
}

/**
 * Merge a partial theme with the default theme
 */
export function mergeTheme(
  partial?: Partial<ChatTheme> & { colors?: Partial<ChatThemeColors> }
): ChatTheme {
  const mode = partial?.mode ?? 'light';
  const defaultTheme = getDefaultTheme(mode);

  return {
    mode,
    colors: {
      ...defaultTheme.colors,
      ...(partial?.colors ?? {}),
    },
  };
}
