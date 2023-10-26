
async function GetJsonData() {
    var uniqueParties = [];
    var uniqueStates = [];
    var uniqueRanks = [];

    const jsonfile = './senators.json';

    const promise = await fetch(jsonfile,{mode:'cors'});
    if (!promise.ok) {
        throw new Error(`status:${promise.status}`)
    }

    const data = await promise.json();

    for (var objItr = 0; objItr < data.objects.length; objItr++) {
        if (uniqueParties.indexOf(data.objects[objItr].party) === -1) {
            uniqueParties.push(data.objects[objItr].party);
        }
    }

    for (var objItr = 0; objItr < data.objects.length; objItr++) {
        if (uniqueParties.indexOf(data.objects[objItr].state) === -1) {
            uniqueStates.push(data.objects[objItr].state);
        }
    }

    for (var objItr = 0; objItr < data.objects.length; objItr++) {
        if (uniqueRanks.indexOf(data.objects[objItr].senator_rank_label) === -1) {
            uniqueRanks.push(data.objects[objItr].senator_rank_label);
        }
    }

    FillTableData(data, uniqueParties);
    AddPartyFilterValues(uniqueParties);
    AddStateFilterValues(uniqueStates);
    AddRankFilterValues(uniqueRanks);
}

function FillTableData(data, uniqueParties) {
    var table = document.getElementsByClassName("mainTable")[0];
    var counter = 0;
    for (var j = 0; j < uniqueParties.length; j++) {
        for (var dt = 0; dt < data.objects.length; dt++) {
            if (data.objects[dt].party == uniqueParties[j]) {

                senatorInfo = "<tr class=\"info\" onclick=\"GetSenatorDetails(" + dt + ")\">" + "<td>" + data.objects[dt].person.firstname + " " + data.objects[dt].person.lastname + "</td>" + "<td>" + data.objects[dt].party + "</td>" + "<td>" + data.objects[dt].state + "</td>" + "<td>" + data.objects[dt].person.gender_label + "</td>" + "<td>" + data.objects[dt].senator_rank_label + "</td>" + "</tr></tbody>";

                table.innerHTML += senatorInfo;
            }
        }
    }
}

//directly linked to html select tag
function ApplyFilters() {
    var party = document.getElementById("partyFilter").value.toLowerCase();
    var state = document.getElementById("stateFilter").value.toLowerCase();
    var rank = document.getElementById("rankFilter").value.toLowerCase();

    var informationRows = document.getElementsByClassName("info");
    for(var i=0; i<informationRows.length; i++)
    {
        tableDataArray = informationRows[i].cells;
        var partyCell = tableDataArray[1].innerHTML.toLowerCase();
        var stateCell = tableDataArray[2].innerHTML.toLowerCase();
        var rankCell = tableDataArray[4].innerHTML.toLowerCase();

        if (partyCell.indexOf(party)> -1 && stateCell.indexOf(state)> -1 && rankCell.indexOf(rank)>-1)
        {
            informationRows[i].style.display = "";
        }
        else
        {
            informationRows[i].style.display="none";
        }
    }
}

function AddPartyFilterValues(uniqueParties) {
    const partyFilter = document.getElementById("partyFilter");

    for(var i =0; i <uniqueParties.length;i++)
    {
        var option = document.createElement("option")
        option.innerHTML = uniqueParties[i];
        partyFilter.appendChild(option);
    }
}

function AddStateFilterValues(uniqueStates)
{
    const stateFilter = document.getElementById("stateFilter");

    for(var i =0; i <uniqueStates.length;i++)
    {
        var option = document.createElement("option")
        option.innerHTML = uniqueStates[i];
        stateFilter.appendChild(option);
    }
}

function AddRankFilterValues(uniqueRanks)
{
    const rankFilter = document.getElementById("rankFilter");

    for(var i =0; i <uniqueRanks.length;i++)
    {
        var option = document.createElement("option")
        option.innerHTML = uniqueRanks[i];
        rankFilter.appendChild(option);
    }
}

function GetSenatorDetails(index)
{

}

GetJsonData();