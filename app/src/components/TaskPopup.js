import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Pressable,
    TextInput,
  
  } from 'react-native';
import React,{useState} from 'react';
import DateTimePicker from 'react-native-ui-datepicker';
import delay from 'delay';
import dayjs from 'dayjs';


import ImageButton from './utils/ImageButton'


export default function TaskPopup({backToNormal}) {
      const [value, setValue] = useState();
      const [cvalue, csetValue] = useState();

      const [TaskTitleValue, setTaskTitleValue] = useState("");
      const [showCalendar, setCalendar] = useState(false)
      const [showTime, setTime] = useState(false)


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

const saveTime = async (date) => {
      console.log(date)
      let realDate = date.split(' ')[1]
      csetValue(realDate)
      await delay(250);
      setTime(!showTime)
}


  return (
        <>
              <View style={Styles.PopupContainer}>

                        <View style={Styles.Nav}>
                        <ImageButton onPress={() =>backToNormal()}  source="arrowdown"  size={20} color={"#403572"}/> 
                        </View>            


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
                                              onChangeText={(text) => setTaskTitleValue(text)}
                               />      
                         </View>

                         <View style={Styles.Categories}>


                         </View>
                            
                          <View style={Styles.Txt}>
                              <Text style={{fontWeight: 700, fontSize: 14, color:'#1B1B1D'  }}>Date</Text>
                              <Text style={{fontWeight: 700, fontSize: 14, color:'#1B1B1D' }}>Time</Text>
                          </View>


                         <View style={Styles.Selections}>
          
                              <Pressable style={Styles.Press}  onPress={onpressDate}>
                                            <Text>{ value ? dayjs(value).format('LL')  :'Select Date'}</Text>
                              </Pressable>

                              <Pressable style={Styles.Press}  onPress={onpressTime}>
                                            <Text>{cvalue ? cvalue :'Select Time'}</Text>
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
                                                onValueChange={(date) => tempDate = date }
                                                />
                              <Pressable style={Styles.Press}  onPress={()=>saveTime(tempDate)}>
                                            <Text>Save</Text>
                              </Pressable>
                                                </View>
                                           }
                        </View>
             

              </View>

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
     // backgroundColor:'green',
      height:40,
      justifyContent:'center',
      flexDirection:'column',
      alignItems: 'flex-end',
      paddingRight:15
    },
    dataFields:{
      height:450,
     // backgroundColor:'grey',
//
    },
    TaskTitle:{
      height:60,
      alignItems: 'center',
    //  backgroundColor:'yellow',
      
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
      marginTop:20,
      backgroundColor:'yellow'
    },
    Selections:{
      height:85,
      flex: 1,
      flexDirection: "row",
      justifyContent:'space-around'


      
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
      width:160,
      backgroundColor:'#fff',
      borderColor: '#E0E0E0',
      borderWidth:1,
      borderRadius:6,
      paddingLeft:18,
      fontSize: 16,
      height:50,
      justifyContent:'center',
    },
    Datecontainer: {
      backgroundColor: '#fff',
      width:340,
      marginLeft:10,
      borderRadius:10,
    },

    Timecontainer:{
      backgroundColor: '#fff',
      width:340,
      marginLeft:10,
      borderRadius:10,
      height:330,
    }

})