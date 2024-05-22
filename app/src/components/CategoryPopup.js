import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar,ActivityIndicator, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import React,{useState, useEffect} from 'react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Course from './Course';
import ImageButton from './utils/Buttons/ImageButton'
import { getAllCategories } from '../helper/Categories';
import Category from './Category';
import { AntDesign, FontAwesome5, Ionicons,Feather   } from '@expo/vector-icons'; 
import {deleteCategory} from '../helper/Categories'
export default function CategoryPopup({ backToNormal}) {
    const [categories, setcategories ] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [BTnClick, setBtnClick] = useState(1)

    const deleteCat = async (id) => {
      await deleteCategory(id)
      await setBtnClick(BTnClick+1)
  
    }
    useEffect( () => {
        setLoading(true)
        async function fetchData() {
            
              let data = await getAllCategories()
           //   console.log("Data Frin Coursews: " + data)
              setcategories(data.slice())
              console.log(data)

              setLoading(false)
        }
        
        fetchData()
        },[BTnClick]);
  return (
    <KeyboardAvoidingView style={Styles.PopupContainer}  keyboardVerticalOffset={200} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                 <View style={Styles.Nav}>
                 <ImageButton onPress={() =>backToNormal()}  source="arrowdown"  size={20} color={"#403572"}/> 
                 </View>            
                 </TouchableWithoutFeedback>
      
                 {isLoading ? <ActivityIndicator size="small"  /> :  <FlatList data={categories} showsVerticalScrollIndicator={false}  renderItem={({item}) =>  
                 
                 <Category deleteCate={deleteCat} cat={item}/>
                  
                  
                  }  keyExtractor={item => item.id}  style ={Styles.flatList} />   }

    </KeyboardAvoidingView>
  )
}

const Styles = StyleSheet.create({
  containeer: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F6F6F6',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    borderRadius:20,
    backgroundColor:'#F6F6F6',
    justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,

  },
  PopupContainer:{
    height:'100%',
    width:360,
    borderRadius:10,
 
},
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
  }})