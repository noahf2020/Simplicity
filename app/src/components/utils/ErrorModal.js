import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import React, {useState} from 'react';
export default function ErrorModal({setModalVisable, errorModal}) {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={errorModal}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setModalVisable(!errorModal);
    }}>
    <View >
        <Text>Hello World!</Text>
    </View>
  </Modal>
  )
}
