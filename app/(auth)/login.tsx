import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { FormInput } from '@/components/FormInput';
import { HeroPanel } from '@/components/HeroPanel';
import { Screen } from '@/components/Screen';
import { useAuth } from '@/context/AuthContext';
import { loginSchema } from '@/schemas/auth';
import type { LoginData } from '@/schemas/auth';
import { colors, pageTitle, spacing } from '@/theme';
import { friendlyError } from '@/utils/errors';
export default function LoginScreen() {
  const { signIn } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });
  const onSubmit = handleSubmit(async ({ email, password }) => {
    setFormError(null);
    try {
      await signIn(email.trim(), password);
      // O redirecionamento acontece sozinho quando a sessão muda.
    } catch (error) {
      setFormError(friendlyError(error));
    }
  });
  return (
    <Screen scroll>
      <View style={styles.brand}>
        <HeroPanel
          icon="scan-outline"
          title="ScanIA"
          description="Suas notas fiscais, lidas por IA."
        />
      </View>
      <Card>
        <Text accessibilityRole="header" style={pageTitle}>
          Entrar
        </Text>
        <FormInput
          control={control}
          name="email"
          label="E-mail"
          placeholder="voce@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <FormInput
          control={control}
          name="password"
          label="Senha"
          placeholder="Sua senha"
          secureTextEntry
          autoCapitalize="none"
        />
        {formError ? <Text style={styles.error}>{formError}</Text> : null}
        <Button
          icon="arrow-forward"
          title="Entrar"
          onPress={onSubmit}
          loading={isSubmitting}
        />
      </Card>
      <Link href="/register" style={styles.link}>
        Não tem conta? <Text style={styles.linkStrong}>Cadastre-se</Text>
      </Link>
    </Screen>
  );
}
const styles = StyleSheet.create({
  brand: { marginTop: spacing.md },
  error: { color: colors.danger, marginBottom: spacing.md, textAlign: 'center' },
  link: { paddingVertical: 12, textAlign: 'center', color: colors.muted, fontSize: 15 },
  linkStrong: { color: colors.primary, fontWeight: '700' },
});
