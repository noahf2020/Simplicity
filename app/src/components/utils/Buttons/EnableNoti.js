import React from 'react'
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Pressable,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    Switch
  } from 'react-native';

import {useState, useEffect} from 'react';



export default function EnableNoti({isEnabled,setIsEnabled}) {

    const toggleSwitch = () => setIsEnabled(!isEnabled);
  
  return (
  <View style={{backgroundColor: '#EEEEEE', height:43, width:297, borderRadius:15, justifyContent:'space-between', flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center'}}>
    <Text style={{color:'#4A4A4B', fontSize:11}}>Enable notifications for this task</Text>
    <Switch
        trackColor={{false: '#767577', true: '#403572'}}
        thumbColor={isEnabled ? '#FFFFF' : '#f4f3f4'}
       
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
  </View>
  )
}
