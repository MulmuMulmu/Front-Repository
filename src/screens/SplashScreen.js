import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.appName}>물무물무</Text>
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
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495057',
  },
});