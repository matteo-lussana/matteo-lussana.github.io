function addDrink(){
    table = document.querySelector(".input-table");
    line = document.createElement('tr');
    remove_btn = document.createElement('button');
    drink = document.createElement('input');
    drink.type = "number";
    drink.className = "input-drink"
    time = document.createElement('input');
    time.type = "time";
    time.className = "input-time"
    remove_btn.setAttribute("onClick", "removeDrink()");
    line.appendChild(drink)
    line.appendChild(time)
    line.appendChild(remove_btn)
    table.appendChild(line)
}

function removeDrink(){
    const btn = event.target
    console.log(btn.parentElement)
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

