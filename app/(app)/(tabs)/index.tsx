import { useRouter } from 'expo-router';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/Button';
import { HeroPanel } from '@/components/HeroPanel';
import { ReceiptCard } from '@/components/ReceiptCard';
import { Screen } from '@/components/Screen';
import { EmptyState, ErrorState, LoadingView } from '@/components/StateViews';
import { useReceipts } from '@/hooks/useReceipts';
import { colors, spacing } from '@/theme';
import { friendlyError } from '@/utils/errors';
export default function ReceiptsScreen() {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch, isRefetching } = useReceipts();
  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorState message={friendlyError(error)} onRetry={refetch} />;
  return (
    <Screen>
      <FlatList
        data={data ?? []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <HeroPanel
              icon="scan-outline"
              title="Minhas notas"
              description="Fotografe uma nota fiscal para ler e organizar seus dados."
            >
              <Button
                icon="camera-outline"
                title="Escanear nota"
                variant="secondary"
                onPress={() => router.push('/scan')}
                style={styles.scan}
              />
            </HeroPanel>
            {data?.length ? (
              <Text accessibilityRole="header" style={styles.title}>
                Histórico
              </Text>
            ) : null}
          </>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <EmptyState
              icon="camera-outline"
              title="Nenhuma nota ainda"
              message="As notas que você escanear aparecerão aqui."
            />
          </View>
        }
        renderItem={({ item }) => (
          <ReceiptCard
            receipt={item}
            onPress={() => router.push(`/receipt/${item.id}`)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={() => void refetch()} />
        }
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  content: { padding: spacing.md, flexGrow: 1 },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.md,
  },
  scan: { alignSelf: 'flex-start', marginTop: spacing.md },
  empty: { flex: 1, justifyContent: 'center' },
});
