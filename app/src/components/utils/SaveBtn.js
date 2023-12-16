import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform,Button } from 'react-native';
import React,{useState, useEffect} from 'react';


export default function SaveBtn() {
  return (
        <Button 
        style={{width:220, height:56, backgroundColor:'#86FFA1'}}
        title="Save"
        color="#00A525"
        />
  )
}
