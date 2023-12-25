import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import deleReact,{useState, useEffect} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Feather } from '@expo/vector-icons'; 
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getAllCategories } from '../helper/Categories';
import ImageButton from '../components/utils/Buttons/ImageButton'



export default function PersonalTask({task,markAsFavorite }) {

  const rightSwipeActions = () => {
    return (
      <View style={{ backgroundColor:"green", alignItems:'center',  flexDirection:'row', height:75, marginTop:20, width:135, borderRadius: 15, marginLeft:10  }}>
          <View style={{width:45, backgroundColor:"#FF7F7F", height:75, justifyContent:'center', borderTopLeftRadius:15, borderBottomLeftRadius:15}}>
          <ImageButton onPress={() => console.log("Delete")}  source="delete"  size={20} color={"#403572"}/> 
          </View>
          <View style={{width:45, backgroundColor:"#B0E3FF", justifyContent:'center', height:75}}>
          <ImageButton onPress={() => markAsFavorite(task.id)}  source="hearto"  size={20} color={"#403572"}/> 
          </View>
          <View style={{width:45, backgroundColor:"#86FFA1", height:75, justifyContent:'center', borderTopRightRadius:15, borderBottomRightRadius:15}}>
          <ImageButton onPress={() => console.log(getAuth())}  source="checkcircleo"  size={20} color={"#403572"}/> 

          </View>
      </View>
    );
  };

  
  
  
  
  
  
  
  
  const [Category, setCategory] = useState([])
  const [swipeOpen, setSwipe] = useState(false)

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


const onSwipeOpen = () =>{
  setSwipe(true)
}

const onSwipeClose = () =>{
  setSwipe(false)
}
  StylebigText = {
    "#FEF5D3": "#e8cb5f",//yellow
    "#DBECF6":"#58b6ed"//blue
  }

  styleImage = {
    "#FEF5D3": "#ebcc59", //yellow
    "#DBECF6": "#3d98cc", //blue
  }

  
  return (
    <Swipeable renderRightActions ={rightSwipeActions} onSwipeableWillOpen={onSwipeOpen} onSwipeableWillClose={onSwipeClose}>

  {!swipeOpen &&
      <View style={[styles.taskDiv,{backgroundColor:Category.color}]}>
        <View style={styles.Image}><Feather name={Category.image} size={20} color={styleImage[Category.color]} /></View>
        <View style={styles.Info}>
          <Text style={{fontSize:16, marginTop:10, fontWeight:'bold', color:StylebigText[Category.color]}}>{task.title}</Text>
          <Text style={{fontSize:13, color:StylebigText[Category.color]}}>{task.notes}</Text>
          <Text style={{fontSize:13, color:StylebigText[Category.color]}}>{new Date(task.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + " @ " + new Date(`2000-01-01T${task.time}:00Z`).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
        </View>
      </View>
   }
   {swipeOpen && 
    <View style={[styles.taskDiv,{backgroundColor:Category.color, width:187, marginLeft:150}]}>
          <View style={[styles.Image,{paddingTop:5}]}><Feather name={Category.image} size={20} color={styleImage[Category.color]} /></View>
          <Text style={{fontSize:14, marginTop:5, fontWeight:'bold', marginLeft:5, color:StylebigText[Category.color]}}>{task.title}</Text>


    </View>
   }


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

