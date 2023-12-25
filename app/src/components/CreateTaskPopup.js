import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import React,{useState, useEffect} from 'react';
import DateTimePicker from 'react-native-ui-datepicker';
import delay from 'delay';
import dayjs from 'dayjs';
import { Feather } from '@expo/vector-icons'; 

import { getAllCategories } from '../helper/Categories';

import EnableNoti from './utils/Buttons/EnableNoti';
import Category from './utils/Category';
import ImageButton from './utils/Buttons/ImageButton'
import SaveBtn from './utils/Buttons/SaveBtn';
import { StringCheck } from './utils/Validators/InputValidators';
import ErrorModal from './utils/ErrorModal';


export default function TaskPopup({backToNormal}) {
      const [value, setValue] = useState();
      const [cvalue, csetValue] = useState();
      const [TaskTitleValue, setTaskTitleValue] = useState("");
      const [NotesValue, setNotesValue] = useState("");
      const [selectedCategory, setCategory] = useState("");



      const [showCalendar, setCalendar] = useState(false)
      const [showTime, setTime] = useState(false)
      const [categories, setCategories] = useState([])
      const [errorModal, setModalVisable] = useState(false)
      const [errorMessage, setErrorMessage] = useState("")
      const [isAlreadySelected, setIsAlraedySelected] = useState(false)
      const [isEnabled, setIsEnabled] = useState(false);

 useEffect( () => {
  
      async function fetchData() {
            let data = await getAllCategories()
            setCategories(data.slice())
      }
      fetchData()
      }, []);
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



const checkForValidFields = async () =>{
    if(StringCheck(TaskTitleValue, 3)){
      console.log("good String Check")
    }else{
      await setErrorMessage("Invalid [title] Input(s)")
      await setModalVisable(true)
      await delay(2250)
      await setModalVisable(false)
     
    }

    if(selectedCategory){
      console.log(selectedCategory)
    }else{
      await setErrorMessage("Please Select Category")
      await setModalVisable(true)
      await delay(2250)
      await setModalVisable(false)
    }
  
    if(value && cvalue){
      console.log("good date + Time")

    }else{
      await setErrorMessage("Invalid [date/time] Input(s)")
      await setModalVisable(true)
      await delay(2250)
      await setModalVisable(false)
    }

    console.log(value && cvalue)
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

                         <KeyboardAvoidingView style={Styles.Categories} keyboardVerticalOffset={200} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
                            <View style={{width:100, alignItems:'center' }}> 
                              <Text style={{fontWeight:700,}}>Categories: </Text> 
                            </View>
                            {errorModal && 
                            <>
                            <ErrorModal setModalVisable={setModalVisable} errorModal={errorModal} message={errorMessage}/>
                            </>
                          } 

                             {categories.map(category =>{  return (<Category category={category} setIsAlraedySelected={setIsAlraedySelected} isAlreadySelected={isAlreadySelected} setCategory={setCategory}/> ) })}
                          

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
                  <View style={Styles.noti}>
                              <EnableNoti isEnabled={isEnabled} setIsEnabled={setIsEnabled}/>
                  </View>
                  <View style={Styles.save}>
                        <SaveBtn checkForValidFields={checkForValidFields}/>
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
      flex:.1,
      
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
      height:150,
      alignItems:'center',
       justifyContent:'center'
    },
    NotesInput:{
      height: 130,
      width:330,
      backgroundColor:'#fff',
      borderColor: '#E0E0E0',
      borderWidth:1,
      borderRadius:6,
      paddingLeft:18,
      fontSize: 16,
      textAlignVertical:'top'
    },
    noti:{

      height:50,

      alignItems:'center',
      justifyContent:'center'
    },
    save:{
      height:80,
      alignItems:'center',
      justifyContent:'center',
      marginTop:10
    }

})