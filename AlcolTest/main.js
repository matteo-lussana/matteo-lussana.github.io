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

    alc_time = []

    list.forEach(d => {
        info = Array.from(d.children);
        Alc = info[0].valueAsNumber
        Time = info[1].value
        alc_time.push([Alc, Time])
    });
    sum = 0;
    alc_time.forEach(d => {
        sum += d[0];
    });
    sum = sum.toFixed(2)
    alcolValue = document.querySelector(".alc-value");
    alcolValue.innerHTML = sum
    changeAnimatio(sum)
}

function changeAnimatio(alcolValue){
    alcolValue = alcolValue*10;
    alcolValue = Math.round(alcolValue)
    var animation = document.head.appendChild(document.createElement("style"))
    animation.innerHTML = '.stickman:before{ content: "";position: absolute; width: 400px; height: 400px; background-color: rgb(107, 14, 30); left:50%; transform: translateX(-50%); border-radius: 40%; animation: a'+alcolValue+' 5s infinite; }'
}

