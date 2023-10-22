// var uniqueresult = [];


// var jsondata = require("../senator_project/senators.json");
// console.log(jsondata);
// fetch("../senators.json")
// var jasondata = await(function(response){

//     jsondata = response.json()
//     return jsondata;
// })
// console.log(jasondata)

async function GetJsonData()
{
    const promise = await fetch("../senators.json")

    if(!promise.ok)
    {
        throw new Error(`status:${promise.status}`)
    }

    const data = await promise.json();
    return data;
}

let v = GetJsonData().then(response=> console.log('fuck you'));


function PartyInfoProvider(event, partyName, index)
{
    var colors = ['red', 'blue', 'purple'];
    //selecting the div where we will write the data for all parties
    var content = document.querySelector('.description');
    //setting the div display as none is important otherwise 
    //the data from first click will always be on top
    content.innerHTML = "";

    //selecting all tab buttons
    var buttons = document.getElementsByClassName("tabButton")
    //changing the button color so that it reflects change of tab
    for (var i=0; i<buttons.length;i++)
    {
        buttons[i].style.backgroundColor = "";
    }

    //TODO: add data from json file to this content div

    let contentHeader = document.createElement('h2');
    contentHeader.textContent =  partyName;
    content.appendChild(contentHeader);

    //making the content div visible again with new data
    content.style.display='block';

    //adding colors to the buttons
    if(index == 0)
    buttons[index].style.backgroundColor = colors[index];
    else if(index == 1)
    buttons[index].style.backgroundColor = colors[index];
    else if(index == 2)
    buttons[index].style.backgroundColor = colors[index];
}
//this ensures that the tab containing data for republicans remains open by default
document.getElementById("defaultTab").click();