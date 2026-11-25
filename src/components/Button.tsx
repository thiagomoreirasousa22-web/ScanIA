import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '@/theme';
import type { IconName } from '@/utils/icons';
type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
interface ButtonProps {
  title: string;
  icon?: IconName;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}
const labelColor: Record<Variant, string> = {
  primary: '#FFFFFF',
  danger: '#FFFFFF',
  secondary: colors.primary,
  ghost: colors.muted,
};
export function Button({
  title,
  icon,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}: ButtonProps) {
  const inactive = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: inactive, busy: loading }}
      onPress={onPress}
      disabled={inactive}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        pressed && styles.pressed,
        inactive && styles.inactive,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={labelColor[variant]} />
      ) : icon ? (
        <Ionicons name={icon} size={19} color={labelColor[variant]} />
      ) : null}
      <Text style={[styles.label, { color: labelColor[variant] }]}>{title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: 10,
  },
  label: { flexShrink: 1, textAlign: 'center', fontSize: 15, fontWeight: '700' },
  pressed: { opacity: 0.85 },
  inactive: { opacity: 0.5 },
});
const variantStyles = StyleSheet.create({
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.primarySoft },
  danger: { backgroundColor: colors.danger },
  ghost: { backgroundColor: 'transparent' },
});
