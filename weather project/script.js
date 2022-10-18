document.querySelector('.busca').addEventListener('submit', async(e)=>{
    e.preventDefault();

    let input = document.querySelector('#searchInput').value; 
    
    if(input !== ''){
        clearInfo();
        showWarning('Carregando...');
        
        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&units=metric&lang=pt_br&appid=c693fb9de4dbac3dc3394edfb468a685`);
        let json = await results.json();

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        }else{
         clearInfo();
         showWarning('cidade nao encontrada!');
     
        }
    }else{
        clearInfo();
    }

});

let showInfo = (obj) => {
    showWarning('');
    
    document.querySelector('.titulo').innerHTML = `${obj.name} ${obj.country}`;
    document.querySelector('.tempInfo').innerHTML = `<sup>${obj.temp}ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `<span>${obj.windSpeed}km/h</span>`
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${obj.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${obj.windAngle -90}deg)`

    document.querySelector('.resultado').style.display = 'block';
}

let clearInfo = () =>{
    showWarning('');
    document.querySelector('.resultado').style.display = 'none'; 
}

let showWarning = (msg) => {
    document.querySelector('.aviso').innerHTML = msg
}
