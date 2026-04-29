import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const allergyList = ['없음', '계란', '메밀', '땅콩', '대두', '밀', '고등어', '게', '새우', '돼지고기', '우유', '복숭아', '토마토', '직접입력'];

export default function AllergyScreen({ navigation }) {
  const [selected, setSelected] = useState(['없음']);

  const toggleItem = (item) => {
    if (item === '없음') {
      setSelected(['없음']);
      return;
    }
    const filtered = selected.filter(s => s !== '없음');
    if (filtered.includes(item)) {
      setSelected(filtered.filter(s => s !== item));
    } else {
      setSelected([...filtered, item]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>＜</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.question}>어떤 알러지가 있나요?</Text>

        <View style={styles.tagContainer}>
          {allergyList.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.tag,
                selected.includes(item) && styles.tagSelected,
              ]}
              onPress={() => toggleItem(item)}
            >
              <Text style={[
                styles.tagText,
                selected.includes(item) && styles.tagTextSelected,
              ]}>
                {item} {item === '직접입력' ? '+' : '✓'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('Prefer')}
      >
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
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
    left: 15,
    zIndex: 10,
    padding: 8,
  },
  backButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#495057',
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingTop: 220,
    paddingBottom: 100,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 32,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dee2e6',
    backgroundColor: '#ffffff',
  },
  tagSelected: {
    backgroundColor: '#87CEEB',
    borderColor: '#87CEEB',
  },
  tagText: {
    fontSize: 14,
    color: '#495057',
  },
  tagTextSelected: {
    color: '#ffffff',
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
});