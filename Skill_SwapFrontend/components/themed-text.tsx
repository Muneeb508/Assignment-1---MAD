import { StyleSheet, Text, type TextProps } from 'react-native';
import Animated from 'react-native-reanimated';

import { FontWeights, LineHeights, Typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodyLarge' | 'bodySmall' | 'caption' | 'button' | 'link' | 'label';
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'text' | 'textSecondary' | 'textTertiary' | 'textInverse';
  animated?: boolean;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'body',
  color = 'text',
  animated = false,
  ...rest
}: ThemedTextProps) {
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, color as any);

  const TextComponent = animated ? Animated.Text : Text;

  return (
    <TextComponent
      style={[
        { color: textColor },
        type === 'h1' ? styles.h1 : undefined,
        type === 'h2' ? styles.h2 : undefined,
        type === 'h3' ? styles.h3 : undefined,
        type === 'h4' ? styles.h4 : undefined,
        type === 'body' ? styles.body : undefined,
        type === 'bodyLarge' ? styles.bodyLarge : undefined,
        type === 'bodySmall' ? styles.bodySmall : undefined,
        type === 'caption' ? styles.caption : undefined,
        type === 'button' ? styles.button : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'label' ? styles.label : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: Typography['4xl'],
    fontWeight: FontWeights.bold,
    lineHeight: Typography['4xl'] * LineHeights.tight,
  },
  h2: {
    fontSize: Typography['3xl'],
    fontWeight: FontWeights.bold,
    lineHeight: Typography['3xl'] * LineHeights.tight,
  },
  h3: {
    fontSize: Typography['2xl'],
    fontWeight: FontWeights.semibold,
    lineHeight: Typography['2xl'] * LineHeights.normal,
  },
  h4: {
    fontSize: Typography.xl,
    fontWeight: FontWeights.semibold,
    lineHeight: Typography.xl * LineHeights.normal,
  },
  body: {
    fontSize: Typography.base,
    fontWeight: FontWeights.normal,
    lineHeight: Typography.base * LineHeights.normal,
  },
  bodyLarge: {
    fontSize: Typography.lg,
    fontWeight: FontWeights.normal,
    lineHeight: Typography.lg * LineHeights.relaxed,
  },
  bodySmall: {
    fontSize: Typography.sm,
    fontWeight: FontWeights.normal,
    lineHeight: Typography.sm * LineHeights.normal,
  },
  caption: {
    fontSize: Typography.xs,
    fontWeight: FontWeights.normal,
    lineHeight: Typography.xs * LineHeights.normal,
  },
  button: {
    fontSize: Typography.base,
    fontWeight: FontWeights.semibold,
    lineHeight: Typography.base * LineHeights.normal,
    textAlign: 'center',
  },
  link: {
    fontSize: Typography.base,
    fontWeight: FontWeights.medium,
    lineHeight: Typography.base * LineHeights.normal,
    textDecorationLine: 'underline',
  },
  label: {
    fontSize: Typography.sm,
    fontWeight: FontWeights.medium,
    lineHeight: Typography.sm * LineHeights.normal,
  },
});
