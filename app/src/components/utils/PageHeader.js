import React,{useState} from "react";
import { StyleSheet, Text, View } from 'react-native';


export default (props) => {
   
    return(
        <>
        <Text style={styles.text}>
            {props.title}
        </Text>
        </>
    )
}

const styles = StyleSheet.create({
    text: {
      flex: 1,
      color: '#4A4A4B',
      fontSize: 24,
      fontWeight: '700',

    },
  });