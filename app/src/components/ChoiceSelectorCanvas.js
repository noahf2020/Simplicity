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

export default function ChoiceSelectorCanvas({handleModalDismiss, setViewCourses}) {

const onpressTask = async () => {
   await setViewCourses(true)
    await handleModalDismiss()
   
}

const onpressCaT = () => {
   // setCreateCategory(true)
    handleModalDismiss()
   
}


  return (
        <>
    
        <View style={Styles.PopupContainer}>
            <Pressable    onPress={onpressTask} style={Styles.AddTaskBTN}>
                    <Text style={Styles.TXTContainer}>View Courses</Text>
            </Pressable>
            {/* <Pressable onPress={onpressCaT} style={({pressed}) =>{return [Styles.AddCategory, pressed ? Styles.pressed :Styles.notPressed ]}}>
                    <Text style={Styles.TXTContainer}>Add Category</Text>
            </Pressable> */}
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
        height:"20%",
        width:"100%",
        backgroundColor:'#A0BBFF',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:"3%"
        
    },
    AddCategory:{
        height:"20%",
        width:"100%",
        backgroundColor:'#FFDAA3',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:"3%"

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