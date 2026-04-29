import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TABS = ['전체', '임박한 재료'];

const dummyIngredients = [
  { id: 1, name: '시금치', dday: 1, urgent: true },
  { id: 2, name: '돼지고기', dday: 1, urgent: true },
  { id: 3, name: '고등어', dday: 1, urgent: true },
  { id: 4, name: '감자', dday: 5, urgent: false },
  { id: 5, name: '계란', dday: 7, urgent: false },
  { id: 6, name: '두부', dday: 3, urgent: true },
  { id: 7, name: '대파', dday: 4, urgent: true },
  { id: 8, name: '양파', dday: 10, urgent: false },
];

export default function RecipeRecommendScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('전체');
  const [selected, setSelected] = useState([1, 2]);

  const filtered = activeTab === '임박한 재료'
    ? dummyIngredients.filter(i => i.dday <= 3)
    : dummyIngredients;

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleRecommend = () => {
    if (selected.length === 0) {
      Alert.alert('재료를 선택해주세요.');
      return;
    }
    const selectedNames = dummyIngredients
      .filter(i => selected.includes(i.id))
      .map(i => i.name);
    navigation.navigate('RecipeResult', { selectedIngredients: selectedNames });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>＜</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>레시피 추천</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* 탭 */}
      <View style={styles.tabBar}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={styles.tabItem}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* 재료 목록 */}
      <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 20 }}>
        {filtered.map(item => {
          const isSelected = selected.includes(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.item}
              onPress={() => toggleSelect(item.id)}
            >
              <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                {isSelected && <Ionicons name="checkmark" size={14} color="#ffffff" />}
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={[
                  styles.itemDday,
                  item.dday <= 3 ? { color: '#FF6B6B' } : { color: '#FFB347' }
                ]}>
                  소비기한 {item.dday}일 남음
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 추천받기 버튼 */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.recommendButton, selected.length === 0 && styles.recommendButtonDisabled]}
          onPress={handleRecommend}
        >
          <Text style={styles.recommendButtonText}>선택한 재료로 레시피 추천받기</Text>
        </TouchableOpacity>
      </View>
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
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#dee2e6',
    paddingHorizontal: 20,
  },
  tabItem: {
    marginRight: 24,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabText: { fontSize: 15, color: '#adb5bd' },
  tabTextActive: { color: '#495057', fontWeight: 'bold' },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#495057',
    borderRadius: 1,
  },
  list: { flex: 1, paddingHorizontal: 20 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f1f3f5',
    gap: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#dee2e6',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#87CEEB',
    borderColor: '#87CEEB',
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: '600', color: '#495057', marginBottom: 4 },
  itemDday: { fontSize: 13 },
  bottomBar: {
    backgroundColor: '#FBF9FF',
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#dee2e6',
  },
  recommendButton: {
    height: 52,
    backgroundColor: '#87CEEB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendButtonDisabled: { backgroundColor: '#dee2e6' },
  recommendButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});
