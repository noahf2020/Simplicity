import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar,ActivityIndicator, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import React,{useState, useEffect} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ImageButton from '../../utils/Buttons/ImageButton'

export default function Assignments({assignment}) {
  const formattedDateTime = new Date(assignment.date).toLocaleString('en-US', {month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', hour12:true, timeZone:'UTC'}).replace(/\/|,|:| /g,',').split(',');

  const [swipeOpen, setSwipe] = useState(false)

  const onSwipeOpen = () =>{
    setSwipe(true)
  }
  
  const onSwipeClose = () =>{
    setSwipe(false)
  }
  const rightSwipeActions = () => {
    return (
      <View style={{ backgroundColor:"white", alignItems:'center', justifyContent:'center', flexDirection:'row', height:75, marginTop:8, width:"40%", borderRadius: 15, marginLeft:10  }}>
          <View style={{width:45, backgroundColor:"#FF7F7F", height:75, justifyContent:'center', borderTopLeftRadius:15, borderBottomLeftRadius:15}}>
          <ImageButton onPress={() => console.log('testing')}  source="delete"  size={20} color={"#403572"}/> 
          </View>
          <View style={{width:45, backgroundColor:"#B0E3FF", justifyContent:'center', height:75}}>
          <ImageButton onPress={() => console.log('testing')}  source={"hearto"}  size={20} color={"#403572"}/> 
          </View>
          <View style={{width:45, backgroundColor:"#86FFA1", height:75, justifyContent:'center', borderTopRightRadius:15, borderBottomRightRadius:15}}>
          <ImageButton onPress={() => console.log('testing')}  source="checkcircleo"  size={20} color={"#403572"}/> 

          </View>
      </View>
    );
  };




  return (
    <Swipeable renderRightActions ={rightSwipeActions} onSwipeableWillOpen={onSwipeOpen} onSwipeableWillClose={onSwipeClose}>

{!swipeOpen &&
        <View style={[styles.taskDiv,{backgroundColor:'#EDEDED', borderWidth:'thick', borderWidth:'1'}]}>
        <View style={styles.Info}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={{ marginTop:5,  alignSelf:'center', fontWeight:'bold', }}>{assignment.course}</Text>
          <Text numberOfLines={1} style={{fontSize:16, marginTop:5, alignSelf:'center'}}>{assignment.title}</Text>
          <Text numberOfLines={1} style={{fontSize:16, alignSelf:'center'}}>{assignment.points?assignment.points: "0" } Points | Due: {`${formattedDateTime[0]}/${formattedDateTime[1]} @ ${formattedDateTime[3]}:${formattedDateTime[4]}`}</Text>
    
          </View>
       
      </View>
}
{swipeOpen && 
      <View style={[styles.taskDiv,{borderWidth:'1', backgroundColor:'#EDEDED', width:"60%", marginLeft:'43%'}]}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={{ marginTop:5,  alignSelf:'center', fontWeight:'bold', }}>{assignment.course}</Text>
               <Text numberOfLines={1} style={{fontSize:16, marginTop:5, alignSelf:'center'}}>{assignment.title}</Text>
          <Text numberOfLines={1} style={{fontSize:16, alignSelf:'center'}}>{assignment.points?assignment.points: "0" } Points | Due: {`${formattedDateTime[0]}/${formattedDateTime[1]} @ ${formattedDateTime[3]}:${formattedDateTime[4]}`}</Text>
    
    </View>
   }


  </Swipeable>

      )
    }
    
    
    const styles = StyleSheet.create({
      Info:{
        flexDirection: 'column',
        width:"90%",
        marginRight:'5%',
        marginLeft:'5%',
        height:60,
        height:'90%',
        overflow:'hidden',
    
      },
        taskDiv:{
            width:'100%',
            height:75,
            marginBottom:8,
            marginTop:8,
            borderRadius: 15,
            alignItems:'center',
            flexDirection: "row",
            overflow:"hidden",
         
    
        }})
