import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const categories = ['전체', '정육/계란', '해산물', '채소/과일', '유제품', '쌀/면/빵', '소스/조미료/오일', '가공식품', '기타'];

export default function DirectInputScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryVisible, setCategoryVisible] = useState(false);

  const handleAdd = () => {
    if (!name || !date || !selectedCategory) {
      alert('모든 항목을 입력해주세요!');
      return;
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>＜</Text>
        </TouchableOpacity>
        <Text style={styles.title}>식재료 추가</Text>
        <TouchableOpacity onPress={handleAdd}>
          <Text style={styles.completeText}>완료</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.nameContainer}>
          <TextInput
            style={styles.nameInput}
            placeholder="식재료를 적어주세요"
            placeholderTextColor="#adb5bd"
            value={name}
            onChangeText={setName}
          />
          {name.length > 0 && (
            <TouchableOpacity onPress={() => setName('')}>
              <Text style={styles.clearButton}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.bottomRow}>
          <TextInput
            style={styles.dateInput}
            placeholder="YY.MM.DD"
            placeholderTextColor="#adb5bd"
            value={date}
            onChangeText={setDate}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.categorySelect}
            onPress={() => setCategoryVisible(true)}
          >
            <Text style={[
              styles.categorySelectText,
              selectedCategory && { color: '#495057' }
            ]}>
              {selectedCategory || '선택'}
            </Text>
            <Text style={styles.categoryArrow}>∨</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>추가</Text>
      </TouchableOpacity>

      {categoryVisible && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setCategoryVisible(false)}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>카테고리 선택</Text>
            <ScrollView>
              {categories.filter(c => c !== '전체').map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedCategory(cat);
                    setCategoryVisible(false);
                  }}
                >
                  <Text style={[
                    styles.modalItemText,
                    selectedCategory === cat && styles.modalItemTextSelected,
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
  container: {
    flex: 1,
    backgroundColor: '#FBF9FF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dee2e6',
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495057',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
  },
  completeText: {
    fontSize: 16,
    color: '#87CEEB',
    fontWeight: 'bold',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: '#ffffff',
  },
  nameInput: {
    flex: 1,
    fontSize: 14,
    color: '#495057',
  },
  clearButton: {
    fontSize: 14,
    color: '#adb5bd',
  },
  bottomRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: '#ffffff',
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
    backgroundColor: '#ffffff',
  },
  categorySelectText: {
    fontSize: 14,
    color: '#adb5bd',
  },
  categoryArrow: {
    fontSize: 14,
    color: '#495057',
  },
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
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 8,
  },
  modalItem: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dee2e6',
  },
  modalItemText: {
    fontSize: 16,
    color: '#495057',
  },
  modalItemTextSelected: {
    color: '#87CEEB',
    fontWeight: 'bold',
  },
});