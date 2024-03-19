import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform , Button} from 'react-native';
import React,{useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  createBottomSheet 
} from '@gorhom/bottom-sheet';


import PageHeader  from '../components/utils/PageHeader'
import PersonalTask from '../components/PersonalTask';
import ImageButton from '../components/utils/Buttons/ImageButton'
import ChoiceSelector from '../components/ChoiceSelector';
import TaskPopup from '../components/CreateTaskPopup';
import CreateCategoryPopup from '../components/CreateCategoryPopup';



import { deleteTasks, getAllTasks, markAsFavorite, completeTask } from '../helper/Tasks';
import { GestureHandlerRootView, GestureDetector, Gesture, Directions} from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withCallback,

} from 'react-native-reanimated';


export default function Personal() {

  const [isBlurred, setBlurr] = useState(false);
  const [isPlusBtnShown, setPlusBtn] = useState(true)
  const [isCreateTaskPopup, setCreateTaskPopup] = useState(false)
  const [isCreateCategory, setCreateCategory] = useState(false)
  const [tasks, setTasks] = useState([])
  const [BTnClick, setBtnClick] = useState(1)

  

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const handleSheetChanges = useCallback((index) => {
  }, []);


  const position = useSharedValue(0);

  const flingGesture = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(async (e) => {
      position.value = withCallback(withTiming(700, { duration: 200 }),()=> {
        console.log("isCreateTaskPopup 2: " + isCreateTaskPopup)
      });
    }).onEnd(()=>{
     // backToNormal()
     console.log("isCreateTaskPopup : " + isCreateTaskPopup)
     console.log(position)
   
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value}],
  }));



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
  
  const handleModalDismiss = () => {
    setBlurr(false)
    if(isCreateTaskPopup || isCreateCategory){
       setPlusBtn(false)
     }else{
       setPlusBtn(true)
     }
  }

  const handleCloseModalPress = ()  =>{
    if (bottomSheetModalRef.current) {
      console.log("Force Close")
      bottomSheetModalRef.current.close();
      setBlurr(false)
   
    }
  }
   
  



  useEffect( () => {
    async function fetchData() {
          let data = await getAllTasks()
          setTasks(data.slice())
       
    }
    
    fetchData()
    }, [BTnClick, isCreateTaskPopup]);
 
    const test = () =>{
      bottomSheetModalRef.current?.present();


    }
  
    const backToNormal = () => {
       setCreateTaskPopup(false)
       setPlusBtn(true)
       setBlurr(false)
       setCreateCategory(false)
    }


    const longPressGesture = Gesture.LongPress().onEnd((e, success) => {
      if (success) {
        console.log(`Long pressed for ${e.duration} ms!`);
      }
    });



    return (
      
      <GestureHandlerRootView style={{ flex: 1 }}>
     
          <>
         
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
             {/* <GestureDetector gesture={flingGesture}> */}
             <Animated.View style={animatedStyle} >
               <TaskPopup  backToNormal={backToNormal}/>
              </Animated.View>
             {/* </GestureDetector> */}

                </>
                }

                {isCreateCategory && 
                <>
        
                          {/* <GestureDetector gesture={flingGesture}> */}
                              <Animated.View style={animatedStyle} >
                                        <CreateCategoryPopup backToNormal={backToNormal}/>
                              </Animated.View>
                         {/* </GestureDetector> */}
                  
                </>
                
                }

                 <FlatList data={tasks} showsVerticalScrollIndicator={false}
                            renderItem={({item}) => 
                            <GestureDetector gesture={longPressGesture}>
                                  <PersonalTask task={item} markAsFavorite={click} deleteB={deleteAction} completeTask={completeAction}/>
                            </GestureDetector>
                                                              }
                            keyExtractor={item => item.id}
                            style ={styles.NewJAwn}
                        />
                             <BottomSheetModalProvider>
                      <View style={styles.contentContainer}>
                                     <BottomSheetModal
                                           ref={bottomSheetModalRef}
                                           index={1}
                                           snapPoints={snapPoints}
                                           onChange={handleSheetChanges}
                                           onDismiss={handleModalDismiss}
                                         >
                                         <View style={styles.contentContainer}>
                                          <ChoiceSelector handleModalDismiss={handleCloseModalPress} setCreateTaskPopup={setCreateTaskPopup} setCreateCategory={setCreateCategory}/>
                                         </View>
                                       </BottomSheetModal>
                        </View>

                                           </BottomSheetModalProvider>

               {/* {isBlurred &&
                        <>
                                <BlurView intensity={4} tint="light" style={styles.absolute} />
                       </>
                        } */}
     </SafeAreaView>
              {isPlusBtnShown &&
                  <SafeAreaView  style={styles.containerg}>
                      <View style={styles.ImageButton2}>
                          <ImageButton onPress={ async () => {await setPlusBtn(false), await test(), await setBlurr(!isBlurred) }}  source="pluscircle"  size={45} color={"#4A4A4B"}/> 
                    </View>
                  </SafeAreaView>
               }
       
          </>

      </GestureHandlerRootView>
       
    );
  }

  const styles = StyleSheet.create({
    containeer: {
      flex: 1,
      padding: 24,
      backgroundColor: 'F6F6F6',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor:'F6F6F6',
      justifyContent:'center'

    },

    container: {
      flex: 1,
      backgroundColor: '#ffff',
      alignItems: 'center',
    },
    HeaderBar:{
       height:'5%',
       backgroundColor: 'white',
    },
    HeaderBarSmall:{
      height:35
    },
    NewJAwn:{
        backgroundColor:'white',
        width:'90%',
        borderRadius: 15,
        maxHeight:'90%'
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      },
    containerg:{
        height:'10%',
        justifyContent:'center',
        alignItems:'flex-end',
        backgroundColor:'white'
    },ImageButton2:{marginRight:'5%'}
  
  });