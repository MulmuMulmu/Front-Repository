import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

const categories = ['정육/계란', '해산물', '채소/과일', '유제품', '쌀/면/빵', '소스/조미료/오일', '가공식품', '기타'];

const emptyItem = () => ({ name: '', date: '', category: '' });

export default function DirectInputScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [categoryTargetIndex, setCategoryTargetIndex] = useState(null);

  const handleAdd = () => {
    setItems(prev => [...prev, emptyItem()]);
  };

  const handleChange = (index, field, value) => {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const handleRemove = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleComplete = () => {
    if (items.length === 0) {
      Alert.alert('알림', '재료를 추가해주세요.');
      return;
    }
    const incomplete = items.some(item => !item.name || !item.date || !item.category);
    if (incomplete) {
      Alert.alert('알림', '모든 항목을 입력해주세요.');
      return;
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>＜</Text>
        </TouchableOpacity>
        <Text style={styles.title}>식재료 추가</Text>
        <TouchableOpacity onPress={handleComplete}>
          <Text style={styles.completeText}>완료</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} keyboardShouldPersistTaps="handled">
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>'추가' 버튼을 눌러{'\n'}재료를 추가해 주세요.</Text>
          </View>
        ) : (
          items.map((item, index) => (
            <View key={index} style={styles.itemBox}>
              <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(index)}>
                <Text style={styles.removeButtonText}>✕</Text>
              </TouchableOpacity>
              <View style={styles.nameRow}>
                <TextInput
                  style={styles.nameInput}
                  placeholder="식재료명"
                  placeholderTextColor="#adb5bd"
                  value={item.name}
                  onChangeText={(v) => handleChange(index, 'name', v)}
                />
              </View>
              <View style={styles.bottomRow}>
                <TextInput
                  style={styles.dateInput}
                  placeholder="YY.MM.DD"
                  placeholderTextColor="#adb5bd"
                  value={item.date}
                  onChangeText={(v) => handleChange(index, 'date', v)}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={styles.categorySelect}
                  onPress={() => setCategoryTargetIndex(index)}
                >
                  <Text style={[styles.categorySelectText, item.category && { color: '#495057' }]}>
                    {item.category || '카테고리'}
                  </Text>
                  <Text style={styles.categoryArrow}>∨</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>+ 추가</Text>
      </TouchableOpacity>

      {categoryTargetIndex !== null && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setCategoryTargetIndex(null)}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>카테고리 선택</Text>
            <ScrollView>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={styles.modalItem}
                  onPress={() => {
                    handleChange(categoryTargetIndex, 'category', cat);
                    setCategoryTargetIndex(null);
                  }}
                >
                  <Text style={[
                    styles.modalItemText,
                    items[categoryTargetIndex]?.category === cat && styles.modalItemTextSelected,
                  ]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
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
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dee2e6',
  },
  backButton: { fontSize: 24, fontWeight: 'bold', color: '#495057' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#495057' },
  completeText: { fontSize: 16, color: '#87CEEB', fontWeight: 'bold' },
  body: { flex: 1 },
  bodyContent: { flexGrow: 1, padding: 20, gap: 16, paddingBottom: 100 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 60 },
  emptyText: { fontSize: 15, color: '#adb5bd', textAlign: 'center', lineHeight: 24 },
  itemBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    paddingTop: 28,
    gap: 12,
    borderWidth: 0.5,
    borderColor: '#dee2e6',
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 12,
  },
  removeButtonText: { fontSize: 14, color: '#adb5bd' },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: '#f8f9fa',
  },
  nameInput: { flex: 1, fontSize: 14, color: '#495057' },
  bottomRow: { flexDirection: 'row', gap: 12 },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: '#f8f9fa',
    fontSize: 14,
    color: '#495057',
  },
  categorySelect: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: '#f8f9fa',
  },
  categorySelectText: { fontSize: 14, color: '#adb5bd' },
  categoryArrow: { fontSize: 14, color: '#495057' },
  addButton: {
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
  addButtonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 40,
    maxHeight: 400,
  },
  modalTitle: { fontSize: 16, fontWeight: 'bold', color: '#495057', marginBottom: 8 },
  modalItem: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dee2e6',
  },
  modalItemText: { fontSize: 16, color: '#495057' },
  modalItemTextSelected: { color: '#87CEEB', fontWeight: 'bold' },
});
