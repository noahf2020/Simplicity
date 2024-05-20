import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar,ActivityIndicator, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import React,{useState, useEffect} from 'react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { AntDesign, FontAwesome5, Ionicons,Feather   } from '@expo/vector-icons'; 
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ImageButton from './utils/Buttons/ImageButton'
import {deleteCategory} from '../helper/Categories'
export default function Category({cat}) {
    const [swipeOpen, setSwipe] = useState(false);


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

      const rightSwipeActions = () => {
        return (
          <View style={{ backgroundColor:"white", alignItems:'center', justifyContent:'center', flexDirection:'row', height:75, marginTop:8, width:"40%", borderRadius: 15, marginLeft:10  }}>
              <View style={{width:'90%', backgroundColor:"#FF7F7F", height:75, justifyContent:'center', borderRadius:15}}>
              <ImageButton onPress={() => deleteCategory(cat.id)}  source="delete"  size={22} color={"#403572"}/> 
              </View>
        
          </View>
        );
      };

  return (
    <Swipeable renderRightActions ={rightSwipeActions} onSwipeableWillOpen={onSwipeOpen} onSwipeableWillClose={onSwipeClose}>

{!swipeOpen &&
    <View style={[styles.taskDiv,{backgroundColor:cat.color, borderWidth:'1'},{borderColor:styleImage[cat.color]}]}> 
    <View style={styles.Info}>
      <Text numberOfLines={1} adjustsFontSizeToFit style={{fontSize:16, alignSelf:'center', marginTop:5, fontWeight:'bold', color:StylebigText[cat.color]}}>{cat.name}</Text>
    <View style={styles.Image}>{IconManager[cat.image]}</View>
    </View>
    </View>
}
{swipeOpen && 
<>
<View style={[styles.taskDiv,{borderWidth:'1',borderColor:styleImage[cat.color], backgroundColor:cat.color, width:"60%", marginLeft:'43%'}]}>
          <View style={[styles.Image,{paddingTop:5}]}>{IconManager[cat.image]}</View>
          <Text  ellipsizeMode='tail'adjustsFontSizeToFit numberOfLines={1} style={{fontSize:14,   width:"85%", marginTop:5, fontWeight:'bold', marginLeft:5, color:StylebigText[cat.color]}}>{cat.name}</Text>
</View>
</>
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
      alignSelf:'center',
      justifyContent:'center',
    },
    Info:{
      flexDirection: 'column',
      width:"100%",
      height:60,
   

    }
})


