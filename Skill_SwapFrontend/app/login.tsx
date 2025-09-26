import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const emailValid = /^\S+@\S+\.\S+$/.test(email.trim());
  const passwordValid = password.trim().length >= 4;
  const canSubmit = emailValid && passwordValid && !loading;

  const handleLogin = async () => {
    if (email.trim() === 'test@student.com' && password.trim() === '12345') {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1000));
      login(email.trim(), password);
      router.replace('/(tabs)');
      return;
    }
    Alert.alert('Login failed', 'Invalid email or password. Use test@student.com / 12345');
  };

  const handleSignUp = async () => {
    if (!emailValid || !passwordValid) {
      Alert.alert('Check your details', 'Enter a valid email and a password with at least 4 characters.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    Alert.alert('Success', 'Account created! You are now logged in.');
    login(email.trim(), password);
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        keyboardVerticalOffset={Platform.select({ ios: 64, android: 0 })}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>🌊</Text>
            </View>
            <Text style={styles.appName}>SkillSwap</Text>
            <Text style={styles.tagline}>
              {isSignUp ? 'Join the Ocean' : 'Welcome Back'}
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.formCard}>
              {/* Header */}
              <View style={styles.formHeader}>
                <Text style={styles.formTitle}>
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </Text>
                <Text style={styles.formSubtitle}>
                  {isSignUp ? 'Join our community of learners' : 'Welcome back to your journey'}
                </Text>
              </View>

              {/* Inputs */}
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>📧 Email Address</Text>
                  <TextInput
                    placeholder="Enter your email address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    editable={!loading}
                  />
                  {!emailValid && email.length > 0 && (
                    <Text style={styles.hint}>Please enter a valid email.</Text>
                  )}
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>🔒 Password</Text>
                  <View style={styles.passwordRow}>
                    <TextInput
                      placeholder="Enter your password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      style={[styles.input, { flex: 1 }]}
                      editable={!loading}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeBtn}
                      disabled={loading}
                    >
                      <Text style={styles.eyeText}>
                        {showPassword ? '🙈' : '👁️'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {!passwordValid && password.length > 0 && (
                    <Text style={styles.hint}>Minimum 4 characters.</Text>
                  )}
                </View>
              </View>

              {/* Buttons */}
              <View style={styles.buttonSection}>
                <TouchableOpacity
                  style={[styles.primaryButton, !canSubmit && styles.primaryButtonDisabled]}
                  onPress={isSignUp ? handleSignUp : handleLogin}
                  disabled={!canSubmit}
                >
                  <Text style={styles.primaryButtonText}>
                    {loading ? 'Loading...' : (isSignUp ? '🚀 Create Account' : '🔑 Sign In')}
                  </Text>
                </TouchableOpacity>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => setIsSignUp(!isSignUp)}
                  disabled={loading}
                >
                  <Text style={styles.secondaryButtonText}>
                    {isSignUp ? '✨ Already have an account? Sign In' : "🌟 Don't have an account? Sign Up"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Demo credentials */}
              <View style={styles.demoSection}>
                <View style={styles.demoCard}>
                  <Text style={styles.demoText}>🧪 Demo Credentials</Text>
                  <Text style={styles.demoCredentials}>
                    Email: test@student.com{'\n'}Password: 12345
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.md,
  },
  logoEmoji: {
    fontSize: 40,
  },
  appName: {
    fontSize: Typography['3xl'],
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
    textAlign: 'center',
    color: Colors.light.text,
  },
  tagline: {
    fontSize: Typography.base,
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  formCard: {
    backgroundColor: Colors.light.background,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginHorizontal: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.light.border,
    ...Shadows.lg,
  },
  formHeader: {
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  formTitle: {
    fontSize: Typography['2xl'],
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
    color: Colors.light.text,
  },
  formSubtitle: {
    fontSize: Typography.base,
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: Spacing.xl,
  },
  inputWrapper: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    marginBottom: Spacing.sm,
    fontSize: Typography.sm,
    fontWeight: '600',
    color: Colors.light.text,
  },
  input: {
    backgroundColor: Colors.light.inputBackground,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.light.inputBorder,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: Typography.base,
    ...Shadows.sm,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeBtn: {
    marginLeft: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.light.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.light.inputBorder,
  },
  eyeText: {
    fontSize: Typography.base,
  },
  hint: {
    marginTop: Spacing.xs,
    fontSize: Typography.xs,
    color: Colors.light.textTertiary,
  },
  buttonSection: {
    marginBottom: Spacing.xl,
  },
  primaryButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  primaryButtonDisabled: {
    backgroundColor: Colors.light.buttonPrimaryDisabled,
  },
  primaryButtonText: {
    fontSize: Typography.lg,
    fontWeight: '600',
    color: Colors.light.textInverse,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.light.border,
  },
  dividerText: {
    marginHorizontal: Spacing.md,
    fontSize: Typography.sm,
    color: Colors.light.textTertiary,
  },
  secondaryButton: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: Typography.base,
    color: Colors.light.primary,
    fontWeight: '500',
  },
  demoSection: {
    alignItems: 'center',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  demoCard: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  demoText: {
    fontSize: Typography.xs,
    fontWeight: '600',
    marginBottom: Spacing.xs,
    textAlign: 'center',
    color: Colors.light.textTertiary,
  },
  demoCredentials: {
    fontSize: Typography.xs,
    textAlign: 'center',
    lineHeight: 16,
    color: Colors.light.textSecondary,
  },
});