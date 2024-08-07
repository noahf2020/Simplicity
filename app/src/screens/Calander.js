
import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar,   Dimensions,
    Pressable, TextInput,  KeyboardAvoidingView,  TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform , Button} from 'react-native';
import React,{useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {Agenda} from 'react-native-calendars'

import {getAllTasks} from '../helper/Tasks'

export default function Calander() {
const {width, height} = Dimensions.get('window');



// Specify how each date should be rendered. day can be undefined if the item is not first in that day
const renderEmptyDay = () => {
    return <View />;
  };

 //returns card for empty slots.
  const renderEmptyItem = () => {
    return (
        <Text >
         No slots in the calendar
        </Text>
    );
  };



  return (
    <SafeAreaView style={styles.container}>
   <Agenda
   style={{width:'100%'}}
// The list of items that have to be displayed in the Agenda
items={{
    '2024-08-26': [{name: 'Meeting 1', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}],
    '2024-08-28': [{name: 'Meeting 2', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}],
    '2024-08-29': [{name: 'Meeting 3', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}],
    '2024-08-30': [{name: 'Meeting 4', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '},{name: 'Meeting 9', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}],
    '2024-08-31': [{name: 'Meeting 5', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}],
    '2024-08-25': [{name: 'Meeting 6', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}]
  }}
  renderEmptyItem={renderEmptyItem()}
  renderItem={(item, isFirst) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.data}</Text>
    </TouchableOpacity>
  )}
 />
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {   
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height:'100%',
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
      },
      itemText: {
        color: '#888',
        fontSize: 16,
      }
  });