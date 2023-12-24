import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import React, {useState} from 'react';
export default function ErrorModal({setModalVisable, errorModal, message}) {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={errorModal}
     style={styles.Modal}>
    <View style={styles.modalView}>
        <Text>{message}</Text>
    </View>
  </Modal>
  )
}


const styles = StyleSheet.create({
  modal:{
    height:20
  },
modalView: {
  marginTop: 750,
  marginHorizontal: 40,
  backgroundColor: '#FF7F7F',
  borderRadius: 20,
  padding: 25,
  alignItems: 'center',
  shadowColor: '#522c2c',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
}})