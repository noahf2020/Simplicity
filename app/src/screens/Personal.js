import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform , Animated,} from 'react-native';
import React,{useState, useEffect} from 'react';
import { BlurView } from 'expo-blur';

import PageHeader  from '../components/utils/PageHeader'
import PersonalTask from '../components/PersonalTask';
import ImageButton from '../components/utils/Buttons/ImageButton'
import ChoiceSelector from '../components/ChoiceSelector';
import TaskPopup from '../components/CreateTaskPopup';
import CreateCategoryPopup from '../components/CreateCategoryPopup';


import { getAllTasks, markAsFavorite } from '../helper/Tasks';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



export default function Personal() {

  const [isBlurred, setBlurr] = useState(false);
  const [isPlusBtnShown, setPlusBtn] = useState(true)
  const [isCreateTaskPopup, setCreateTaskPopup] = useState(false)
  const [isCreateCategory, setCreateCategory] = useState(false)
  const [tasks, setTasks] = useState([])
  const [BTnClick, setBtnClick] = useState(1)
  const slideUpAnim = new Animated.Value(0);


  const click = (id) =>{
    markAsFavorite(id)
    setBtnClick(BTnClick+1)
  }
  

  useEffect( () => {
    async function fetchData() {

          let data = await getAllTasks()
          setTasks(data.slice())
          console.log("daa")
    }
    
    fetchData()
    }, [BTnClick]);
 
  
    const backToNormal = () => {
      setCreateTaskPopup(false)
      setPlusBtn(true)
      setBlurr(false)
    }

    const animateSlideUp = () => {
      Animated.timing(slideUpAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: false, // Add this line for non-native driver
      }).start();
    };


    animateSlideUp()
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView  style={styles.container}>
      <View   style={ [isCreateTaskPopup ? styles.HeaderBarSmall :styles.HeaderBar ]}>
                    <PageHeader title={ 
      isCreateTaskPopup
      ? 'Add Task'
      : isCreateCategory
      ? 'Add Category'
      : 'Personal Tasks'}/>
              </View  >

       
                {isCreateTaskPopup && 
                <>
                        <TaskPopup backToNormal={backToNormal}/>
                </>
                }

                {isCreateCategory && 
                <>
                  <CreateCategoryPopup backToNormal={backToNormal}/>
                </>
                
                }

                 <FlatList data={tasks} showsVerticalScrollIndicator={false}
                            renderItem={({item}) => <PersonalTask task={item} markAsFavorite={click}/>}
                            keyExtractor={item => item.id}
                            style ={styles.NewJAwn}
                        />
                      
               {isBlurred &&
                        <>
                                <BlurView intensity={5} tint="light" style={styles.absolute} />
                                <Animated.View
              style={{
                transform: [
                  {
                    translateY: slideUpAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [300, 0],
                    }),
                  },
                ],
              }}
            >
                                <ChoiceSelector setPlusBtn={setPlusBtn}setBlurr={setBlurr} setCreateTaskPopup={setCreateTaskPopup} setCreateCategory={setCreateCategory}/>
                                </Animated.View>
                       </>
                        }
     </SafeAreaView>

              {isPlusBtnShown &&
                  <SafeAreaView  style={styles.containerg}>
                      <View style={styles.ImageButton2}>
                          <ImageButton onPress={() => {setBlurr(!isBlurred), animateSlideUp()}}  source="pluscircle"  size={45} color={"#4A4A4B"}/> 
                    </View>
                  </SafeAreaView>
               }
               
      </GestureHandlerRootView>
       
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffff',
      alignItems: 'center',
    },
    HeaderBar:{
       height:65
    },
    HeaderBarSmall:{
      height:35
    },
    NewJAwn:{
        backgroundColor:'#ffff',
        width:340,
        borderRadius: 15,
        maxHeight:530
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      },
    containerg:{
        height:70,
        justifyContent:'center',
        alignItems:'flex-end',
        backgroundColor:'#ffff'
    },ImageButton2:{marginRight:20}
  
  });