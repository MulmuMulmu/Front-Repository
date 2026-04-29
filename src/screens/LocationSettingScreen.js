import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function LocationSettingScreen({ navigation }) {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>＜</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="동네 이름으로 검색"
            placeholderTextColor="#adb5bd"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={styles.clearButton}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.locationButton}>
          <Text style={styles.locationButtonText}>현재 위치로 찾기</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'center',
    gap: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#495057',
  },
  clearButton: {
    fontSize: 14,
    color: '#adb5bd',
  },
  locationButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#87CEEB',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});