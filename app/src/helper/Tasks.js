import { doc, setDoc } from "firebase/firestore"; 


let tasks = [
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

export function getAllTasks(){
    return tasks;
}


export function markAsFavorite(taskId){

        const updatedTasks = tasks.map((task) =>
           task.id == taskId ? { ...task, favorite: true } : task
        );
      
        const favoritedTask = updatedTasks.find((task) => task.id === taskId && task.favorite);
        if (favoritedTask) {
          updatedTasks.splice(updatedTasks.indexOf(favoritedTask), 1);
          updatedTasks.unshift(favoritedTask);
        }
        console.log(updatedTasks)
        //Once Db is set make sure this actually updates data
        tasks = updatedTasks;
  
      
  };

 