
import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform , Button} from 'react-native';
import React,{useState, useEffect, useRef, useMemo, useCallback} from 'react';



import ChoiceSelectorCanvas from '../components/ChoiceSelectorCanvas';
import PageHeader  from '../components/utils/PageHeader'
import ImageButton from '../components/utils/Buttons/ImageButton'
import Courses from '../components/Courses';
import Assignments from '../components/Assignments';

import { GestureHandlerRootView, GestureDetector, Gesture, Directions} from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  createBottomSheet 
} from '@gorhom/bottom-sheet';


export default function Canvas() {
  const [isPlusBtnShown, setPlusBtn] = useState(true)
  const [isViewCourses, setViewCourses] = useState(false);
  const [assignments, setAssignments] = useState([1,2,35,4,4,4,4,3]);


  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['25%','50%'], []);
  const handleSheetChanges = useCallback((index) => {
  }, []);

  const handleCloseModalPress = ()  =>{
    if (bottomSheetModalRef.current) {
      console.log("Force Close")
      bottomSheetModalRef.current.close();
     // setPlusBtn(true)

   
    }
  }
  const test = () =>{
    bottomSheetModalRef.current?.present();
  }


  const handleModalDismiss = () => {
    if(isViewCourses){
       setPlusBtn(false)
     }else{
       setPlusBtn(true)
     }
  }


  const backToNormal = () => {
    setViewCourses(false)
    setPlusBtn(true)

 }


  
    return (
        <>
      <GestureHandlerRootView style={{ flex: 1 }}>
      
      <SafeAreaView  style={styles.container}>
   
      <View   style={ [isViewCourses ? styles.HeaderBarSmall :styles.HeaderBar ]}>
      <PageHeader title="Canvas"/>
</View>

       
       
         {isViewCourses && 
                <>
        
                          {/* <GestureDetector gesture={flingGesture}> */}
                              {/* <Animated.View style={animatedStyle} > */}
                                        <Courses backToNormal={backToNormal}/>
                              {/* </Animated.View> */}
                         {/* </GestureDetector> */}
                  
                </>
                
                }
          <FlatList data={assignments} showsVerticalScrollIndicator={false}
                            renderItem={({item}) =>  <Assignments /> }
                            keyExtractor={item => item.id}
                            style ={styles.NewJAwn}
                        /> 

         <BottomSheetModalProvider>
                      <View style={styles.contentContainer}>
                                <BottomSheetModal ref={bottomSheetModalRef} index={0} snapPoints={snapPoints} onChange={handleSheetChanges} onDismiss={handleModalDismiss} style={styles.contentContainer}>
                                         <View >
                                            <ChoiceSelectorCanvas handleModalDismiss={handleCloseModalPress} setViewCourses={setViewCourses}/>
                                         </View>
                                </BottomSheetModal>
                        </View>
         </BottomSheetModalProvider>

      

         {isPlusBtnShown &&
                  <SafeAreaView  style={styles.containerg}>
                      <View style={styles.ImageButton2}>
                          <ImageButton onPress={ async () => {await setPlusBtn(false), await test()  }}  source="upcircle"  size={45} color={"#4A4A4B"}/> 
                    </View>
                  </SafeAreaView>
               }

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
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      
      elevation: 24,

    },
    HeaderBar:{
      height:'5%',
      backgroundColor: 'white',
   },
   HeaderBarSmall:{
    height:'5%',

   },
    containerg:{
      height:'10%',
      justifyContent:'center',
      alignSelf:'flex-end',
      backgroundColor:'white'
  },
  NewJAwn:{
    backgroundColor:'white',
    width:'90%',
    borderRadius: 15,
    maxHeight:'90%'
},
  ImageButton2: {marginRight:'5%'}
  });