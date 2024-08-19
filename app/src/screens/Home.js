import { StatusBar } from 'expo-status-bar';
import {SafeAreaView,View,FlatList,StyleSheet, Text, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform , Button} from 'react-native';
import React,{useState, useEffect, useRef, useMemo, useCallback} from 'react';
import PersonalTaskList from '../components/Lists/PersonalTaskList'
import { deleteTasks, getAllTasks, markAsFavorite, completeTask } from '../helper/Tasks';
import { GestureHandlerRootView, GestureDetector, Gesture, Directions} from 'react-native-gesture-handler';
import CanvasList from '../components/Lists/CanvasList';
import { getAssignments } from '../helper/Canvas/Classes';
import Assignments from '../components/Lists/Divs/Assignments'
import PersonalTask from '../components/Lists/Divs/PersonalTask'

import {schedulePushNotification} from '../helper/Not';




export default function Home() {



  const [isCreateTaskPopup, setCreateTaskPopup] = useState(false)
  const [isCreateCategory, setCreateCategory] = useState(false)
  const [tasks, setTasks] = useState([])
  const [BTnClick, setBtnClick] = useState(1)
  const [isViewCats,setViewCats] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [refresh, setRefresh] = useState(false)
  



 



  useEffect( () => {
    async function fetchData() {
          let data = await getAllTasks()
          setTasks(data.slice())
          let data3 = await getAssignments()
          setAssignments(data3.slice())
          setRefresh(false)
       
    }
    
    fetchData()
    }, [refresh]);

    const renderItem = ({ item }) => {
      if (item.category) {
        return <PersonalTask task={item} markAsFavorite={click} deleteB={deleteAction} completeTask={completeAction}/>  ;
      } else {
        return <Assignments assignment={item} />;
      }
    };

    const click = async (id) =>{
      await  markAsFavorite(id)
       await setBtnClick(BTnClick+1)
     }
     const deleteAction = async (id) => {
       await deleteTasks(id)
       await setBtnClick(BTnClick+1)
   
     }
     const completeAction = async (task) => {
       await completeTask(task)
       await setBtnClick(BTnClick+1)
     }
     let combinedList = [ ...assignments,...tasks,]
     
     combinedList.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <>
        
          <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{    backgroundColor: '#fff',}}>
                <Text adjustsFontSizeToFit style={{fontWeight:'600',fontSize:20,marginLeft:'10%'}}>Welcome | Tasks: {combinedList.length} </Text>

            </View>

          <SafeAreaView  style={styles.container}>
    
            <FlatList showsVerticalScrollIndicator={false}
                    data={combinedList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    onRefresh={()=>{setRefresh(true)}}
                    refreshing={refresh}
                    style ={styles.NewJAwn}
                  />

         < StatusBar />
    
        </SafeAreaView>
        </GestureHandlerRootView>
        </>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
        }
    },
    NewJAwn:{
      backgroundColor:'white',
      width:'90%',
      borderRadius: 15,
      maxHeight:'84%',
      overflow:'scroll'
      
  },
  });