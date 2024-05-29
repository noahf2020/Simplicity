import { StatusBar } from 'expo-status-bar';
import {SafeAreaView,View,FlatList,StyleSheet, Text, Pressable, TextInput,  KeyboardAvoidingView,   TouchableWithoutFeedback, Keyboard, Platform , Button} from 'react-native';
import React,{useState, useEffect, useRef, useMemo, useCallback} from 'react';
import PersonalTaskList from '../components/Lists/PersonalTaskList'
import { deleteTasks, getAllTasks, markAsFavorite, completeTask } from '../helper/Tasks';
import { GestureHandlerRootView, GestureDetector, Gesture, Directions} from 'react-native-gesture-handler';
import CanvasList from '../components/Lists/CanvasList';
import { getAssignments } from '../helper/Canvas/Classes';
import Assignments from '../components/Lists/Divs/Assignments'
import PersonalTask from '../components/Lists/Divs/PersonalTask'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function Home() {



  const [isCreateTaskPopup, setCreateTaskPopup] = useState(false)
  const [isCreateCategory, setCreateCategory] = useState(false)
  const [tasks, setTasks] = useState([])
  const [BTnClick, setBtnClick] = useState(1)
  const [isViewCats,setViewCats] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [refresh, setRefresh] = useState(false)
  



  const [expoPushToken, setExpoPushToken] = useState('');
  const [channels, setChannels] = useState([]);
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token),
    );

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? []),
      );
    }
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here', test: { test1: 'more data' } },
      },
      trigger: { seconds: 2 },
    });
  }
  schedulePushNotification()


  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      // EAS projectId is used here.
      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error('Project ID not found');
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(token);
      } catch (e) {
        token = `${e}`;
      }
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }



  useEffect( () => {
    async function fetchData() {
          let data = await getAllTasks()
          setTasks(data.slice())
          console.log(data)
          let data3 = await getAssignments()
          setAssignments(data3.slice())
          setRefresh(false)
       
    }
    
    fetchData()
    }, []);

    const renderItem = ({ item }) => {
      if (item.category) {
        return <PersonalTask task={item} markAsFavorite={click} deleteB={deleteAction} completeTask={completeAction}/>  ;
      } else {
        return <Assignments assignment={item} />;
      }
    };

    const click = async (id) =>{
      await  markAsFavorite(id)
       await setBtnClick(BTnClick+1)
     }
     const deleteAction = async (id) => {
       await deleteTasks(id)
       await setBtnClick(BTnClick+1)
   
     }
     const completeAction = async (task) => {
       await completeTask(task)
       await setBtnClick(BTnClick+1)
     }
     let combinedList = [ ...assignments,...tasks,]
     
     combinedList.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <>
        
          <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{    backgroundColor: '#fff',}}>
                <Text adjustsFontSizeToFit style={{fontWeight:'600',fontSize:20,marginLeft:'10%'}}>Welcome | Tasks: {combinedList.length} </Text>

            </View>

          <SafeAreaView  style={styles.container}>
    
            <FlatList showsVerticalScrollIndicator={false}
                    data={combinedList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    style ={styles.NewJAwn}
                  />

         < StatusBar />
    
        </SafeAreaView>
        </GestureHandlerRootView>
        </>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      contentContainer: {
        flex: 1,
        alignItems: 'center',
        borderRadius:20,
        backgroundColor:'#F6F6F6',
        justifyContent:'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12,
        }
    },
    NewJAwn:{
      backgroundColor:'white',
      width:'90%',
      borderRadius: 15,
      maxHeight:'87%',
      overflow:'scroll'
      
  },
  });