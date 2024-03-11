import {SafeAreaView,View,FlatList,StyleSheet, Text,StatusBar, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import React,{useState, useEffect} from 'react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';


import ImageButton from './utils/Buttons/ImageButton'
import DropDownPicker from 'react-native-dropdown-picker';
import { getCreateCategories, addCategory} from '../helper/Categories';
import SaveBtn from './SaveBtn';

export default function CreateCategoryPopup({backToNormal}) {
    const fling = Gesture.Fling();

    const [CategoryTitleValue, setCategoryTitleValue] = useState("");
    const [isInput2Vis, setVisInput2] = useState(false)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    const [openColor, setopenColor] = useState(false);
    const [valueColor, setValueColor] = useState(null);
    const [itemsColor, setItemsColor] = useState([   
        {label: 'Light Yellow', value: '#FEF5D3', labelStyle: { color: "#FEF5D3",fontWeight:'bold'} },
        {label: 'Light Blue', value: '#DBECF6', labelStyle: { color: "#DBECF6",fontWeight:'bold'} },
        {label: 'Light Purple', value: '#cac0fa', labelStyle: { color: "#cac0fa",fontWeight:'bold'} }

    ]);

    useEffect( () => {
        async function fetchData() {
              let data = await getCreateCategories()
              setItems(data.slice())
           
              setVisInput2(!isInput2Vis)
        }
        fetchData()

        }, [open]);

const checkForValidFields = async () => {
  console.log(CategoryTitleValue, value, valueColor)
  await addCategory(CategoryTitleValue, value, valueColor)
  await backToNormal()
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
                                      <Text style={{ fontWeight: 700,  fontSize: 14, color:'#1B1B1D'  }}>Category Title</Text>

                                       <TextInput style={Styles.Input}
                                        containerStyle={{ marginTop: 15 }}
                                        placeholder="Category Title"
                                        value={CategoryTitleValue}
                                        autoCapitalize="none"
                                        autoCompleteType="off"
                                        autoCorrect={false}
                                        keyboardType="default"
                                        returnKeyType='done'
                                        onChangeText={(text) => setCategoryTitleValue(text)}
                         />     

                         <View style={{marginTop:20,width:330}}>
                         <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            placeholder="Select an Icon"
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            bottomOffset={300}
                            style={{  width:330, paddingLeft:18,}}
                            /> 
                         </View>
                         <View style={{marginTop:30, width:330, }}>
                            {isInput2Vis&&<>
                            
                                <DropDownPicker
                            open={openColor}
                            value={valueColor}
                            items={itemsColor}
                            placeholder="Select a Color"
                            setOpen={setopenColor}
                            setValue={setValueColor}
                            setItems={setItemsColor}
                            style={{  width:330, paddingLeft:18,}}
                            
                            /> 
                            
                            </>}
                
                         </View>
                         
                         <View style={Styles.Rendering}>
                                <Text style={{fontWeight:'bold'}}>YOUR ICON</Text>
                         {items &&<>
                                {items.map(item => {if(item.value == value){{
                                    return (
                                        <View style={{height:55,width:55,backgroundColor:valueColor,borderRadius:10, justifyContent:'center',alignItems:'center',borderWidth:2 }}>
                                                {item.icon("#4A3780")}
                                        </View>
                                    
                                        )}}})}
                         </>}
                         </View>
                        <View style={Styles.save}>
                          <SaveBtn checkForValidFields={checkForValidFields}/>
                        </View>


                   </View>
                
                </View>
            </KeyboardAvoidingView>

    </>
  )
}

const Styles = StyleSheet.create({ 
    save:{
        height:80,
        alignItems:'center',
        justifyContent:'center',
        marginTop:10
      },
    Rendering:{
        height:150,
        width:200,
        marginTop:110,
        backgroundColor:"white",
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:10,
        paddingTop:20

    },
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
        flex:1,
        alignItems:'center'
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

})
