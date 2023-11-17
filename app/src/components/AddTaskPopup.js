import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Pressable
  } from 'react-native';

export default function AddTaskPopup({setPlusBtn, setBlurr}) {

const onpress = () => {
    setPlusBtn(false)
    setBlurr(false)
}

  return (
        <>
        <View style={Styles.PopupContainer}>
            <Pressable    onPress={onpress} style={({pressed}) =>{return [Styles.AddTaskBTN, pressed ? Styles.pressed :Styles.notPressed ]}}>
                    <Text style={Styles.TXTContainer}>Add Task</Text>
            </Pressable>
            <Pressable onPress={onpress} style={({pressed}) =>{return [Styles.AddCategory, pressed ? Styles.pressed :Styles.notPressed ]}}>
                    <Text style={Styles.TXTContainer}>Add Category</Text>
            </Pressable>
        </View>
        </>
  )
}

const Styles = StyleSheet.create({ 
    PopupContainer:{
        height:150,
        width:250,
        backgroundColor:'#F6F6F6',
        borderRadius:10,
    },
    AddTaskBTN:{
        height:75,
        backgroundColor:'#A0BBFF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent:'center',
        alignItems:'center'
        
    },
    AddCategory:{
        height:75,
        backgroundColor:'#FFDAA3',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent:'center',
        alignItems:'center'
    },
    TXTContainer:{
        color:'white',
        fontWeight:'700',
        fontSize: 16

    },
    pressed: {
        opacity: 0.8
    },
    notPressed: {
        opacity: 1
    },



})