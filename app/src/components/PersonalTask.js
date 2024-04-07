import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import deleReact,{useState, useEffect} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { AntDesign, FontAwesome5, Ionicons,Feather   } from '@expo/vector-icons'; 
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getAllCategories } from '../helper/Categories';
import ImageButton from '../components/utils/Buttons/ImageButton'
import { Badge } from '@rneui/themed';




export default function PersonalTask({task,markAsFavorite, deleteB, completeTask}) {
  const rightSwipeActions = () => {
    return (
      <View style={{ backgroundColor:"white", alignItems:'center', justifyContent:'center', flexDirection:'row', height:75, marginTop:8, width:"40%", borderRadius: 15, marginLeft:10  }}>
          <View style={{width:45, backgroundColor:"#FF7F7F", height:75, justifyContent:'center', borderTopLeftRadius:15, borderBottomLeftRadius:15}}>
          <ImageButton onPress={() => deleteB(task.id)}  source="delete"  size={20} color={"#403572"}/> 
          </View>
          <View style={{width:45, backgroundColor:"#B0E3FF", justifyContent:'center', height:75}}>
          <ImageButton onPress={() => markAsFavorite(task.id)}  source={task.favorite? "heart" :"hearto"}  size={20} color={"#403572"}/> 
          </View>
          <View style={{width:45, backgroundColor:"#86FFA1", height:75, justifyContent:'center', borderTopRightRadius:15, borderBottomRightRadius:15}}>
          <ImageButton onPress={() => completeTask(task)}  source="checkcircleo"  size={20} color={"#403572"}/> 

          </View>
      </View>
    );
  };


  const [Category, setCategory] = useState([])
  const [swipeOpen, setSwipe] = useState(false)

useEffect( () => {
  console.log(" task.time" + task.time)
  console.log(" task.date" + task.date)

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
    "#DBECF6":"#58b6ed",//blue
    "#cac0fa":"#7569b8"
  }

  styleImage = {
    "#FEF5D3": "#ebcc59", //yellow
    "#DBECF6": "#3d98cc", //blue
    "#cac0fa":"#7569b8"
  }

  IconManager = {
    "calendar": <AntDesign name={'calendar'} size={20} color={styleImage[Category.color]}  />,//yellow
    "clipboard-list":<FontAwesome5 name={'clipboard-list'} size={20}  color={styleImage[Category.color]} />,//blue
    "school-outline":<Ionicons name={'school-outline'} size={20}  color={styleImage[Category.color]}  />,//blue
    "home-outline":<Ionicons name={'home-outline'} size={20}  color={styleImage[Category.color]}  />//blue

  }
  return (
    <Swipeable renderRightActions ={rightSwipeActions} onSwipeableWillOpen={onSwipeOpen} onSwipeableWillClose={onSwipeClose}>

  {!swipeOpen &&
      <View style={[styles.taskDiv,{backgroundColor:Category.color, borderColor:styleImage[Category.color], borderWidth:'1'}]}>
        <View style={styles.Image}>{IconManager[Category.image]}</View>
        <View style={styles.Info}>
          <Text numberOfLines={1} style={{fontSize:16, marginTop:5, fontWeight:'bold', color:StylebigText[Category.color]}}>{task.title}</Text>
          <Text numberOfLines={1} style={{fontSize:13, color:StylebigText[Category.color]}}>{task.notes}</Text>
          <Text style={{fontSize:13, color:StylebigText[Category.color]}}>{new Date(task.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + " @ " + new Date(`2000-01-01T${task.time}:00Z`).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
        </View>

        {task.favorite && 
        <>
        <Badge
            status="primary"
            containerStyle={{ position: 'absolute', top: '10%', left: "95%" }}
          /> 
        
        </>
       }
       
      </View>
   }
   {/* This margin below could be causing bugs on other devices make sure to fix this noah */}
   {swipeOpen && 
    <View style={[styles.taskDiv,{ backgroundColor:Category.color, width:"60%", marginLeft:165}]}>
          <View style={[styles.Image,{paddingTop:5}]}>{IconManager[Category.image]}</View>
          <Text  ellipsizeMode='tail' numberOfLines={1} style={{fontSize:14,   width:"85%", marginTop:5, fontWeight:'bold', marginLeft:5, color:StylebigText[Category.color]}}>{task.title}</Text>
        
          {task.favorite && 
        <>
        <Badge
            status="primary"
            containerStyle={{ position: 'absolute', top: '10%', left: "90%" }}
          /> 
        
        </>
       }
    </View>
   }


  </Swipeable>

  )



  
}



const styles = StyleSheet.create({

    taskDiv:{
        width:'100%',
        height:75,
        marginBottom:8,
        marginTop:8,
        borderRadius: 15,
        alignItems:'center',
        flexDirection: "row",
        overflow:"hidden",
     

    },
    Image:{
      marginLeft:10,
      marginRight:10,
    },
    Info:{
      flexDirection: 'column',
      width:"85%",
      height:60,
   

    }
})

