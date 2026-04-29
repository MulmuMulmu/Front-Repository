import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = ['전체', '정육/계란', '해산물', '채소/과일', '유제품', '쌀/면/빵', '소스/조미료/오일', '가공식품', '기타'];

const getDdayColor = (dday) => {
  const day = parseInt(dday.replace('D-', ''));
  if (day <= 3) return '#FF6B6B';
  if (day <= 7) return '#FFB347';
  return '#87CEEB';
};

export default function FridgeScreen({ navigation }) {
  const dummyData = [
  { id: 1, name: '시금치', status: '미사용', dday: 'D-1', date: '26.04.02', category: '채소/과일' },
  { id: 2, name: '돼지고기', status: '미사용', dday: 'D-1', date: '26.04.02', category: '정육/계란' },
  { id: 3, name: '고등어', status: '미사용', dday: 'D-5', date: '26.04.06', category: '해산물' },
];

// 테스트할 때 [] 로 바꾸고 확인 후 dummyData 로 원복
const [items, setItems] = useState(dummyData);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [sortVisible, setSortVisible] = useState(false);
  const [sortType, setSortType] = useState('날짜순');
  const [addVisible, setAddVisible] = useState(false);

  const toggleCategory = (cat) => {
    if (cat === '전체') {
      setSelectedCategories([]);
      return;
    }
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const filteredData = selectedCategories.length === 0
    ? items
    : items.filter(item => selectedCategories.includes(item.category));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>내 식자재</Text>
        <Text style={styles.subtitle}>소비기한이 3일 이내 식자재가 3개 있어요!</Text>

        <View style={styles.filterRow}>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setSortVisible(true)}
          >
            <Text style={styles.sortButtonText}>{sortType} ∨</Text>
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  (cat === '전체' && selectedCategories.length === 0) ||
                  selectedCategories.includes(cat)
                    ? styles.categoryButtonSelected
                    : null,
                ]}
                onPress={() => toggleCategory(cat)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  (cat === '전체' && selectedCategories.length === 0) ||
                  selectedCategories.includes(cat)
                    ? styles.categoryButtonTextSelected
                    : null,
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="검색어를 입력하세요"
            placeholderTextColor="#adb5bd"
            value={search}
            onChangeText={setSearch}
          />
          <Ionicons name="search-outline" size={20} color="#adb5bd" />
        </View>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>등록된 재료가 없어요.</Text>
          <Text style={styles.emptySubText}>{'\'추가\' 버튼을 눌러\n재료를 추가해 주세요.'}</Text>
        </View>
      ) : (
        <ScrollView style={styles.listContainer}>
          {filteredData.map((item) => (
            <TouchableOpacity key={item.id} style={styles.itemCard}>
              <View style={styles.itemImageContainer}>
                <Text style={styles.itemEmoji}>🥬</Text>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemStatus}>{item.status}</Text>
              </View>
              <View style={styles.itemRight}>
                <View style={[styles.ddayBadge, { backgroundColor: getDdayColor(item.dday) }]}>
                  <Text style={styles.ddayText}>{item.dday}</Text>
                </View>
                <Text style={styles.itemDate}>{item.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAddVisible(!addVisible)}
      >
        <Text style={styles.addButtonText}>+ 추가</Text>
      </TouchableOpacity>

      {addVisible && (
        <View style={styles.addPopupContainer}>
          <View style={styles.addPopup}>
            <TouchableOpacity
              style={styles.addPopupItem}
              onPress={() => {
                setAddVisible(false);
                navigation.navigate('DirectInput');
              }}
            >
              <Text style={styles.addPopupText}>직접 입력</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addPopupItem}
              onPress={() => {
                setAddVisible(false);
                navigation.navigate('ReceiptGallery');
              }}
            >
              <Text style={styles.addPopupText}>영수증 등록</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addPopupItem, { borderBottomWidth: 0 }]}
              onPress={() => {
                setAddVisible(false);
                navigation.navigate('ReceiptCamera');
              }}
            >
              <Text style={styles.addPopupText}>영수증 촬영</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.addCloseButton}
            onPress={() => setAddVisible(false)}
          >
            <Text style={styles.addCloseButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {sortVisible && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setSortVisible(false)}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>정렬</Text>
            {['날짜순(오름차순)', '날짜순(내림차순)', '이름순(오름차순)', '이름순(내림차순)'].map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.modalItem}
                onPress={() => {
                  setSortType(type);
                  setSortVisible(false);
                }}
              >
                <Text style={[
                  styles.modalItemText,
                  sortType === type && styles.modalItemTextSelected,
                ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 12,
    backgroundColor: '#FBF9FF',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#FF6B6B',
    backgroundColor: '#FFE8E8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 14,
    overflow: 'hidden',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dee2e6',
    backgroundColor: '#ffffff',
  },
  sortButtonText: {
    fontSize: 13,
    color: '#495057',
  },
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dee2e6',
    backgroundColor: '#ffffff',
    marginRight: 6,
  },
  categoryButtonSelected: {
    backgroundColor: '#87CEEB',
    borderColor: '#87CEEB',
  },
  categoryButtonText: {
    fontSize: 13,
    color: '#495057',
  },
  categoryButtonTextSelected: {
    color: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#495057',
  },
  searchIcon: {
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  emptyContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
     marginTop: -150,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#adb5bd',
    textAlign: 'center',
    lineHeight: 22,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: '#dee2e6',
  },
  itemImageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f3f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemEmoji: {
    fontSize: 24,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 4,
  },
  itemStatus: {
    fontSize: 13,
    color: '#adb5bd',
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  ddayBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 4,
  },
  ddayText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  itemDate: {
    fontSize: 12,
    color: '#adb5bd',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#87CEEB',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addPopupContainer: {
    position: 'absolute',
    bottom: 75,
    right: 20,
    alignItems: 'center',
  },
  addPopup: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    minWidth: 120,
  },
  addPopupItem: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dee2e6',
  },
  addPopupText: {
    fontSize: 15,
    color: '#495057',
    textAlign: 'center',
  },
  addCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  addCloseButtonText: {
    fontSize: 16,
    color: '#495057',
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