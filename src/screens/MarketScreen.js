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
import { Ionicons } from '@expo/vector-icons';

const dummyPosts = [
  { id: 1, title: '양상추', description: '당일 구매했는데, 많아서...', image: null, distance: '0.9km' },
  { id: 2, title: '식빵', description: '유통기한이 오늘까지예요', image: null, distance: '1.2km' },
  { id: 3, title: '방울토마토', description: '반팩정도 있어요', image: null, distance: '2.4km' },
];

const urgentDummy = [
  { dday: 'D-1', items: ['감자', '시금치'] },
  { dday: 'D-2', items: ['감자', '시금치'] },
  { dday: 'D-3', items: ['감자', '시금치'] },
];

export default function MarketScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [writeVisible, setWriteVisible] = useState(false);
  const [urgentVisible, setUrgentVisible] = useState(false);
  const [location, setLocation] = useState('복정동');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>나눔</Text>
            {location && (
              <TouchableOpacity onPress={() => navigation.navigate('LocationSetting')}>
                <Text style={styles.location}>{location} ∨</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
            <Ionicons name="search-outline" size={20} color="#adb5bd" />
          </TouchableOpacity>
        </View>

        {searchVisible && (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="검색어를 입력하세요"
              placeholderTextColor="#adb5bd"
              value={search}
              onChangeText={setSearch}
            />
          </View>
        )}
      </View>

      {location === null ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>동네를 설정해주세요!</Text>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => navigation.navigate('LocationSetting')}
          >
            <Text style={styles.locationButtonText}>동네 설정하기</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.listContainer}>
          {dummyPosts.map((post) => (
            <TouchableOpacity
              key={post.id}
              style={styles.postCard}
              onPress={() => navigation.navigate('MarketDetail', { post })}
            >
              <View style={styles.postImage}>
                {post.image ? (
                  <Image source={{ uri: post.image }} style={styles.image} />
                ) : (
                  <Text style={styles.imageEmoji}>🥬</Text>
                )}
              </View>
              <View style={styles.postInfo}>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postDescription} numberOfLines={1}>
                  {post.description}
                </Text>
                <Text style={styles.postDistance}>{post.distance}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.writeButton}
        onPress={() => setWriteVisible(!writeVisible)}
      >
        <Text style={styles.writeButtonText}>+ 글쓰기</Text>
      </TouchableOpacity>

      {writeVisible && (
        <View style={styles.writePopupContainer}>
          <View style={styles.writePopup}>
            <TouchableOpacity
              style={styles.writePopupItem}
              onPress={() => {
                setWriteVisible(false);
                setUrgentVisible(true);
              }}
            >
              <Text style={styles.writePopupText}>임박 식재료</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.writePopupItem, { borderBottomWidth: 0 }]}
              onPress={() => {
                setWriteVisible(false);
                navigation.navigate('MarketWrite');
              }}
            >
              <Text style={styles.writePopupText}>나눔하기</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.writeCloseButton}
            onPress={() => setWriteVisible(false)}
          >
            <Text style={styles.writeCloseButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {urgentVisible && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setUrgentVisible(false)}
        >
          <View style={styles.urgentModal}>
            <View style={styles.urgentModalHeader}>
              <Text style={styles.urgentModalTitle}>임박 식재료</Text>
              <TouchableOpacity onPress={() => setUrgentVisible(false)}>
                <Text style={styles.urgentModalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {urgentDummy.map((group) => (
                <View key={group.dday}>
                  <Text style={styles.urgentDday}>{group.dday}</Text>
                  {group.items.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.urgentItem}
                      onPress={() => {
                        setUrgentVisible(false);
                        navigation.navigate('MarketWrite', { item });
                      }}
                    >
                      <Text style={styles.urgentItemText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dee2e6',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#495057',
  },
  location: {
    fontSize: 18,
    color: '#495057',
    marginTop: 8,
  },
  searchIcon: {
    fontSize: 22,
    marginTop: 25,
  },
  searchContainer: {
    marginTop: 12,
    backgroundColor: '#f1f3f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 44,
    justifyContent: 'center',
  },
  searchInput: {
    fontSize: 14,
    color: '#495057',
  },
  listContainer: {
    flex: 1,
  },
  postCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dee2e6',
  },
  postImage: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: '#f1f3f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 8,
  },
  imageEmoji: {
    fontSize: 32,
  },
  postInfo: {
    flex: 1,
  },
  postTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 6,
  },
  postDescription: {
    fontSize: 14,
    color: '#adb5bd',
    marginBottom: 6,
  },
  postDistance: {
    fontSize: 13,
    color: '#adb5bd',
    textAlign: 'right',
  },
  writeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#87CEEB',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,

  },
  writeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  writePopupContainer: {
    position: 'absolute',
    bottom: 75,
    right: 20,
    alignItems: 'center',
  },
  writePopup: {
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
  writePopupItem: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dee2e6',
  },
  writePopupText: {
    fontSize: 15,
    color: '#495057',
    textAlign: 'center',
  },
  writeCloseButton: {
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
  writeCloseButtonText: {
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
    justifyContent: 'center',
  },
  urgentModal: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 24,
    maxHeight: 500,
  },
  urgentModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  urgentModalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
  },
  urgentModalClose: {
    fontSize: 16,
    color: '#495057',
  },
  urgentDday: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginTop: 8,
    marginBottom: 4,
  },
  urgentItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dee2e6',
  },
  urgentItemText: {
    fontSize: 15,
    color: '#495057',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 16,
  },
  locationButton: {
    backgroundColor: '#87CEEB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  locationButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});