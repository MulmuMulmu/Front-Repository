import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FridgeNavigator from './FridgeNavigator';
import MarketNavigator from './MarketNavigator';
import RecipeNavigator from './RecipeNavigator';
import ChatNavigator from './ChatNavigator';
import MyInfoNavigator from './MyInfoNavigator';


const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#87CEEB',
        tabBarInactiveTintColor: '#adb5bd',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#dee2e6',
          height: 100,
          paddingBottom: 16,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
    >
      <Tab.Screen
        name="내 식자재"
        component={FridgeNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/fridge.png')}
              style={{ width: 24, height: 24, tintColor: focused ? '#87CEEB' : '#adb5bd' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="나눔"
        component={MarketNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/market.png')}
              style={{ width: 24, height: 24, tintColor: focused ? '#87CEEB' : '#adb5bd' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="레시피"
        component={RecipeNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/recipe.png')}
              style={{ width: 24, height: 24, tintColor: focused ? '#87CEEB' : '#adb5bd' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="채팅"
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/chat.png')}
              style={{ width: 24, height: 24, tintColor: focused ? '#87CEEB' : '#adb5bd' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="내 정보"
        component={MyInfoNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/info.png')}
              style={{ width: 24, height: 24, tintColor: focused ? '#87CEEB' : '#adb5bd' }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}