import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import React,{useState, useEffect} from 'react';

import delay from 'delay';
import dayjs from 'dayjs';
import { Feather } from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list'

import { getAllCategories } from '../../helper/Categories';
import { addTask } from '../../helper/Tasks';

import EnableNoti from '../utils/Buttons/EnableNoti';
import Category from '../utils/Category';
import ImageButton from '../utils/Buttons/ImageButton'
import SaveBtn from '../SaveBtn';
import { StringCheck } from '../utils/Validators/InputValidators';
import ErrorModal from '../utils/ErrorModal';


export default function TaskPopup({backToNormal}) {
      const [date, setDate] = useState(new Date());
      const [time, setTime] = useState(new Date());
      const [TaskTitleValue, setTaskTitleValue] = useState("");
      const [NotesValue, setNotesValue] = useState("");
      const [selectedCategory, setCategory] = useState("");



      const [categories, setCategories] = useState([])
      const [errorModal, setModalVisable] = useState(false)
      const [errorMessage, setErrorMessage] = useState("")
      const [isAlreadySelected, setIsAlraedySelected] = useState(false)
      const [isEnabled, setIsEnabled] = useState(false);

 useEffect( () => {
      async function fetchData() {
            let data = await getAllCategories()
          //  console.log(data)
            setCategories(data.slice())
          
      }
      fetchData()
      }, []);
      // ...
    


const onChangeDate = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  setDate(currentDate);
};

const onChangeTime = (event, selectedTime) => {
  const currentTime = selectedTime || time;
  setTime(currentTime);
};

function addKeyAndValue( array) {
  return array.map(item => {
      return { key: item.id, value: item.name};
  });
}


  

  const modifiedArray = addKeyAndValue(categories);
 

const checkForValidFields = async () =>{
  
    if(StringCheck(TaskTitleValue, 3) && selectedCategory && date && time){
      await addTask(TaskTitleValue, selectedCategory,date, time, NotesValue, isEnabled);
      await backToNormal()
    }else{
      await setErrorMessage("Invalid [title] Input(s)")
      await setModalVisable(true)
      await delay(2250)
      await setModalVisable(false)
     
    }

    if(selectedCategory){
    }else{
      await setErrorMessage("Please Select Category")
      await setModalVisable(true)
      await delay(2250)
      await setModalVisable(false)
    }   
}





  return (
        <>
              <KeyboardAvoidingView style={Styles.PopupContainer}  keyboardVerticalOffset={0} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={Styles.Nav}>
                        <ImageButton onPress={() =>backToNormal()}  source="arrowdown"  size={20} color={"#403572"}/> 
                        </View>            
         
                        </TouchableWithoutFeedback>
                   <View style={Styles.dataFields}>
                        
                              <View style={Styles.TaskTitle}>
                                      

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

                    <View style={{width:"70%", alignSelf:'center', maxHeight:'45%',overflow:'scroll'}}>
                    <SelectList 
                                  setSelected={(val) => setCategory(val)} 
                                  data={modifiedArray} 
                                  save="value"
                                  search={false}
                                  placeholder="Select Category"
                                  maxHeight="75"
                                  boxStyles={{backgroundColor:'#EEEEEE',borderColor:'#EEEEEE'}}
                                  dropdownStyles={{backgroundColor:'#EEEEEE',borderColor:'#EEEEEE'}}
                                  dropdownTextStyles={{alignSelf:'center',fontWeight:'bold',fontSize:'14'}}
                              />
                    </View>
                         
                             {/* {categories.map(category =>{  return (<Category category={category} setIsAlraedySelected={setIsAlraedySelected} isAlreadySelected={isAlreadySelected} setCategory={setCategory}/> ) })}
                           */}

                        
                            
                          <View style={Styles.Txt}>
                           
                          </View>

          <KeyboardAvoidingView   style={{ flex: 1}} keyboardVerticalOffset={200} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                         <View style={Styles.Selections}>
          
                              <Pressable style={Styles.Press} >
                                            <Feather name="calendar" size={20} color="#4A3780"style={{marginLeft:"5%"}} />
                                            <DateTimePicker mode="date" style={{width:"70%"}}   onChange={onChangeDate} value={date} />

                              </Pressable>

                              <Pressable style={Styles.Press}>
                                            <Feather name="clock" size={20} color="#4A3780" style={{marginLeft:"5%"}}/>
                                            <DateTimePicker mode="time" style={{width:"70%"}}    onChange={onChangeTime} value={time} />
                              </Pressable>
  
                         </View>



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
        height:'100%',
        width:'90%',
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
      height:'10%',
      alignItems: 'center',
    },
    Input:{
      height:'65%',
      width:'90%',
      backgroundColor:'#fff',
      borderColor: '#E0E0E0',
      borderWidth:1,
      borderRadius:6,
      paddingLeft:18,
      fontSize: 16
    },
    Categories:{
      height:'0%',
      marginTop:4,
      marginBottom:4,
      flex:.1,
      paddingTop:5,
      
      
      alignItems:'center',
      flexDirection: "row",
      justifyContent:'space-around',
    },
    Selections:{
      height:85,
     // flex: .1,
      paddingTop:20,
      flexDirection: "row",
      justifyContent:'space-around',
    
    },
    InputDate:{
      width:'50%',
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
      height:1,
      justifyContent:'space-around'
    },
    Press:{
      width:'40%',
      backgroundColor:'#fff',
      borderColor: '#E0E0E0',
      borderWidth:1,
      borderRadius:6,
      fontSize: 16,
      height:'80%',
      flexDirection: "row",
     
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
      width:'90%',
      backgroundColor:'#fff',
      borderColor: '#E0E0E0',
      borderWidth:1,
      borderRadius:6,
      paddingLeft:18,
      fontSize: 16,
      textAlignVertical:'top'
    },
    noti:{

      height:'50',

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