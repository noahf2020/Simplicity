import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform , Button} from 'react-native';
import React,{useState, useEffect, useRef, useMemo, useCallback} from 'react';
import Assignments from './Divs/Assignments';

export default function CanvasList({assignments,setRefresh,refresh}) {
  return (
    <FlatList data={assignments} showsVerticalScrollIndicator={false}
    renderItem={({item}) =>  <Assignments assignment={item} /> }
    onRefresh={()=>{setRefresh(true)}}
    refreshing={refresh}
    keyExtractor={item => item.id}
    style ={styles.NewJAwn}
/> 
  )
}

const styles = StyleSheet.create({
    NewJAwn:{
        backgroundColor:'white',
        width:'90%',
        borderRadius: 15,
        maxHeight:'93%'
    }})
