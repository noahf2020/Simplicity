import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform,Button } from 'react-native';
import React,{useState, useEffect} from 'react';


export default function SaveBtn({checkForValidFields}) {
  return (
    <>
        <Pressable  onPress={() => {
       //   console.log("saved BTN Pressed")
          checkForValidFields()
        }} style={styles.btn}><Text style={styles.txt}>Save</Text></Pressable>
  </>
  )
}
const styles = StyleSheet.create({ 
    btn:{
        width: 288,
        height: 56,
        backgroundColor:'#86FFA1',
        borderRadius:15,
        padding: 10,
        justifyContent:'center',
        alignItems:'center',
        
       
    },
    txt:{
        color:'#00A525',
        fontWeight:'bold',
        fontSize: 16
    }
})