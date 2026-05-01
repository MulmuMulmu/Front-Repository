import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';

const TABS = ['전체', '내 재료로만', '재료 추가 필요'];

const dummyResults = [
  { id: 1, title: '시금치 무침', ingredients: ['마늘', '참기름', '소금', '시금치'], image: null, emoji: '🥬', hasAll: true },
  { id: 2, title: '고기잡채', ingredients: ['당면', '당근', '파프리카', '시금치'], image: null, emoji: '🍜', hasAll: false },
  { id: 3, title: '돼지고기 김치찌개', ingredients: ['돼지고기', '김치', '두부', '대파'], image: null, emoji: '🍲', hasAll: false },
  { id: 4, title: '시금치 된장국', ingredients: ['시금치', '된장', '두부', '파'], image: null, emoji: '🥣', hasAll: true },
];

export default function RecipeResultScreen({ navigation, route }) {
  const allIngredients = route?.params?.selectedIngredients || ['시금치', '돼지고기'];
  const [activeIngredients, setActiveIngredients] = useState(allIngredients);
  const [activeTab, setActiveTab] = useState('전체');

  const toggleIngredient = (name) => {
    if (activeIngredients.includes(name)) {
      setActiveIngredients(prev => prev.filter(i => i !== name));
    } else {
      setActiveIngredients(prev => [...prev, name]);
    }
  };

  const baseResults = activeIngredients.length === 0
    ? dummyResults
    : dummyResults.filter(r => activeIngredients.some(ing => r.ingredients.includes(ing)));

  const renderIngredients = (recipe) => {
    if (activeTab !== '재료 추가 필요') {
      return <Text style={styles.recipeIngredients} numberOfLines={1}>{recipe.ingredients.join(', ')}</Text>;
    }
    return (
      <View style={styles.ingredientRow}>
        {recipe.ingredients.map((ing, i) => {
          const isMissing = !activeIngredients.includes(ing);
          return (
            <Text key={i} style={[styles.ingredientChip, isMissing && styles.ingredientChipMissing]}>
              {ing}{i < recipe.ingredients.length - 1 ? ', ' : ''}
            </Text>
          );
        })}
      </View>
    );
  };

  const filtered = activeTab === '전체'
    ? baseResults
    : activeTab === '내 재료로만'
    ? baseResults.filter(r => r.hasAll)
    : baseResults.filter(r => !r.hasAll);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>＜</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>레시피 추천</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* 선택 재료 칩 */}
      <View style={styles.chipContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          {allIngredients.map((name, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.chip, !activeIngredients.includes(name) && styles.chipInactive]}
              onPress={() => toggleIngredient(name)}
            >
              <Text style={[styles.chipText, !activeIngredients.includes(name) && styles.chipTextInactive]}>
                {name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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

      {/* 레시피 목록 */}
      <ScrollView contentContainerStyle={styles.listContent}>
        {filtered.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>해당하는 레시피가 없어요</Text>
          </View>
        ) : (
          filtered.map(recipe => (
            <TouchableOpacity
              key={recipe.id}
              style={styles.recipeCard}
              onPress={() => navigation.navigate('RecipeDetail', { recipe, myIngredients: activeIngredients })}
            >
              <View style={styles.recipeImageBox}>
                {recipe.image ? (
                  <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
                ) : (
                  <Text style={styles.recipeEmoji}>{recipe.emoji}</Text>
                )}
              </View>
              <View style={styles.recipeInfo}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                {renderIngredients(recipe)}
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
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
  chipContainer: { paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: '#dee2e6' },
  chipRow: { paddingHorizontal: 20, gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#e8f4fb',
    borderRadius: 20,
  },
  chipInactive: { backgroundColor: '#f1f3f5' },
  chipText: { fontSize: 13, color: '#495057', fontWeight: '600' },
  chipTextInactive: { color: '#adb5bd' },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#dee2e6',
    paddingHorizontal: 20,
  },
  tabItem: { marginRight: 20, paddingVertical: 10, alignItems: 'center' },
  tabText: { fontSize: 14, color: '#adb5bd' },
  tabTextActive: { color: '#495057', fontWeight: 'bold' },
  tabUnderline: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: 2,
    backgroundColor: '#495057',
    borderRadius: 1,
  },
  listContent: { padding: 20, gap: 12, paddingBottom: 40 },
  recipeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  recipeImageBox: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: '#f1f3f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    overflow: 'hidden',
  },
  recipeImage: { width: 72, height: 72 },
  recipeEmoji: { fontSize: 36 },
  recipeInfo: { flex: 1 },
  recipeTitle: { fontSize: 16, fontWeight: 'bold', color: '#495057', marginBottom: 6 },
  recipeIngredients: { fontSize: 13, color: '#adb5bd' },
  ingredientRow: { flexDirection: 'row', flexWrap: 'wrap' },
  ingredientChip: { fontSize: 13, color: '#adb5bd' },
  ingredientChipMissing: { color: '#FF6B6B', fontWeight: 'bold' },
  emptyContainer: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 15, color: '#adb5bd' },
});
