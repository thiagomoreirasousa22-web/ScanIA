import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text } from 'react-native';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { FormInput } from '@/components/FormInput';
import { HeroPanel } from '@/components/HeroPanel';
import { Screen } from '@/components/Screen';
import { useAuth } from '@/context/AuthContext';
import { registerSchema } from '@/schemas/auth';
import type { RegisterData } from '@/schemas/auth';
import { colors, spacing } from '@/theme';
import { friendlyError } from '@/utils/errors';
export default function RegisterScreen() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirm: '' },
  });
  const onSubmit = handleSubmit(async ({ name, email, password }) => {
    setFormError(null);
    try {
      const { needsConfirmation } = await signUp(name.trim(), email.trim(), password);
      if (needsConfirmation) {
        Alert.alert(
          'Confirme seu e-mail',
          'Enviamos um link de confirmação. Depois de confirmar, faça login.',
        );
        router.replace('/login');
      }
      // Sem confirmação: a sessão já existe e o app redireciona sozinho.
    } catch (error) {
      setFormError(friendlyError(error));
    }
  });
  return (
    <Screen scroll>
      <HeroPanel
        icon="person-add-outline"
        title="Criar conta"
        description="Cadastre-se para organizar suas notas fiscais."
      />
      <Card>
        <FormInput control={control} name="name" label="Nome" placeholder="Seu nome" />
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
          placeholder="Mínimo de 6 caracteres"
          secureTextEntry
          autoCapitalize="none"
        />
        <FormInput
          control={control}
          name="confirm"
          label="Confirmar senha"
          placeholder="Repita a senha"
          secureTextEntry
          autoCapitalize="none"
        />
        {formError ? <Text style={styles.error}>{formError}</Text> : null}
        <Button
          icon="arrow-forward"
          title="Criar conta"
          onPress={onSubmit}
          loading={isSubmitting}
        />
      </Card>
      <Link href="/login" style={styles.link}>
        Já tem conta? <Text style={styles.linkStrong}>Entrar</Text>
      </Link>
    </Screen>
  );
}
const styles = StyleSheet.create({
  error: { color: colors.danger, marginBottom: spacing.md, textAlign: 'center' },
  link: { paddingVertical: 12, textAlign: 'center', color: colors.muted, fontSize: 15 },
  linkStrong: { color: colors.primary, fontWeight: '700' },
});
