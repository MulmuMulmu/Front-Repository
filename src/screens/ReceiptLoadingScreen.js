import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function ReceiptLoadingScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Fridge');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#87CEEB" />
      <Text style={styles.text}>영수증 분석중...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBF9FF',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#495057',
    fontWeight: 'bold',
  },
});