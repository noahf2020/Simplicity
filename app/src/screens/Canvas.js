
import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform , Button} from 'react-native';
import React,{useState, useEffect, useRef, useMemo, useCallback} from 'react';


import PageHeader  from '../components/utils/PageHeader'
import ImageButton from '../components/utils/Buttons/ImageButton'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  createBottomSheet 
} from '@gorhom/bottom-sheet';


export default function Canvas() {
  const [isPlusBtnShown, setPlusBtn] = useState(true)


  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['25%','50%'], []);
  const handleSheetChanges = useCallback((index) => {
  }, []);



  const handleModalDismiss = () => {
    setBlurr(false)
    if(isCreateTaskPopup || isCreateCategory){
       setPlusBtn(false)
     }else{
       setPlusBtn(true)
     }
  }
  
    return (
        <>
      
      <SafeAreaView  style={styles.container}>
   
         <PageHeader title="Canvas"/>
       

       

         <BottomSheetModalProvider>
                      <View style={styles.contentContainer}>
                                <BottomSheetModal ref={bottomSheetModalRef} index={0} snapPoints={snapPoints} onChange={handleSheetChanges} onDismiss={handleModalDismiss} style={styles.contentContainer}>
                                         <View >
                                         
                                         </View>
                                </BottomSheetModal>
                        </View>
         </BottomSheetModalProvider>


         {isPlusBtnShown &&
                  <SafeAreaView  style={styles.containerg}>
                      <View style={styles.ImageButton2}>
                          <ImageButton onPress={ async () => {await setPlusBtn(false), await test(), await setBlurr(!isBlurred) }}  source="upcircle"  size={45} color={"#4A4A4B"}/> 
                    </View>
                  </SafeAreaView>
               }

      </SafeAreaView>
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
    containerg:{
      height:'10%',
      justifyContent:'center',
      alignItems:'flex-end',
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