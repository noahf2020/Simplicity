import { AntDesign, FontAwesome5, Ionicons   } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'


export async function getClasses(){
    let classes = []
    let myToken = '2073~cE5mcOGbroEkXzvt7Q55rVQL117g5WhoqITdT0JRNMFWritmRdideBDSIndNRtBw'
    let school = "scienceleadership.instructure.com"

    // let request =  await axios({ method: 'get', url: `https://${school}/api/v1/dashboard/dashboard_cards`, headers:{'Authorization': `Bearer ${myToken}`} })      
    // let data = request.data   
    // await data.forEach(async (subject) => {
    //     if(subject.isFavorited){
     
    //     }
   //     console.log(classes)
   let request =  await axios({ method: 'get', url: `https://${school}/api/v1/users/self/courses?include[]=total_scores&include[]=current_grading_period_scores&include[]=restrict_quantitative_data&enrollment_type=student&enrollment_state=active`, headers:{'Authorization': `Bearer ${myToken}`} })      
   let data = request.data   
   data.forEach(async subject2=>{
       console.log(subject2.name +": " + subject2.enrollments[0].current_period_computed_current_score)

         await classes.push({"name":subject2.name,"grade":subject2.enrollments[0].current_period_computed_current_score,})
   })

  
     return classes;
}