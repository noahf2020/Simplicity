import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar,ActivityIndicator, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import React,{useState, useEffect} from 'react';
export default function Assignments() {
  return (
        <View style={[styles.taskDiv,{backgroundColor:'#EDEDED', borderWidth:'thick', borderWidth:'1'}]}>
        <View style={styles.Info}>
          <Text numberOfLines={1} style={{fontSize:16, marginTop:5,  alignSelf:'center', fontWeight:'bold', }}>Hello</Text>
          <Text numberOfLines={1} style={{fontSize:16, marginTop:5, alignSelf:'center'}}>Hello</Text>
    
          </View>
       
      </View>
      )
    }
    
    
    const styles = StyleSheet.create({
      Info:{
        flexDirection: 'column',
        width:"100%",
        height:60,
     
    
      },
        taskDiv:{
            width:'100%',
            height:75,
            marginBottom:8,
            marginTop:8,
            borderRadius: 15,
            alignItems:'center',
            flexDirection: "row",
            overflow:"hidden",
         
    
        }})
