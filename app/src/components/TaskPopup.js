import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Pressable
  } from 'react-native';

export default function TaskPopup() {



  return (
        <>
              <View style={Styles.PopupContainer}>

                    <Text>POpup Jawn</Text>

              </View>

        </>

  )}


  const Styles = StyleSheet.create({ 
    PopupContainer:{
        height:150,
        width:250,
        backgroundColor:'#F6F6F6',
        borderRadius:10,
    }

})