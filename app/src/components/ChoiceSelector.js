import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Pressable,
    Modal
  } from 'react-native';

export default function ChoiceSelector({handleModalDismiss, setCreateTaskPopup,setCreateCategory}) {

const onpressTask = () => {
    handleModalDismiss()
    setCreateTaskPopup(true)
}

const onpressCaT = () => {
    handleModalDismiss()
    setCreateCategory(true)
}


  return (
        <>
    
        <View style={Styles.PopupContainer}>
            <Pressable    onPress={onpressTask} style={Styles.AddTaskBTN}>
                    <Text style={Styles.TXTContainer}>Add Task</Text>
            </Pressable>
            <Pressable onPress={onpressCaT} style={({pressed}) =>{return [Styles.AddCategory, pressed ? Styles.pressed :Styles.notPressed ]}}>
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
        backgroundColor:'',
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