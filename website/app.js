/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '7cc4e7c8bcb737e09980dc3d49d1e5c2&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

const getWeather = async (baseURL, zipCode, apiKey)=>{

  const response = await fetch(`${baseURL}?q=${zipCode}&appid=${apiKey}`);
    try {
  
      const data = await response.json();
      return data;
    }  catch(error) {
      console.log("error", error);
    }
   
  }

  document.getElementById('generate').addEventListener('click', performAction);

  function performAction(){
    const newzip =  document.getElementById('zip').value;
    const feel=document.getElementById('feelings').value;
    getWeather(baseURL,newzip, apiKey)
    .then(function (data){
      postData('/addData',{temperature : data.main.temp, date:newDate, feel:feel})
    }).then(function(){
      updateUI()
    })
    
    }



    const updateUI = async() => {
      const request = await fetch('/all');
      try {
          const allData = await request.json();
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
}
};


