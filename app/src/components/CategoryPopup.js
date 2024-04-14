import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar,ActivityIndicator, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import React,{useState, useEffect} from 'react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Course from './Course';
import ImageButton from './utils/Buttons/ImageButton'
import { getAllCategories } from '../helper/Categories';


export default function CategoryPopup({backToNormal}) {
    const [categories, setcategories ] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect( () => {
        setLoading(true)
        async function fetchData() {
            
              let data = await getAllCategories()
              console.log("Data Frin Coursews: " + data)
              setcategories(data.slice())
              setLoading(false)
        }
        
        fetchData()
        },[]);
  return (
    <KeyboardAvoidingView style={Styles.PopupContainer}  keyboardVerticalOffset={200} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                 <View style={Styles.Nav}>
                 <ImageButton onPress={() =>backToNormal()}  source="arrowdown"  size={20} color={"#403572"}/> 
                 </View>            
                 </TouchableWithoutFeedback>
      
                 {isLoading ? <ActivityIndicator size="small"  /> :  <FlatList data={categories} showsVerticalScrollIndicator={false}  renderItem={({item}) =>   <Text>Hello</Text> }  keyExtractor={item => item.id}  style ={Styles.flatList} />   }

    </KeyboardAvoidingView>
  )
}
