import { collection, doc, setDoc, getDocs, deleteDoc} from "firebase/firestore"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth,  } from "firebase/auth";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import {schedulePushNotification} from './Not'

import { db, } from "../provider/FireBaseConfig";



export async function getAllTasks(){
  let data = await getAuth()

  const citiesRef = collection(db, data.currentUser.uid+ 'task');
  const querySnapshot = await getDocs(citiesRef);
  let tasks = []
  querySnapshot.forEach((doc) => {
    let taskData =  doc.data()
      const isoString = new Date((taskData.time.seconds * 1000) + (taskData.time.nanoseconds / 1000000)).toISOString();
      taskData.time = isoString
      const isoString2 = new Date((taskData.date.seconds * 1000) + (taskData.date.nanoseconds / 1000000)).toISOString();
      taskData.date = isoString2
      tasks.push(taskData)
  });

  return tasks


    // try {
    //     const storedTasks = await AsyncStorage.getItem('tasks');
    //     if (storedTasks !== null) {
    //     //  console.log(storedTasks)
    //       return JSON.parse(storedTasks);
    //     }
    //   } catch (error) {
    //     console.error('Error loading tasks:', error);
    //   }
}

export async function addTask(TaskTitleValue, selectedCategory, value, cvalue, NotesValue, isEnabled){
   
 let uuid = await uuidv4()
 let data = await getAuth()
 setDoc(doc(db, data.currentUser.uid + 'task', uuid), {
    id: uuid,  "title":TaskTitleValue, "category":selectedCategory,  "date":value, "time":cvalue,"notes":NotesValue,"notifications":isEnabled,"favorite":false 
 })
  
  // const storedTasks = await AsyncStorage.getItem('tasks');
  //    // console.log('TaskTitleValue'+TaskTitleValue)
  //     if(storedTasks){
  //       let tasks = JSON.parse(storedTasks)
  //       const newTasks = [...tasks, { id: uuidv4(),  "title":TaskTitleValue, "category":selectedCategory,  "date":value, "time":cvalue,"notes":NotesValue,"notifications":isEnabled,"favorite":false }];
  //       await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));

     
     
        if(isEnabled){
          let seconds = Math.floor((new Date(value.toISOString().split("T")[0]+ "T"+ cvalue.toISOString().split("T")[1]).getTime() - new Date().getTime()) / 1000);
          if(seconds <=0){
            console.log("OverDueNoti")
          }else{
            schedulePushNotification(seconds,TaskTitleValue,NotesValue)
          }
     
   }
  //     }else{
  //       const newTasks = [{ id: uuidv4(),  "title":TaskTitleValue, "category":selectedCategory,  "date":value, "time":cvalue,"notes":NotesValue,"notifications":isEnabled,"favorite":false }];
  //       await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  //       if(isEnabled){
  //         let seconds = Math.floor((new Date(value.toISOString().split("T")[0]+ "T"+ cvalue.toISOString().split("T")[1]).getTime() - new Date().getTime()) / 1000);
  //         if(seconds <=0){
  //           console.log("OverDueNoti")
  //         }else{
  //           schedulePushNotification(seconds)
  //         }
  //       }
  //     }
}

export async function markAsFavorite(taskId){
    const storedTasks = await AsyncStorage.getItem('tasks');
    let tasks = JSON.parse(storedTasks)
        const updatedTasks = tasks.map((task) => 
           task.id == taskId ? { ...task, favorite: true } : task
        );
        const favoritedTask = updatedTasks.find((task) => task.id === taskId && task.favorite);
        if (favoritedTask) {
          updatedTasks.splice(updatedTasks.indexOf(favoritedTask), 1);
          updatedTasks.unshift(favoritedTask);
        }
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };


  export async function deleteTasks(taskId){
    // const storedTasks = await AsyncStorage.getItem('tasks');
    // let tasks = JSON.parse(storedTasks)
    // const newTasks = tasks.filter(task => task.id !== taskId);
    // await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    let data = await getAuth()
    deleteDoc(doc(db, data.currentUser.uid + 'task', taskId));
    console.log('done')
  }

  export async function completeTask(task){
    const storedCompletedTasks = await AsyncStorage.getItem('completedtasks');
    if(storedCompletedTasks){
      let compTasks = JSON.parse(storedCompletedTasks)
      const newcompTasks = [...compTasks, { id: task.id,  "title":task.TaskTitleValue, "category":task.selectedCategory,  "date":task.value, "time":task.cvalue,"notes":task.NotesValue,"notifications":task.isEnabled,"favorite":task.isfav }];
      await AsyncStorage.setItem('completedtasks', JSON.stringify(newcompTasks));

    const storedTasks = await AsyncStorage.getItem('tasks');
    let tasks = JSON.parse(storedTasks)
    const newTasks = tasks.filter(stask => stask.id !== task.id);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));

    }else{
      const newcompTasks = [{ id: task.id,  "title":task.TaskTitleValue, "category":task.selectedCategory,  "date":task.value, "time":task.cvalue,"notes":task.NotesValue,"notifications":task.isEnabled,"favorite":task.isfav }];
      await AsyncStorage.setItem('completedtasks', JSON.stringify(newcompTasks));

      const storedTasks = await AsyncStorage.getItem('tasks');
      let tasks = JSON.parse(storedTasks)
      const newTasks = tasks.filter(stask => stask.id !== task.id);
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    }
}