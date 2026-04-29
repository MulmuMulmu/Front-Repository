import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const myFoods = ['감자', '시금치', '방울토마토', '계란', '두부', '양상추', '식빵', '대파', '당근', '버섯'];

const categories = ['원형 보존 농산물(과일, 채소)', '미개봉 가공식품', '건강기능식품'];

export default function MarketWriteScreen({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedFood, setSelectedFood] = useState('');
  const [foodDropdownVisible, setFoodDropdownVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const openCamera = async () => {
    setPhotoModalVisible(false);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('카메라 접근 권한이 필요합니다.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    setPhotoModalVisible(false);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('갤러리 접근 권한이 필요합니다.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!title || !selectedFood || !description || !selectedCategory || !expiryDate) {
      alert('모든 항목을 입력해주세요!');
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
        <Text style={styles.headerTitle}>나눔하기</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.body} keyboardShouldPersistTaps="handled">
        {/* 사진 */}
        <TouchableOpacity style={styles.photoBox} onPress={() => setPhotoModalVisible(true)}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photoImage} />
          ) : (
            <Ionicons name="camera-outline" size={32} color="#adb5bd" />
          )}
        </TouchableOpacity>

        {/* 제목 */}
        <View style={styles.section}>
          <Text style={styles.label}>제목</Text>
          <TextInput
            style={styles.input}
            placeholder="제목을 입력해주세요."
            placeholderTextColor="#adb5bd"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* 식재료 */}
        <View style={styles.section}>
          <Text style={styles.label}>식재료</Text>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setFoodDropdownVisible(true)}
          >
            <Text style={[styles.dropdownText, selectedFood && { color: '#495057' }]}>
              {selectedFood || '식재료를 입력해주세요.'}
            </Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          {selectedFood !== '' && (
            <View style={styles.tagRow}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{selectedFood}</Text>
                <TouchableOpacity onPress={() => setSelectedFood('')}>
                  <Text style={styles.tagClose}> ✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* 자세한 설명 */}
        <View style={styles.section}>
          <Text style={styles.label}>자세한 설명</Text>
          <TextInput
            style={styles.textarea}
            placeholder={'게시물 내용을 작성해주세요.\n나눔 금지 물품은 게시가 제한될 수 있어요.'}
            placeholderTextColor="#adb5bd"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* 분류 */}
        <View style={styles.section}>
          <Text style={styles.label}>분류</Text>
          <View style={styles.chipRow}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, selectedCategory === cat && styles.chipSelected]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextSelected]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 유통기한 */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <Text style={styles.label}>유통기한</Text>
          <TextInput
            style={styles.input}
            placeholder="YY.MM.DD"
            placeholderTextColor="#adb5bd"
            value={expiryDate}
            onChangeText={setExpiryDate}
            keyboardType="numeric"
          />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>작성 완료</Text>
      </TouchableOpacity>

      {/* 사진 선택 모달 */}
      {photoModalVisible && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setPhotoModalVisible(false)}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>사진 등록</Text>
            <View style={styles.photoOptionRow}>
              <TouchableOpacity style={styles.photoOption} onPress={openCamera}>
                <Ionicons name="camera-outline" size={30} color="#495057" />
                <Text style={styles.photoOptionLabel}>camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.photoOption} onPress={openGallery}>
                <Ionicons name="image-outline" size={30} color="#495057" />
                <Text style={styles.photoOptionLabel}>gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}

      {/* 식재료 선택 모달 */}
      {foodDropdownVisible && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setFoodDropdownVisible(false)}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>내 식재료</Text>
            <ScrollView>
              {myFoods.map((food) => (
                <TouchableOpacity
                  key={food}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedFood(food);
                    setFoodDropdownVisible(false);
                  }}
                >
                  <Text style={[
                    styles.modalItemText,
                    selectedFood === food && styles.modalItemSelected,
                  ]}>
                    {food}
                  </Text>
                  {selectedFood === food && <Text style={styles.checkMark}>✓</Text>}
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
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dee2e6',
  },
  backButton: { fontSize: 24, fontWeight: 'bold', color: '#495057' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#495057' },
  body: { flex: 1, paddingHorizontal: 20 },
  photoBox: {
    marginTop: 20,
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dee2e6',
    backgroundColor: '#f1f3f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  photoImage: { width: 80, height: 80, borderRadius: 10 },
  photoIcon: { fontSize: 28 },
  section: { marginBottom: 24 },
  label: { fontSize: 15, fontWeight: 'bold', color: '#495057', marginBottom: 10 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    fontSize: 14,
    color: '#495057',
  },
  dropdownButton: {
    height: 48,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: { fontSize: 14, color: '#adb5bd' },
  dropdownArrow: { fontSize: 12, color: '#495057' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, gap: 8 },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f4fb',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: { fontSize: 13, color: '#495057' },
  tagClose: { fontSize: 12, color: '#adb5bd' },
  textarea: {
    height: 120,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#ffffff',
    fontSize: 14,
    color: '#495057',
    lineHeight: 22,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dee2e6',
    backgroundColor: '#ffffff',
  },
  chipSelected: { backgroundColor: '#495057', borderColor: '#495057' },
  chipText: { fontSize: 13, color: '#495057' },
  chipTextSelected: { color: '#ffffff' },
  submitButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    height: 52,
    backgroundColor: '#87CEEB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: { color: '#ffffff', fontSize: 17, fontWeight: 'bold' },
  overlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dee2e6',
  },
  modalItemText: { fontSize: 16, color: '#495057' },
  modalItemSelected: { color: '#87CEEB', fontWeight: 'bold' },
  checkMark: { fontSize: 16, color: '#87CEEB' },
  photoOptionRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  photoOption: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#f1f3f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  photoOptionIcon: { fontSize: 28, marginBottom: 4 },
  photoOptionLabel: { fontSize: 12, color: '#495057' },
});
