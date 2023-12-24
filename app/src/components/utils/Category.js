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
    Platform
  } from 'react-native';

import {useState, useEffect} from 'react';
import { Feather } from '@expo/vector-icons'; 

export default function Category({category, setIsAlraedySelected, isAlreadySelected, setCategory}) {
    const [isPressed, setPressed] = useState(false)

  return (
             <Pressable  onPress={()=>
       
              {
                setIsAlraedySelected(true)

                if(!isAlreadySelected){
                  setPressed(!isPressed) 
                  console.log("Selected Catrogy: " + category.name)
                  setCategory(category.name)
                  
                }else if(isPressed == true){
                  setPressed(false)
                  setIsAlraedySelected(false)
                  setCategory("")
                }else{
                  console.log("Category Already Selected")

                }
                
              }}
          
             
             
               style={[{height:35,width:35,backgroundColor:category.color,borderRadius:10, justifyContent:'center',alignItems:'center',borderWidth:2 }, isPressed ? {borderColor:'grey'} : {borderColor:'white'} ]}>
                <Feather name={category.image} size={20} color="#4A3780" />
            </Pressable>
  )
}
