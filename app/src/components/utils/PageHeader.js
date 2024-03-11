import React,{useState} from "react";
import { StyleSheet, Text, View } from 'react-native';

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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
      fontSize: RFValue(20),
      fontWeight: '700',

    },
  });