function addDrink(){
    table = document.querySelector(".input-table");
    line = document.createElement('tr');
    drink = document.createElement('input');
    drink.type = "number";
    time = document.createElement('input');
    time.type = "time";
    line.appendChild(drink)
    line.appendChild(time)
    table.appendChild(line)
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
    console.log(alc_time)
    alcolValue = document.querySelector(".alcool");
    alcolValue.innerHTML = sum
}