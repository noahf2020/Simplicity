import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar,ActivityIndicator, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import React,{useState, useEffect} from 'react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Course from './Course';
import ImageButton from './utils/Buttons/ImageButton'
import { getClasses } from '../helper/Canvas/Classes';

export default function Courses({backToNormal}) {
  const [courses, setcourses ] = useState([])
  const [isLoading, setLoading] = useState(false)
  useEffect( () => {
    setLoading(true)
    async function fetchData() {
        
          let data = await getClasses()
          console.log("Data Frin Coursews: " + data)
          setcourses(data.slice())
          setLoading(false)
    }
    
    fetchData()
    },[]);

  return (
    <>
           <KeyboardAvoidingView style={Styles.PopupContainer}  keyboardVerticalOffset={200} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
           <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={Styles.Nav}>
                        <ImageButton onPress={() =>backToNormal()}  source="arrowdown"  size={20} color={"#403572"}/> 
                        </View>            
                        </TouchableWithoutFeedback>
             
                        {isLoading ? <ActivityIndicator size="small"  /> :  <FlatList data={courses} showsVerticalScrollIndicator={false}  renderItem={({item}) =>   <Course course={item} color={Math.floor(Math.random()*16777215).toString(16)}/> }  keyExtractor={item => item.id}  style ={Styles.flatList} />   }

           </KeyboardAvoidingView>
    </>
  )
}


const Styles = StyleSheet.create({ 

    PopupContainer:{
        height:'95%',
        width:'100%',
        borderRadius:10,
        justifyContent: 'center',
  
     
    },
    Nav:{
        height:40,
        justifyContent:'center',
        flexDirection:'column',
        alignItems: 'flex-end',
        paddingRight:15
      },
      flatList:{
        backgroundColor:'white',
        width:'90%',
        borderRadius: 15,
      
        alignSelf:'center'
    },
})