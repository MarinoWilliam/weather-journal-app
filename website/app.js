/* Global Variables */
let baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'ae684c8809f260571a8216177ef33e56';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const getWeather = async (baseUrl, zipCode, apiKey)=>{

  const res = await fetch(`${baseUrl}?q=${zipCode}&appid=${apiKey}`);
    try {
  
      const data = await res.json();
      console.log(data)
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   
  }

  document.getElementById('generate').addEventListener('click', performAction);

  function performAction(e){
    const newzip =  document.getElementById('zip').value;
    const feel=document.getElementById('feelings').value;
    getWeather(baseURL,newzip, apiKey)
    .then(function (data){
      postData('/addData',{temperature : data.main.temperature, date:newDate, feel:feel})
    }).then(function(){
      updateUI()
    })
    
    }



    const updateUI = async() => {
      const request = await fetch('/all');
      try {
          const allData = await request.json();
          console.log(allData);
          document.getElementById('date').innerHTML = allData.date;
          document.getElementById('temp').innerHTML = allData.temperature;
          document.getElementById('content').innerHTML = allData.feel;
          
      } catch (error) {
          console.log('error', error);
      }
  };
    // Async POST
  const postData = async ( url = '', data = {})=>{

  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data), // body data type must match "Content-Type" header        
});

  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
  console.log("error", error);
  }
};

// Async GET
const retrieveData = async (url='') =>{ 
const request = await fetch(url);
try {
// Transform into JSON
const allData = await request.json()
}
catch(error) {
  console.log("error", error);
  // appropriately handle the error
}
};


