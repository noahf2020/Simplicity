import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import React,{useState, useEffect} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Feather } from '@expo/vector-icons'; 

import { getAllCategories } from '../helper/Categories';



export default function PersonalTask({task}) {
  const [Category, setCategory] = useState([])
console.log(Category)




useEffect( () => {
  async function fetchData() {
        let data = await getAllCategories()
        data.forEach(category => {
          if(category.name == task.category){
            setCategory(category)
          }
        })

  }
  fetchData()
  }, []);

  StylebigText = {
    "#FEF5D3": "#e8cb5f",
    "#DBECF6":"#58b6ed"
  }

    
  
  return (
    <Swipeable renderRightActions ={rightSwipeActions} >
      <View style={[styles.taskDiv,{backgroundColor:Category.color}]}>
        <View style={styles.Image}><Feather name={Category.image} size={20} color="#3d98cc" /></View>
        <View style={styles.Info}>
          <Text style={{fontSize:16, marginTop:10, fontWeight:'bold', color:StylebigText[Category.color]}}>{task.title}</Text>
          <Text style={{fontSize:13, color:StylebigText[Category.color]}}>{task.notes}</Text>
          <Text style={{fontSize:13, color:StylebigText[Category.color]}}>Date n Time</Text>
        </View>

      </View>



  </Swipeable>

  )



  
}



const styles = StyleSheet.create({

    taskDiv:{
        width:340,
        height:75,
        marginBottom:10,
        marginTop:20,
        borderRadius: 15,
        alignItems:'center',
        flexDirection: "row",

    },
    Image:{
      marginLeft:10,
      marginRight:10,
    },
    Info:{

      flexDirection: 'column',
      width:150,
      height:60
    }
})

const rightSwipeActions = () => {
  return (
    <View
      style={{
        backgroundColor: '#ff8303',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
    >
      <Text
        style={{
          color: '#1b1a17',
          paddingHorizontal: 10,
          fontWeight: '600',
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
      >
        Delete
      </Text>
    </View>
  );
};