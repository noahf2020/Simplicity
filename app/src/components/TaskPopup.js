import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Pressable,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform
  } from 'react-native';
import React,{useState} from 'react';
import DateTimePicker from 'react-native-ui-datepicker';
import delay from 'delay';
import dayjs from 'dayjs';
import { Feather } from '@expo/vector-icons'; 


import ImageButton from './utils/ImageButton'
import { getAllCategories } from '../helper/Categories';




export default function TaskPopup({backToNormal}) {
      const [value, setValue] = useState();
      const [cvalue, csetValue] = useState();

      const [TaskTitleValue, setTaskTitleValue] = useState("");
      const [NotesValue, setNotesValue] = useState("");

      const [showCalendar, setCalendar] = useState(false)
      const [showTime, setTime] = useState(false)
      const [categories, setCategories] = useState([])


      useEffect(async () => {
       let data = await getAllCategories()
       console.log(data)
       setCategories(data)
      }, [categories]);
      // ...
    


let tempDate;

const onpressDate = () =>{
      if(showTime == false){
            console.log("false")
            setCalendar(!showCalendar)
      }
      
}

const onpressTime = () =>{
      setTime(!showTime)
}

const saveDate = async (date) => {
      let realDate = date.split(' ')[0]
      setValue(realDate)
      await delay(250);
      setCalendar(!showCalendar)
}

const saveTime = async () => {
      csetValue(tempDate)
      await delay(250);
      setTime(!showTime)
}

const saveTempData = async (date) => {
      console.log(date)
      tempDate = date
}


  return (
        <>
              <KeyboardAvoidingView style={Styles.PopupContainer}  keyboardVerticalOffset={200} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={Styles.Nav}>
                        <ImageButton onPress={() =>backToNormal()}  source="arrowdown"  size={20} color={"#403572"}/> 
                        </View>            
         
                        </TouchableWithoutFeedback>
                   <View style={Styles.dataFields}>
                        
                              <View style={Styles.TaskTitle}>
                                            <Text style={{ fontWeight: 700,  fontSize: 14, color:'#1B1B1D'  }}>Task Title</Text>

                                             <TextInput style={Styles.Input}
                                              containerStyle={{ marginTop: 15 }}
                                              placeholder="Task Title"
                                              value={TaskTitleValue}
                                              autoCapitalize="none"
                                              autoCompleteType="off"
                                              autoCorrect={false}
                                              keyboardType="default"
                                              returnKeyType='done'
                                              onChangeText={(text) => setTaskTitleValue(text)}
                               />      
                         </View>

                         <KeyboardAvoidingView style={Styles.Categories} keyboardVerticalOffset={100} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
                            <View style={{width:100, alignItems:'center' }}> 
                              <Text style={{fontWeight:700,}}>Categories: </Text> 
                            </View>
                              
                            {categories.map(category =>{
                                return (
                                 ///style={({pressed}) =>{return [Styles.AddTaskBTN, pressed ? Styles.pressed :Styles.notPressed ]}}
                                  <Pressable onPress={categorySelector} style={{height:45,width:45,backgroundColor:category.color,borderRadius:10, justifyContent:'center',alignItems:'center',borderWidth:2,borderColor:'white'}}>
                                       <Feather name={category.image} size={20} color="#4A3780" />
                                  </Pressable>
                                  
                                )
                            })}
                                
                          
                         </KeyboardAvoidingView>
                            
                          <View style={Styles.Txt}>
                              <Text style={{fontWeight: 700, fontSize: 14, color:'#1B1B1D'  }}>Date</Text>
                              <Text style={{fontWeight: 700, fontSize: 14, color:'#1B1B1D' }}>Time</Text>
                          </View>

          <KeyboardAvoidingView   style={{ flex: 1}} keyboardVerticalOffset={200} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                         <View style={Styles.Selections}>
          
                              <Pressable style={Styles.Press}  onPress={onpressDate}>
                                            <Text>{ value ? dayjs(value).format('LL')  :'Select Date'}</Text>
                                            <Feather name="calendar" size={20} color="#4A3780" />

                              </Pressable>

                              <Pressable style={Styles.Press}  onPress={onpressTime}>
                                            <Text style={{color:'#1B1B1D'}}>{cvalue ? cvalue.split(' ')[1] :'Select Time'}</Text>
                                            <Feather name="clock" size={20} color="#4A3780" />
                              </Pressable>
  
                         </View>

                                          { showCalendar &&
                                                <View style={Styles.Datecontainer}>
                                                <DateTimePicker
                                                value={value}
                                                mode="date"
                                                onValueChange={(date) => saveDate(date) }
                                                />
                                                </View>
                                           }
                                           { showTime &&
                                             <View style={Styles.Timecontainer}>
                                                <DateTimePicker
                                                value={cvalue}
                                                mode="time"
                                                local="en"
                                                timePickerTextStyle={{fontSize:15}}
                                                onValueChange={(date) => saveTempData(date) }
                                                />
                                              <Pressable style={Styles.SaveBTN}  onPress={()=>saveTime()}>
                                               <Text style={{color:'#00A525'}}>Save</Text>
                                                </Pressable>
                                             </View>
                                           }


                  <View style={Styles.Notes} >
                              <TextInput style={Styles.NotesInput}
                                              containerStyle={{ marginTop: 15 }}
                                              placeholder="Notes"
                                              value={NotesValue}
                                              autoCapitalize="none"
                                              autoCompleteType="on"
                                              autoCorrect={true}
                                              keyboardType="default"
                                              returnKeyType='done'
                                          
                                              onChangeText={(text) => setNotesValue(text)}
                               />  
                                
                              </View>
                  </KeyboardAvoidingView>                   
                              
                                           
                        </View>

                 
            
              </KeyboardAvoidingView>

        </>

  )}


  const Styles = StyleSheet.create({ 
    PopupContainer:{
        height:630,
        width:360,
        backgroundColor:'#F6F6F6',
        borderRadius:10,
     
    },
    Nav:{
      height:40,
      justifyContent:'center',
      flexDirection:'column',
      alignItems: 'flex-end',
      paddingRight:15
    },
    dataFields:{
      height:600,
      flex:1
    },
    TaskTitle:{
      height:60,
      alignItems: 'center',
    },
    Input:{
      height:50,
      width:330,
      backgroundColor:'#fff',
      borderColor: '#E0E0E0',
      borderWidth:1,
      borderRadius:6,
      paddingLeft:18,
      fontSize: 16
    },
    Categories:{
      height:50,
      marginTop:24,
      marginBottom:24,
      flex:.2,
      
      alignItems:'center',
      flexDirection: "row",
      justifyContent:'space-around',
    },
    Selections:{
      height:85,
     // flex: .1,
      flexDirection: "row",
      justifyContent:'space-around',
    
    },
    InputDate:{
      width:160,
      backgroundColor:'#fff',
      borderColor: '#E0E0E0',
      borderWidth:1,
      borderRadius:6,
      paddingLeft:18,
      fontSize: 16,
      height:50
    },
    Txt:{
      flex: .05,
      flexDirection: "row",
      justifyContent: "center",
      height:12,
      justifyContent:'space-around'
    },
    Press:{
      width:170,
      backgroundColor:'#fff',
      borderColor: '#E0E0E0',
      borderWidth:1,
      borderRadius:6,
      fontSize: 16,
      height:50,
      flexDirection: "row",
      justifyContent:'space-around',
      alignItems: "center",
    },
    Datecontainer: {
      backgroundColor: '#fff',
      width:340,
      marginLeft:10,
      borderRadius:10,
      height:310,
      marginBottom:50

    },
    Timecontainer:{
      backgroundColor: '#fff',
      width:340,
      marginLeft:10,
      borderRadius:10, 
    },
    SaveBTN:{
      width: 100,
      height: 30,
      backgroundColor: '#86FFA1',
      marginBottom:10,
      justifyContent:'center',
      alignItems:'center',
      marginLeft:118,
      borderRadius:10,
    },
    Notes:{
      height:200,
      alignItems:'center',
  
       justifyContent:'center'
    },
    NotesInput:{
      height: 170,
      width:330,
      backgroundColor:'#fff',
      borderColor: '#E0E0E0',
      borderWidth:1,
      borderRadius:6,
      paddingLeft:18,
      fontSize: 16,
      textAlignVertical:'top'
    }

})