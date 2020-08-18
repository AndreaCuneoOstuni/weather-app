// Web API and URL
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=3b3e88109bef8fb5d11b3cbf5f2f5be2&units=imperial';

// Todays date
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// The submit button
document.getElementById('generate').addEventListener('click', performAction);

//Action on click button
function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(baseURL, zipCode, apiKey)
    .then((data) => {
        postData('/add', {
            name: data.name,
            date: newDate,
            temperature: data.main.temp,
            feelings: feelings
        });
    })
    .then(() => {
        updateUI();
    });
}

// getWeather function
const getWeather = async (baseURL, zipCode, apiKey) => {
    const res = await fetch(baseURL + zipCode + apiKey);

    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

// POST
const postData = async ( url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

// Update the UI
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json()
        document.getElementById('location').innerHTML = `City Name: ${allData.name}`;
        document.getElementById('date').innerHTML = `Today's date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature}`;
        document.getElementById('content').innerHTML = `Expressed feelings: ${allData.feelings}`;
    } catch (error) {
        console.log('error', error);
    }
}
