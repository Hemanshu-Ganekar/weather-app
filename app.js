let baseurl = "https://api.weatherapi.com/v1/current.json?key=507363e680414c85ac1100853250407&q=";
let place = document.querySelector(".place");
let temp = document.querySelector(".temp");
let humid = document.querySelector(".humidcount");
let wind = document.querySelector(".windcount");
let btn = document.querySelector("button");
let url;
let city = document.querySelector(".location")
let response;
let data;
let scene=document.querySelector(".condition");
let img=document.querySelector(".icon");
let select=document.querySelector("select");
let extra=document.querySelector(".extra");
let updateextra=(data)=>{
    if(select.value=="feelslike_c"){
        let value=data.current.feelslike_c;
extra.textContent=`Feels like ${value} °C`;
    }
     else if(select.value=="dewpoint_c"){
        let value=data.current.dewpoint_c;
extra.textContent=`Dewpoint ${value} °C`;
    }
     else if(select.value=="uv"){
        let value=data.current.uv;
extra.textContent=`Ultra voilet Index ${value} `;
    }
 else if(select.value=="vis_km"){
        let value=data.current.vis_km;
extra.textContent=`Visibility ${value} km`;
    }
};
let updateplace = (data) => {
    let newcity = data.location.name;
    city.textContent = newcity;
};
let updatetemp = (data) => {
    let newtemp = data.current.temp_c;
    temp.textContent = `${newtemp}°C`
};
let updatecondition=(data)=>{
let newcondition=data.current.condition.text;
scene.textContent=newcondition;
};
let updatehumid=(data)=>{
let newhumid=data.current.humidity;
humid.textContent=`${newhumid}%`;
};
let updatewind=(data)=>{
let newwind=data.current.wind_kph;
wind.textContent=`${newwind}km/hr`;
};
let updateimg=(data)=>{
let newimg=data.current.condition.icon;
newimg=`https:`+newimg;
console.log(newimg);
img.style.backgroundImage=`url(${newimg})`;
};
let updatebg=(data)=>{
    let  newcondition=data.current.condition.text;
    let color=bgColors[newcondition] || "#4A536B";
    document.querySelector(".plate").style.backgroundColor=color;
}

btn.addEventListener("click",
    async () => {
        url = `${baseurl}${place.value}&aqi=no`
        console.log(url);
        response = await fetch(url);

        data = await response.json();

        console.log(data);
        updateplace(data);
        updatetemp(data);
        updatecondition(data);
        updatehumid(data);
        updatewind(data);
        updateimg(data);
        updatebg(data);
        
        document.querySelector(".lowerside").classList.remove("disabled");
        document.querySelector(".i").classList.remove("logo");
        

        document.querySelector("#showmore").addEventListener("change",()=>{
         updateextra(data);
            document.querySelector(".extra").classList.remove("disabled");
        })
    }
)
