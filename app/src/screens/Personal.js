import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
  } from 'react-native';
import PageHeader  from '../components/utils/PageHeader'
import PersonalTask from '../components/PersonalTask';
import ImageButton from '../components/utils/Buttons/ImageButton'
import { useState } from 'react';
import { BlurView } from 'expo-blur';
import ChoiceSelector from '../components/ChoiceSelector';
import TaskPopup from '../components/CreateTaskPopup';
  
export default function Personal() {

  const [isBlurred, setBlurr] = useState(false);
  const [isPlusBtnShown, setPlusBtn] = useState(true)
  const [isCreateTaskPopup, setCreateTaskPopup] = useState(false)

  const backToNormal = () => {
    setCreateTaskPopup(false)
    setPlusBtn(true)
    setBlurr(false)
  }


    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-kaed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fkbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-1455k71e29d72',
          title: 'Third Item',
        },
        {
            id: '586fa0f-3da1-471f-bd96-1k5571e29d72',
            title: 'Third Item',
          },
          {
            id: '58694ak-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
          },
          {
            id: '58694sf-3da1-471f-bd96-145dse29d72',
            title: 'Third Item',
          },
          {
            id: '58694a0f-3da1-471f-bd96-1455mn1e29d72',
            title: 'Third Item',
          },
         
          {
            id: '58694a0f-3da1-471f-bd96-145571e2w2',
            title: 'Third Item',
          },
         
      ];


    return (
        <>
      <SafeAreaView  style={styles.container}>

      <View   style={ [isCreateTaskPopup ? styles.HeaderBarSmall :styles.HeaderBar ]}>
                    <PageHeader title={isCreateTaskPopup ? "Add Task" : "Personal Tasks"}/>
              </View  >

       
                {isCreateTaskPopup && 
                <>
                        <TaskPopup backToNormal={backToNormal}/>
                </>
                }

                 <FlatList data={DATA} showsVerticalScrollIndicator={false}
                            renderItem={({item}) => <PersonalTask title={item.title} />}
                            keyExtractor={item => item.id}
                            style ={styles.NewJAwn}
                        />
                      
               {isBlurred &&
                        <>
                                <BlurView intensity={5} tint="light" style={styles.absolute} />
                                <ChoiceSelector setPlusBtn={setPlusBtn}setBlurr={setBlurr} setCreateTaskPopup={setCreateTaskPopup}/>
                       </>
                        }
     </SafeAreaView>

              {isPlusBtnShown &&
                  <SafeAreaView  style={styles.containerg}>
                      <View style={styles.ImageButton2}>
                          <ImageButton onPress={() => setBlurr(!isBlurred)}  source="pluscircle"  size={45} color={"#4A4A4B"}/> 
                    </View>
                  </SafeAreaView>
               }
        </>
       
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffff',
      alignItems: 'center',
    },
    HeaderBar:{
       height:65
    },
    HeaderBarSmall:{
      height:35
    },
    NewJAwn:{
        backgroundColor:'#ffff',
        width:340,
        borderRadius: 15,
        maxHeight:530
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      },
    containerg:{
        height:70,
        justifyContent:'center',
        alignItems:'flex-end',
        backgroundColor:'#ffff'
    },ImageButton2:{marginRight:20}
  
  });