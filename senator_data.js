
async function GetJsonData() {
    var senatorTableData = [[]];
    var uniqueParties = [];
    const jsonfile = './senators.json';

    const promise = await fetch(jsonfile);

    if (!promise.ok) {
        throw new Error(`status:${promise.status}`)
    }

    const data = await promise.json();

    for (var objItr = 0; objItr < data.objects.length; objItr++) {
        if (uniqueParties.indexOf(data.objects[objItr].party) === -1) {
            uniqueParties.push(data.objects[objItr].party);
        }
    }

    FillTableData(data, uniqueParties);
}

function FillTableData(data, uniqueParties) {
    var table = document.getElementsByClassName("mainTable")[0];
    var counter = 0;
    for (var j = 0; j < uniqueParties.length; j++) {
        for (var dt = 0; dt < data.objects.length; dt++) {
            if (data.objects[dt].party == uniqueParties[j]) {

                senatorInfo = "<tr class=\"info\" onclick=\"GetSenatorDetails(" + dt + ")\">" + "<td>" + data.objects[dt].person.firstname + " " + data.objects[dt].person.lastname + "</td>" + "<td>" + data.objects[dt].party + "</td>" + "<td>" + data.objects[dt].state + "</td>" + "<td>" + data.objects[dt].person.gender_label + "</td>" + "<td>" + data.objects[dt].senator_rank_label + "</td>" + "</tr></tbody>";
        
                table.innerHTML+= senatorInfo;
            }
        }
    }
}

//directly linked to html select tag
function ApplyFilters()
{

}

GetJsonData();