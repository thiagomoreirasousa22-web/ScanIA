import { QueryClientProvider } from '@tanstack/react-query';
import { StyleSheet, Text, View } from 'react-native';
import { isConfigured } from '@/lib/supabase';
import { colors, spacing } from '@/theme';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/context/AuthContext';
import { queryClient } from '@/lib/queryClient';
export default function RootLayout() {
  if (!isConfigured) {
    return (
      <View style={styles.setup}>
        <StatusBar style="dark" />
        <Text accessibilityRole="header" style={styles.title}>
          ScanIA indisponível
        </Text>
        <Text style={styles.message}>
          O responsável pelo projeto precisa configurar a conexão.
        </Text>
      </View>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  setup: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
    backgroundColor: colors.background,
  },
  title: { color: colors.text, fontSize: 24, fontWeight: '700' },
  message: { color: colors.muted, textAlign: 'center' },
});
