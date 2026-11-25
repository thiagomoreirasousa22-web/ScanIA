import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '@/theme';
import type { IconName } from '@/utils/icons';

interface HeroPanelProps {
  icon: IconName;
  title: string;
  description: string;
  children?: ReactNode;
}

export function HeroPanel({ icon, title, description, children }: HeroPanelProps) {
  return (
    <View style={styles.panel}>
      <View pointerEvents="none" style={styles.ring} />
      <View pointerEvents="none" style={[styles.ring, styles.innerRing]} />
      <View style={styles.icon}>
        <Ionicons name={icon} size={25} color={colors.forest} />
      </View>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      <Text style={styles.description}>{description}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.forest,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  ring: {
    position: 'absolute',
    top: -66,
    right: -52,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#376153',
  },
  innerRing: { top: -48, right: -34, width: 164, height: 164 },
  icon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mint,
    marginBottom: spacing.md,
  },
  title: {
    color: colors.surface,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1.1,
  },
  description: {
    color: colors.onForest,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
  },
});
