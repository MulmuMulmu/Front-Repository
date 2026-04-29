import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const dummyRecipes = [
  { id: 1, title: '애호박 된장국', ingredients: '두부, 양파, 애호박...', image: null, emoji: '🍲' },
  { id: 2, title: '얼큰만둣국', ingredients: '만두, 달걀, 양파...', image: null, emoji: '🥟' },
  { id: 3, title: '만두 오뎅탕', ingredients: '오뎅(어묵), 만두...', image: null, emoji: '🍢' },
  { id: 4, title: '계란볶음밥', ingredients: '계란, 밥, 대파...', image: null, emoji: '🍳' },
  { id: 5, title: '시금치 무침', ingredients: '시금치, 참기름, 마늘...', image: null, emoji: '🥬' },
];

export default function RecipeScreen({ navigation }) {
  const [searchVisible, setSearchVisible] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? dummyRecipes.filter(r =>
        r.title.includes(search) || r.ingredients.includes(search)
      )
    : dummyRecipes;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>레시피</Text>
        <TouchableOpacity onPress={() => setSearchVisible(v => !v)}>
          <Ionicons name="search-outline" size={24} color="#495057" />
        </TouchableOpacity>
      </View>

      {searchVisible && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="레시피를 검색해보세요"
            placeholderTextColor="#adb5bd"
            value={search}
            onChangeText={setSearch}
            autoFocus
          />
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 추천 배너 */}
        <TouchableOpacity
          style={styles.recommendBanner}
          onPress={() => navigation.navigate('RecipeRecommend')}
        >
          <Text style={styles.recommendText}>내 식자재로 레시피 추천받기</Text>
          <Ionicons name="chevron-forward" size={18} color="#495057" />
        </TouchableOpacity>

        {/* 레시피 목록 */}
        {filtered.map(recipe => (
          <TouchableOpacity
            key={recipe.id}
            style={styles.recipeCard}
            onPress={() => navigation.navigate('RecipeDetail', { recipe })}
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
              <Text style={styles.recipeIngredients}>{recipe.ingredients}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBF9FF' },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 16,
  },
  headerTitle: { fontSize: 25, fontWeight: 'bold', color: '#495057' },
  searchContainer: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: '#f1f3f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 44,
    justifyContent: 'center',
  },
  searchInput: { fontSize: 14, color: '#495057' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  recommendBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e8f4fb',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 20,
  },
  recommendText: { fontSize: 15, fontWeight: '600', color: '#495057' },
  recipeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
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
});
