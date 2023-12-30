import { AntDesign, FontAwesome5, Ionicons   } from '@expo/vector-icons'; 

export function getAllCategories(){
    return categories = [
        {
          "name": "Calndar",
          "color":"#FEF5D3",
          "image":"calendar"
        },
        {
          "name": "Calnda2",
          "color":"#DBECF6",
          "image":"calendar"
        }
      ]
}

export function getCreateCategories(){
  return  categories = [

   
    {label: 'Calendar', value: 'calendar', icon: (color) => <AntDesign name={'calendar'} size={24} color={color|| "black"} /> },
    {label: 'Clipboard', value: 'clipboard-list', icon: (color) => <FontAwesome5 name={'clipboard-list'} size={24} color={color|| "black"} /> },
    {label: 'School', value: 'school-outline', icon: (color) => <Ionicons name={'school-outline'} size={24} color={color|| "black"} /> },
    {label: 'Home', value: 'home-outline', icon: (color) => <Ionicons name={'home-outline'} size={24} color={color|| "black"} /> }
  ]
}