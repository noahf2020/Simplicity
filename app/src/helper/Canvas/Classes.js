import { AntDesign, FontAwesome5, Ionicons   } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import { getCanvasApi } from '../Settings';


export async function getClasses(){
    let classes = []
  let myToken = await getCanvasApi();
    //let myToken = '2073~cE5mcOGbroEkXzvt7Q55rVQL117g5WhoqITdT0JRNMFWritmRdideBDSIndNRtBw'
    let school = "westpoint.instructure.com"

    // let request =  await axios({ method: 'get', url: `https://${school}/api/v1/dashboard/dashboard_cards`, headers:{'Authorization': `Bearer ${myToken}`} })      
    // let data = request.data   
    // await data.forEach(async (subject) => {
    //     if(subject.isFavorited){
     
    //     }
   //     console.log(classes)
   let request =  await axios({ method: 'get', url: `https://${school}/api/v1/users/self/courses?include[]=total_scores&include[]=current_grading_period_scores&include[]=restrict_quantitative_data&enrollment_type=student&enrollment_state=active`, headers:{'Authorization': `Bearer ${myToken}`} })      
   let data = request.data   
   data.forEach(async subject2=>{
    //   console.log(subject2.name +": " + subject2.enrollments[0].current_period_computed_current_score)
 
         await classes.push({"name":subject2.name,"grade":subject2.enrollments[0].current_period_computed_current_score,})
   })

  
     return classes;
}

export async function getAssignments(){
  let myToken = await getCanvasApi();
  let school = "westpoint.instructure.com"
//15453~JUVrzRz24DVyhaXM2VfQNwYGXWZnZG94aL76fG9YzB8UtJneRJwZCnTXY2CyDLyX

  let assignments = []
  let request =  await axios({ method: 'get', url: `https://${school}/api/v1/planner/items?start_date=${new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}&end_date=${new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}&per_page=1000`, headers:{'Authorization': `Bearer ${myToken}`} })      
  let data = request.data 
  data.forEach(async assignment =>{
    //console.log(assignment.submissions.missing)
  //  console.log(assignment.submissions)
  console.log(assignment)
if(assignment.submissions.missing ||assignment.submissions.missing && assignment.submissions.late || assignment.submissions.missing && assignment.submissions.late && assignment.submissions.needs_grading || assignment.submissions.submitted){
  await assignments.push({"course":assignment.context_name, "title":assignment.plannable.title, "points":assignment.plannable.points_possible, "date":assignment.plannable.due_at})

}
 })
  return assignments
}