import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import type { ColorValue } from 'react-native';
import { colors, radius } from '@/theme';
import type { IconName } from '@/utils/icons';
function tabIcon(name: IconName) {
  return ({ color, focused }: { color: ColorValue; focused: boolean }) => (
    <View style={[styles.icon, focused && styles.activeIcon]}>
      <Ionicons
        name={name}
        size={21}
        color={typeof color === 'number' ? colors.muted : (color ?? colors.muted)}
      />
    </View>
  );
}
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: styles.bar,
        tabBarLabelStyle: styles.label,
        tabBarIconStyle: styles.iconSlot,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Notas', tabBarIcon: tabIcon('receipt') }}
      />
      <Tabs.Screen
        name="scan"
        options={{ title: 'Escanear', tabBarIcon: tabIcon('camera') }}
      />
      <Tabs.Screen
        name="summary"
        options={{ title: 'Resumo', tabBarIcon: tabIcon('pie-chart') }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Perfil', tabBarIcon: tabIcon('person') }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: { backgroundColor: colors.surface, borderTopColor: colors.border },
  label: { fontSize: 11, fontWeight: '700' },
  iconSlot: { width: 48, height: 27 },
  icon: { width: 46, height: 27, alignItems: 'center', justifyContent: 'center' },
  activeIcon: { backgroundColor: colors.primarySoft, borderRadius: radius.pill },
});
