window.onload = function(){
    setting = document.querySelector(".input-setting");
    //sex radio btn
    sex_div = document.createElement("div")
    sex_div.className = "sub-setting"

    label_sex_m = document.createElement("label")
    label_sex_m.className = "label"
    label_sex_m.innerHTML = "male:"
    sex_m = document.createElement("input")
    sex_m.type = "radio"
    sex_m.name = "sex"
    sex_m.className = "radioMale"

    label_sex_f = document.createElement("label")
    label_sex_f.className = "label"
    label_sex_f.innerHTML = "female:"
    sex_f = document.createElement("input")
    sex_f.type = "radio"
    sex_f.name = "sex"
    sex_f.className = "radioFemale"

    sex_div.appendChild(label_sex_m)
    sex_div.appendChild(sex_m)
    sex_div.appendChild(label_sex_f)
    sex_div.appendChild(sex_f)
    setting.appendChild(sex_div)

    //food radio btn
    food_div = document.createElement("div")
    food_div.className = "sub-setting"

    label_w_food = document.createElement("label")
    label_w_food.className = "label"
    label_w_food.innerHTML = "with food:"
    w_food = document.createElement("input")
    w_food.type = "radio"
    w_food.name = "food"
    w_food.className = "radio_w_food"

    label_wo_food = document.createElement("label")
    label_wo_food.className = "label"  
    label_wo_food.innerHTML = "without food:"
    wo_food = document.createElement("input")
    wo_food.type = "radio"
    wo_food.name = "food"
    wo_food.className = "radio_wo_food"

    food_div.appendChild(label_w_food)
    food_div.appendChild(w_food)
    food_div.appendChild(label_wo_food)
    food_div.appendChild(wo_food)
    setting.appendChild(food_div)

    //weigth slider
    weight_div = document.createElement("div")
    weight_div.className = "sub-setting"

    label_weigth = document.createElement("label")
    label_weigth.className = "label"  
    label_weigth.innerHTML = "weigth:"
    weigth = document.createElement("input")
    weigth.type = "range"
    weigth.min = 20
    weigth.max = 100

    weigth.addEventListener('input', () => {

        label = document.querySelector(".label-slider")
        label.innerHTML = event.target.value
    
    });

    text = document.createElement("label")
    text.className = "label label-slider"
    text.innerHTML = 60

    weight_div.appendChild(label_weigth)
    weight_div.appendChild(weigth)
    weight_div.appendChild(text)
    setting.appendChild(weight_div)
    
    bottom = document.querySelector(".bottom-info")
    bottom.innerHTML = "<hr><a href='https://github.com/matteo-lussana'><i class='fa fa-github'></i></a>"
}

function setSlider(){
    label = document.querySelector(".label-slider")
    label.innerHTML = event.target.value
}

