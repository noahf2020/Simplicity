import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import React, {useState} from 'react';
export default function ErrorModal() {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setModalVisible(!modalVisible);
    }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Hello World!</Text>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.textStyle}>Hide Modal</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
  )
}
