import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform , Button} from 'react-native';
import React,{useState, useEffect, useRef, useMemo, useCallback} from 'react';

import PersonalTask from './Divs/PersonalTask';
export default function PersonalTaskList({tasks,click,deleteAction,completeAction}) {


  return (
    <FlatList data={tasks} showsVerticalScrollIndicator={false}
    renderItem={({item}) =>  
          <PersonalTask task={item} markAsFavorite={click} deleteB={deleteAction} completeTask={completeAction}/>
  }
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