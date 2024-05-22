import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform , Button} from 'react-native';
import React,{useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  createBottomSheet 
} from '@gorhom/bottom-sheet';


import PageHeader  from '../components/utils/PageHeader'
import PersonalTask from '../components/Lists/Divs/PersonalTask';
import ImageButton from '../components/utils/Buttons/ImageButton'
import ChoiceSelector from '../components/ChoiceSelector';
import TaskPopup from '../components/Popups/CreateTaskPopup';
import CreateCategoryPopup from '../components/Popups/CreateCategoryPopup';

import { NativeViewGestureHandler } from 'react-native-gesture-handler';


import { deleteTasks, getAllTasks, markAsFavorite, completeTask } from '../helper/Tasks';
import { GestureHandlerRootView, GestureDetector, Gesture, Directions} from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withCallback,

} from 'react-native-reanimated';
import CategoryPopup from '../components/Popups/CategoryPopup';
import {deleteCategory} from '../helper/Categories'
import PersonalTaskList from '../components/Lists/PersonalTaskList';

export default function Personal() {

  const [isLoading, setLoading] = useState(false)
  const [isBlurred, setBlurr] = useState(false);
  const [isPlusBtnShown, setPlusBtn] = useState(true)
  const [isCreateTaskPopup, setCreateTaskPopup] = useState(false)
  const [isCreateCategory, setCreateCategory] = useState(false)
  const [tasks, setTasks] = useState([])
  const [BTnClick, setBtnClick] = useState(1)
  const [isViewCats,setViewCats] = useState(false);
  

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['25%','50%'], []);
  const handleSheetChanges = useCallback((index) => {
  }, []);


  const position = useSharedValue(0);

  // const flingGesture = Gesture.Fling()
  //   .direction(Directions.DOWN)
  //   .onStart((e) => {
  //     position.value =  withTiming(position.value + 400, { duration: 0 });
  //     setCreateTaskPopup(false)

  //   })

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: position.value }],
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
    if(isCreateTaskPopup || isCreateCategory || isViewCats){
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
       setViewCats(false)
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
      :isViewCats
      ?'Categories'
      : 'Personal Tasks'}/>
              </View  >

       
                {isCreateTaskPopup && 
                <>
             {/* <GestureDetector gesture={flingGesture}>
             <Animated.View style={animatedStyle} > */}
               <TaskPopup  backToNormal={backToNormal}/>
               {/* </Animated.View>
             </GestureDetector> */}

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
                {isViewCats && 
                <>
                <CategoryPopup  backToNormal={backToNormal} />
                </>
                }
                 <PersonalTaskList tasks={tasks} click={click}deleteAction={deleteAction}completeAction={completeAction}/>

                    <BottomSheetModalProvider>
                      <View style={styles.contentContainer}>
                                     <BottomSheetModal
                                           ref={bottomSheetModalRef}
                                           index={0}
                                           snapPoints={snapPoints}
                                           onChange={handleSheetChanges}
                                           onDismiss={handleModalDismiss}
                                           style={styles.contentContainer}
                                         >
                                         <View >
                                          <ChoiceSelector handleModalDismiss={handleCloseModalPress} setViewCats={setViewCats} setCreateTaskPopup={setCreateTaskPopup} setCreateCategory={setCreateCategory}/>
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