function addDrink(){
    table = document.querySelector(".input-table");
    line = document.createElement('tr');
    
    //drink/percentage input
    drink = document.createElement('select');
    drink.className = "input-drink";
    drink.setAttribute("onchange", "customDrink()")

    //drinks_list = [["gin lemon" , 14],["birra",7]]

    for(var i=0; i<drinks_list.length; i++){
        var option = document.createElement('option');
        option.value = drinks_list[i][1];
        option.text = drinks_list[i][0];
        drink.appendChild(option)
    }
    line.appendChild(drink);
    
    custom_drink = document.createElement("option")
    custom_drink.value = -1
    custom_drink.innerHTML = "Custom &#9998;"
    drink.appendChild(custom_drink)

    //select volume input
    volume = document.createElement('select');
    volume.className = "input-volume";
    volumes = ["50 ml", "100 ml", "200 ml", "500 ml", "1 l", "2 l"];
    volumes_v = [50, 100, 200, 500, 1000, 2000];
    for(var i=0; i<volumes.length; i++){
        var option = document.createElement('option');
        option.value = volumes_v[i];
        option.text = volumes[i];
        volume.appendChild(option)
    }
    line.appendChild(volume)

    //time inpute
    time = document.createElement('select');
    time.className = "input-time";
    times = [17,18,19,20,21,22,23,24,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
    for(var i=0; i<times.length; i++){
        var option = document.createElement('option');
        option.value = times[i];
        option.text = times[i];
        time.appendChild(option)
    }
    line.appendChild(time)

    //remove input row
    remove_btn = document.createElement('input');
    remove_btn.type = "button";
    remove_btn.setAttribute("onClick", "removeDrink()");
    remove_btn.className = "input-remove";
    remove_btn.value = "x"
    line.appendChild(remove_btn);
    
    table.appendChild(line);
}

function customDrink(){
    console.log("dio")
    if(event.target.value == -1){
        var custom = prompt("Please enter the alcool percentage (%)", "");
        custom_pos = event.target.children.length-1 //it is the last one
        event.target.children[custom_pos].value = custom
        event.target.children[custom_pos].text = custom + "%"
    }
}

function removeDrink(){
    const btn = event.target
    btn.parentNode.parentNode.removeChild(btn.parentNode)
}

function compute(){
    if(!checkSetting()) return;
    list = Array.from(document.querySelector(".input-table").children);

    
    Perc = []
    Vol = []
    Time = []

    list.forEach(d => {
        info = Array.from(d.children);
        Perc.push(info[0].value);
        Vol.push(parseInt(info[1].value));

        time_str = (info[2].value).split(":")[0]
        Time.push(parseInt(time_str));
    });
    let date = new Date();
    Time.push(date.getHours());
    
    if(Time[0]>Time[Time.length-1])
        for(var i=0; i<Time.length; i++){
            if(Time[i]<12) Time[i] = Time[i] + 24;
        }
    console.log(Time)
    //set user weigth
    P = document.querySelector(".label-slider").innerHTML
    console.log(P)
    //set coiff based on food and sex
    //using bin number [11 = male + w_food, 10 = male + wo_food,
    //                  01 = female + w_food, 00 = female + wo_food]
    bin_num = Number(document.querySelector(".radioMale").checked)*10 + Number(document.querySelector(".radio_w_food").checked)
    dec_num = parseInt(bin_num, 2);
    K = 0;
    switch(dec_num){
        case 0: K = 0.5
            break;
        case 1: K = 0.9
            break;
        case 2: K = 0.7
            break;
        case 3: K = 1.2
            break;
    }
    console.log(K)
    //compute fix variable
    W = (0.8*0.01)/(P*K)
    console.log(W)
    alc = 0
    for(var i=0; i<Time.length-1; i++){
        alc = W*Perc[i]*Vol[i];
        alc = alc - 0.12*(Time[i+1]-Time[i])
    }
    alc = alc.toFixed(2)
    
    hours = (alc/0.12)*60

    if(alc<0) {
        alc = 0
        hours = 0
        changeAnimatio(0)
    }else{
        changeAnimatio(alc)
    }
    document.querySelector(".alc-value").innerHTML = alc;
    document.querySelector(".hour").innerHTML = hours.toFixed(0)
}

function checkSetting(){
    if((document.querySelector(".radioMale").checked || document.querySelector(".radioFemale").checked) && 
        (document.querySelector(".radio_w_food").checked || document.querySelector(".radio_wo_food").checked)){
            return true
        }
    else{
        alert("Hey! You have to select your sex and if you are with or without food");
        return false
    }
}

function changeAnimatio(alcolValue){
    alcolValue = alcolValue*10;
    alcolValue = Math.round(alcolValue)
    var animation = document.head.appendChild(document.createElement("style"))
    animation.innerHTML = '.stickman:before{ content: "";position: absolute; width: 400px; height: 400px; background-color: rgb(107, 14, 30); left:50%; transform: translateX(-50%); border-radius: 40%; animation: a'+alcolValue+' 5s infinite; }'
}
