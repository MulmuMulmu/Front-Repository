import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DislikeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>＜</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.question}>싫어하는 식재료는 무엇인가요?</Text>

        {selectedItems.length > 0 && (
          <View style={styles.tagContainer}>
            {selectedItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tag}
                onPress={() => setSelectedItems(selectedItems.filter((_, i) => i !== index))}
              >
                <Text style={styles.tagText}>{item} x</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="검색어를 입력하세요"
            placeholderTextColor="#adb5bd"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => {
              if (search.trim() !== '') {
                setSelectedItems([...selectedItems, search.trim()]);
                setSearch('');
              }
            }}
          />
          <Ionicons name="search-outline" size={20} color="#adb5bd" />
        </View>
      </View>

      {selectedItems.length > 0 ? (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.nextButtonText}>완료</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.skipButtonText}>건너뛰기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF9FF',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  backButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#495057',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 220,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dee2e6',
    backgroundColor: '#ffffff',
  },
  tagText: {
    fontSize: 13,
    color: '#495057',
  },
  searchContainer: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f1f3f5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#495057',
  },
  searchIcon: {
    fontSize: 18,
  },
  nextButton: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
    height: 52,
    backgroundColor: '#87CEEB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
    height: 52,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  skipButtonText: {
    color: '#495057',
    fontSize: 18,
  },
});