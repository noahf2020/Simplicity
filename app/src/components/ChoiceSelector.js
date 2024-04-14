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

export default function ChoiceSelector({handleModalDismiss, setCreateTaskPopup,setCreateCategory,setViewCats}) {

const onpressTask = async () => {
    await setCreateTaskPopup(true)
    await handleModalDismiss()
   
}

const onpressCaT = () => {
    setCreateCategory(true)
    handleModalDismiss()
   
}
const onpressCaT2 = () => {
    setViewCats(true)
    handleModalDismiss()
   
}

  return (
        <>
    
        <View style={Styles.PopupContainer}>
            <Pressable    onPress={onpressTask}style={({pressed}) =>{return [Styles.AddTaskBTN, pressed ? Styles.pressed :Styles.notPressed ]}}>
                    <Text style={Styles.TXTContainer}>Add Task</Text>
            </Pressable>
            <Pressable onPress={onpressCaT} style={({pressed}) =>{return [Styles.AddCategory, pressed ? Styles.pressed :Styles.notPressed ]}}>
                    <Text style={Styles.TXTContainer}>Add Category</Text>
            </Pressable>
            <Pressable  onPress={onpressCaT2} style={({pressed}) =>{return [Styles.ViewCat, pressed ? Styles.pressed :Styles.notPressed ]}}>
                    <Text style={Styles.TXTContainer}>View Categories</Text>
            </Pressable>
        </View>
       
        </>

  )
}

const Styles = StyleSheet.create({ 
    PopupContainer:{
        height:"100%",
        width:350,
        borderRadius:10,
    },
    AddTaskBTN:{
        height:"18%",
        width:"100%",
        backgroundColor:'#A0BBFF',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:"3%"
        
    },
    AddCategory:{
        height:"18%",
        width:"100%",
        backgroundColor:'#FFDAA3',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:"2%",
        marginBottom:"3%"
    },
    ViewCat:{
        height:"18%",
        width:"100%",
        backgroundColor:'#A2AAAD',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:"2%",
        marginBottom:"3%"
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