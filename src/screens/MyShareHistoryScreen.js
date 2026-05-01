import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

const dummyHistory = [
  { id: 1, title: '양상추 나눔해요', description: '당일 구매했는데, 많아서...', date: '26.04.01', emoji: '🥬', receiver: '익명1' },
  { id: 2, title: '방울토마토 반팩', description: '반팩 정도 있어요', date: '26.03.20', emoji: '🍅', receiver: '익명2' },
  { id: 3, title: '식빵 나눔', description: '유통기한이 오늘까지예요', date: '26.03.15', emoji: '🍞', receiver: '익명3' },
];

export default function MyShareHistoryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>＜</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>나눔 내역</Text>
        <View style={{ width: 24 }} />
      </View>

      {dummyHistory.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>나눔 완료한 내역이 없어요.</Text>
        </View>
      ) : (
        <ScrollView>
          {dummyHistory.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.imageBox}>
                <Text style={styles.emoji}>{item.emoji}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc} numberOfLines={1}>{item.description}</Text>
                <Text style={styles.meta}>{item.receiver} · {item.date}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>나눔완료</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBF9FF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dee2e6',
  },
  backButton: { fontSize: 24, fontWeight: 'bold', color: '#495057' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#495057' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 15, color: '#adb5bd' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dee2e6',
    gap: 14,
  },
  imageBox: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#f1f3f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 28 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#495057', marginBottom: 4 },
  desc: { fontSize: 13, color: '#adb5bd', marginBottom: 4 },
  meta: { fontSize: 12, color: '#dee2e6' },
  badge: {
    backgroundColor: '#e8f4fb',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: { fontSize: 12, color: '#87CEEB', fontWeight: 'bold' },
});
