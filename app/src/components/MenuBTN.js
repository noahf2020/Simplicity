import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar, Button, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import React,{useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';


export default function MenuBTN({bottomSheetModalRef2, snapPoints2, handlePresentModalPress, handleSheetChanges2 }) {



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


