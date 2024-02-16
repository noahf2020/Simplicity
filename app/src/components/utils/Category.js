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
import { AntDesign, FontAwesome5, Ionicons,Feather   } from '@expo/vector-icons'; 


export default function Category({category, setIsAlraedySelected, isAlreadySelected, setCategory}) {
    const [isPressed, setPressed] = useState(false)
    IconManager = {
      "calendar": <AntDesign name={'calendar'} size={24} color="#4A3780"  />,//yellow
      "clipboard-list":<FontAwesome5 name={'clipboard-list'} size={24} color="#4A3780"  />,//blue
      "school-outline":<Ionicons name={'school-outline'} size={24} color="#4A3780"  />,//blue
      "home-outline":<Ionicons name={'home-outline'} size={24} color="#4A3780"  />//blue

    }
  
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
                {IconManager[category.image]}
            </Pressable>
  )
}
