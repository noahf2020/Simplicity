import {SafeAreaView,View,ActivityIndicator,FlatList,StyleSheet, Text,StatusBar, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import deleReact,{useState, useEffect} from 'react';


export default function Course({course, color}) {
 

  return (
    <View style={[styles.taskDiv,{backgroundColor:'#EDEDED', borderWidth:'thick',borderColor: "#"+ color, borderWidth:'1'}]}>
    <View style={styles.Info}>
      <Text numberOfLines={1} style={{fontSize:16, marginTop:5,  alignSelf:'center', fontWeight:'bold', }}>{course.name}</Text>
      <Text numberOfLines={1} style={{fontSize:16, marginTop:5, alignSelf:'center'}}>{course.grade + "%"}</Text>

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