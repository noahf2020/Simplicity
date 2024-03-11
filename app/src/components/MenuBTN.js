import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar, Button, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import React,{useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';


export default function MenuBTN() {


    const bottomSheetModalRef2 = useRef(null);
    const snapPoints2 = useMemo(() => ['25%', '50%'], []);
    const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef2.current?.present();
    }, []);
    const handleSheetChanges2 = useCallback((index) => {
      console.log('handleSheetChanges', index);
    }, []);


  return (
    <BottomSheetModalProvider>
    <View style={styles.container}>
    
      <BottomSheetModal
        ref={bottomSheetModalRef2}
        index={0}
        snapPoints={snapPoints2}
        onChange={handleSheetChanges2}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheetModal>
    </View>
  </BottomSheetModalProvider>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      backgroundColor: 'grey',
      height:200
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      height:200

    },
  });


