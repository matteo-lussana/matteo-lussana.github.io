window.onload = function(){
    setting = document.querySelector(".input-setting");
    //sex radio btn
    label_sex_m = document.createElement("label")
    label_sex_m.className = "label"
    label_sex_m.innerHTML = "male:"
    sex_m = document.createElement("input")
    sex_m.type = "radio"
    sex_m.name = "sex"

    label_sex_f = document.createElement("label")
    label_sex_f.className = "label"
    label_sex_f.innerHTML = "female:"
    sex_f = document.createElement("input")
    sex_f.type = "radio"
    sex_f.name = "sex"

    setting.appendChild(label_sex_m)
    setting.appendChild(sex_m)
    setting.appendChild(label_sex_f)
    setting.appendChild(sex_f)

    //food radio btn
    br1 = document.createElement("br")
    
    label_w_food = document.createElement("label")
    label_w_food.className = "label"
    label_w_food.innerHTML = "with food:"
    w_food = document.createElement("input")
    w_food.type = "radio"
    w_food.name = "food"

    label_wo_food = document.createElement("label")
    label_wo_food.className = "label"  
    label_wo_food.innerHTML = "without food:"
    wo_food = document.createElement("input")
    wo_food.type = "radio"
    wo_food.name = "food"

    setting.appendChild(br1)
    setting.appendChild(label_w_food)
    setting.appendChild(w_food)
    setting.appendChild(label_wo_food)
    setting.appendChild(wo_food)

    //weigth slider
    br2 = document.createElement("br")
    label_weigth = document.createElement("label")
    label_weigth.className = "label"  
    label_weigth.innerHTML = "weigth:"
    weigth = document.createElement("input")
    weigth.type = "range"
    weigth.min = 20
    weigth.max = 100
    //weigth.setAttribute("input", "setSlider()")

    weigth.addEventListener('input', () => {

        label = document.querySelector(".label-slider")
        label.innerHTML = event.target.value
    
    });

    text = document.createElement("label")
    text.className = "label label-slider"

    setting.appendChild(br2)
    setting.appendChild(label_weigth)
    setting.appendChild(weigth)
    setting.appendChild(text)
    
}

function setSlider(){
    label = document.querySelector(".label-slider")
    label.innerHTML = event.target.value
}

function addDrink(){
    table = document.querySelector(".input-table");
    line = document.createElement('tr');
    
    //drink/percentage input
    drink = document.createElement('input');
    drink.type = "number";
    drink.className = "input-drink";
    line.appendChild(drink);

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
    time = document.createElement('input');
    time.type = "time";
    time.className = "input-time";
    line.appendChild(time)

    //remove input row
    remove_btn = document.createElement('input');
    remove_btn.type = "button";
    remove_btn.setAttribute("onClick", "removeDrink()");
    remove_btn.className = "input-remove";
    line.appendChild(remove_btn);
    
    table.appendChild(line);
}

function removeDrink(){
    const btn = event.target
    btn.parentNode.parentNode.removeChild(btn.parentNode)
}

function compute(){
    list = Array.from(document.querySelector(".input-table").children);

    
    Perc = []
    Vol = []
    Time = []

    list.forEach(d => {
        info = Array.from(d.children);
        Perc.push(info[0].valueAsNumber);
        Vol.push(parseInt(info[1].value));

        time_str = (info[2].value).split(":")[0]
        Time.push(parseInt(time_str));
    });
    let date = new Date()
    Time.push(date.getHours())
    console.log(Perc)
    console.log(Vol)
    console.log(Time)

    alc = 0
    for(var i=0; i<Time.length-1; i++){
        alc = 0.0001785*Perc[i]*Vol[i];
        alc = alc - 0.12*(Time[i+1]-Time[i])
    }
    alc = alc.toFixed(2)
    alcolValue = document.querySelector(".alc-value");
    alcolValue.innerHTML = alc
    changeAnimatio(alc)
}

function changeAnimatio(alcolValue){
    alcolValue = alcolValue*10;
    alcolValue = Math.round(alcolValue)
    var animation = document.head.appendChild(document.createElement("style"))
    animation.innerHTML = '.stickman:before{ content: "";position: absolute; width: 400px; height: 400px; background-color: rgb(107, 14, 30); left:50%; transform: translateX(-50%); border-radius: 40%; animation: a'+alcolValue+' 5s infinite; }'
}
