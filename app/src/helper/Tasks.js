import { doc, setDoc } from "firebase/firestore"; 
import AsyncStorage from '@react-native-async-storage/async-storage';


import 'react-native-get-random-values';

import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';

let tasksNotUsedAnymore = [
    {
        "id":"40fbdb8c-8d41-4f87-8xc6a-f37760353b2c",
        "title":"Email Mr. Clapper",
        "category":"Calndar",
        "date":"2023-12-24",
        "time":"01:07",
        "notes":"Testing",
        "notifications":false,
        "favorite":false
    },
    {
        "id":"17493975-c39a-414c-b7f7-422082csasd32662",
        "title":"Email Mr. Clapper2",
        "category":"Calnda2",
        "date":"2023-12-24",
        "time":"01:07",
        "notes":"Testing",
        "notifications":false,
        "favorite":false
        },
        {
            "id":"17493975-c39a-414c-b7f7-422082cahfhfsdasd32662",
            "title":"Email Mr. Clapper2",
            "category":"Calnda2",
            "date":"2023-12-24",
            "time":"01:07",
            "notes":"Testing",
            "notifications":false,
            "favorite":false
            },
            {
                "id":"17493975-c39a-414c-b7f7-422dfgdfhfg082c32662",
                "title":"Email Mr. Clapper2",
                "category":"Calnda2",
                "date":"2023-12-24",
                "time":"01:07",
                "notes":"Testing",
                "notifications":false,
                "favorite":false
                },
                {
                    "id":"17493sad75-c39a-414c-b7f7-422082c32662",
                    "title":"Email Mr. Clapper2",
                    "category":"Calndar",
                    "date":"2023-12-24",
                    "time":"01:07",
                    "notes":"Testing",
                    "notifications":false,
                    "favorite":false
                    },
                    {
                        "id":"17dfg975-c39a-414c-b7f7-42asd662",
                        "title":"Email Mr. Clapper2",
                        "category":"Calnda2",
                        "date":"2023-12-24",
                        "time":"01:07",
                        "notes":"Testing",
                        "notifications":false,
                        "favorite":false
                        },
                        {
                            "id":"17493dfgd975-c39a-414c-b7f7-42208gdf2c32662",
                            "title":"Email Mr. Clapper2",
                            "category":"Calnda2",
                            "date":"2023-12-24",
                            "time":"01:07",
                            "notes":"Testing",
                            "notifications":false,
                            "favorite":false
                            },
                            {
                                "id":"174asdg93975-c39fsda-414c-b7f7-422082c3sdasd2662",
                                "title":"Email Mr. Clapper2",
                                "category":"Calndar",
                                "date":"2023-12-24",
                                "time":"01:07",
                                "notes":"Testing",
                                "notifications":false,
                                "favorite":false
                                },
]




export async function getAllTasks(){
    try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks !== null) {
          console.log(JSON.parse(storedTasks))
          return JSON.parse(storedTasks);
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
}

export async function addTask(TaskTitleValue, selectedCategory, value, cvalue, NotesValue, isEnabled){
      const storedTasks = await AsyncStorage.getItem('tasks');
      console.log('TaskTitleValue'+TaskTitleValue)
      if(storedTasks){
        let tasks = JSON.parse(storedTasks)
        const newTasks = [...tasks, { id: uuidv4(),  "title":TaskTitleValue, "category":selectedCategory,  "date":value, "time":cvalue,"notes":NotesValue,"notifications":isEnabled,"favorite":false }];
        await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      }else{
        const newTasks = [{ id: uuidv4(),  "title":TaskTitleValue, "category":selectedCategory,  "date":value, "time":cvalue,"notes":NotesValue,"notifications":isEnabled,"favorite":false }];
        await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      }
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
    const storedTasks = await AsyncStorage.getItem('tasks');
    let tasks = JSON.parse(storedTasks)
    const newTasks = tasks.filter(task => task.id !== taskId);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
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