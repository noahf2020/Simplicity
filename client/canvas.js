const axios = require('axios');
let myToken = '2073~cE5mcOGbroEkXzvt7Q55rVQL117g5WhoqITdT0JRNMFWritmRdideBDSIndNRtBw'

async function getCards(){
    let school = "scienceleadership.instructure.com"
    let request =  await axios({ method: 'get', url: `https://${school}/api/v1/dashboard/dashboard_cards`, headers:{'Authorization': `Bearer ${myToken}`} })
   console.log(request.data)
    

}

async function getCards(){
    let school = "scienceleadership.instructure.com"
    let request =  await axios({ method: 'get', url: `https://${school}/api/v1/dashboard/dashboard_cards`, headers:{'Authorization': `Bearer ${myToken}`} })
   console.log(request.data)
    

}

async function getUpcoming(){
    let todaysDate = "2024-03-10"
    let school = "scienceleadership.instructure.com"
    let request =  await axios({ method: 'get', url: `https://${school}/api/v1/planner/items?start_date=${todaysDate}`, headers:{'Authorization': `Bearer ${myToken}`} })
   console.log(request.data)
    

}
getUpcoming()

//
//https://scienceleadership.instructure.com/api/v1/planner/items?start_date=2024-03-10T05%3A00%3A00.000Z