/**
 * Simple and clean theme system for the app
 * Minimal colors, clean typography, and simple design
 */

import { Platform } from 'react-native';

// Simple color palette
const primary = '#2563EB'; // Simple blue
const primaryLight = '#3B82F6';
const primaryDark = '#1D4ED8';

// Secondary colors
const secondary = '#64748B'; // Simple gray
const secondaryLight = '#94A3B8';
const secondaryDark = '#475569';

// Success, warning, error colors
const success = '#10B981'; // Green
const successLight = '#34D399';
const successDark = '#059669';

const warning = '#F59E0B'; // Amber
const warningLight = '#FBBF24';
const warningDark = '#D97706';

const error = '#EF4444'; // Red
const errorLight = '#F87171';
const errorDark = '#DC2626';

// Info color
const info = '#3B82F6'; // Blue
const infoLight = '#60A5FA';
const infoDark = '#2563EB';

// Simple neutral colors
const gray50 = '#F8FAFC';
const gray100 = '#F1F5F9';
const gray200 = '#E2E8F0';
const gray300 = '#CBD5E1';
const gray400 = '#94A3B8';
const gray500 = '#64748B';
const gray600 = '#475569';
const gray700 = '#334155';
const gray800 = '#1E293B';
const gray900 = '#0F172A';

export const Colors = {
  light: {
    // Primary colors
    primary,
    primaryLight,
    primaryDark,
    secondary,
    secondaryLight,
    secondaryDark,
    
    // Status colors
    success,
    successLight,
    successDark,
    warning,
    warningLight,
    warningDark,
    error,
    errorLight,
    errorDark,
    info,
    infoLight,
    infoDark,
    
    // Text colors
    text: gray900,
    textSecondary: gray600,
    textTertiary: gray500,
    textInverse: '#FFFFFF',
    
    // Background colors
    background: '#FFFFFF',
    backgroundSecondary: gray50,
    backgroundTertiary: gray100,
    backgroundInverse: gray900,
    backgroundElevated: '#FFFFFF',
    backgroundOverlay: 'rgba(0, 0, 0, 0.5)',
    
    // Border colors
    border: gray200,
    borderSecondary: gray300,
    borderFocus: primary,
    
    // Surface colors
    surface: '#FFFFFF',
    surfaceSecondary: gray50,
    surfaceTertiary: gray100,
    
    // Interactive colors
    tint: primary,
    tabIconDefault: gray500,
    tabIconSelected: primary,
    icon: gray500,
    
    // Card colors
    cardBackground: '#FFFFFF',
    cardBorder: gray200,
    
    // Button colors
    buttonPrimary: primary,
    buttonPrimaryDisabled: gray300,
    buttonSecondary: gray100,
    buttonSecondaryDisabled: gray200,
    buttonDanger: error,
    buttonSuccess: success,
    buttonGhost: 'transparent',
    
    // Input colors
    inputBackground: '#FFFFFF',
    inputBorder: gray300,
    inputBorderFocus: primary,
    inputPlaceholder: gray400,
    
    // Shadow colors
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowStrong: 'rgba(0, 0, 0, 0.2)',
    shadowColored: 'rgba(102, 126, 234, 0.3)',
  },
  dark: {
    // Primary colors
    primary,
    primaryLight,
    primaryDark,
    secondary,
    secondaryLight,
    secondaryDark,
    
    // Status colors
    success,
    successLight,
    successDark,
    warning,
    warningLight,
    warningDark,
    error,
    errorLight,
    errorDark,
    info,
    infoLight,
    infoDark,
    
    // Text colors
    text: '#FFFFFF',
    textSecondary: gray300,
    textTertiary: gray400,
    textInverse: gray900,
    
    // Background colors
    background: gray900,
    backgroundSecondary: gray800,
    backgroundTertiary: gray700,
    backgroundInverse: '#FFFFFF',
    backgroundElevated: gray800,
    backgroundOverlay: 'rgba(0, 0, 0, 0.7)',
    
    // Border colors
    border: gray700,
    borderSecondary: gray600,
    borderFocus: primaryLight,
    
    // Surface colors
    surface: gray800,
    surfaceSecondary: gray700,
    surfaceTertiary: gray600,
    
    // Interactive colors
    tint: primaryLight,
    tabIconDefault: gray400,
    tabIconSelected: primaryLight,
    icon: gray400,
    
    // Card colors
    cardBackground: gray800,
    cardBorder: gray700,
    
    // Button colors
    buttonPrimary: primaryLight,
    buttonPrimaryDisabled: gray600,
    buttonSecondary: gray700,
    buttonSecondaryDisabled: gray600,
    buttonDanger: error,
    buttonSuccess: success,
    buttonGhost: 'transparent',
    
    // Input colors
    inputBackground: gray800,
    inputBorder: gray600,
    inputBorderFocus: primaryLight,
    inputPlaceholder: gray500,
    
    // Shadow colors
    shadow: 'rgba(0, 0, 0, 0.3)',
    shadowStrong: 'rgba(0, 0, 0, 0.5)',
    shadowColored: 'rgba(124, 142, 255, 0.4)',
  },
};

// Simple gradients
export const Gradients = {
  primary: [primary, primaryLight],
  secondary: [secondary, secondaryLight],
  success: [success, successLight],
  warning: [warning, warningLight],
  error: [error, errorLight],
  info: [info, infoLight],
};

// Spacing scale
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Border radius
export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

// Simple typography scale
export const Typography = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
};

// Simple font weights
export const FontWeights = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

// Simple line heights
export const LineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.625,
};

// Shadows
export const Shadows = {
  sm: Platform.select({
    web: { boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
  }) as any,
  md: Platform.select({
    web: { boxShadow: '0px 4px 8px rgba(0,0,0,0.10)' },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
  }) as any,
  lg: Platform.select({
    web: { boxShadow: '0px 8px 16px rgba(0,0,0,0.15)' },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 5,
    },
  }) as any,
  xl: Platform.select({
    web: { boxShadow: '0px 16px 24px rgba(0,0,0,0.20)' },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.2,
      shadowRadius: 24,
      elevation: 8,
    },
  }) as any,
};

// Simple animation durations
export const AnimationDurations = {
  fast: 200,
  normal: 300,
  slow: 500,
};

// Simple font system
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});
