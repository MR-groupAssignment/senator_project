let body = document.querySelector('body');
let main = document.querySelector('main');

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
        if (uniqueParties.indexOf(data.objects[objItr].state) === -1) {
            uniqueStates.push(data.objects[objItr].state);
        }

        if (uniqueRanks.indexOf(data.objects[objItr].senator_rank_label) === -1) {
            uniqueRanks.push(data.objects[objItr].senator_rank_label);
        }
    }


    uniqueParties = Array.from(new Set(uniqueParties));
    uniqueStates = Array.from(new Set(uniqueStates));
    uniqueRanks = Array.from(new Set(uniqueRanks));

    uniqueStates.sort();
    uniqueRanks.sort();

    fetch("https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json")
    .then(response => response.json())
    .then(dataOfStates => {
        uniqueStates.forEach((state, index) => {
            uniqueStates[index] = `${state} - ${dataOfStates[state]}`;
        })

        AddStateFilterValues(uniqueStates);
    })

    FillTableData(data, uniqueParties);
    AddPartyFilterValues(uniqueParties);
    AddRankFilterValues(uniqueRanks);
}

function FillTableData(data, uniqueParties) {
    fetch("https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json")
    .then(response => response.json())
    .then(dataOfStates => {
        var table = document.getElementsByClassName("mainTable")[0];
        for (var j = 0; j < uniqueParties.length; j++) {
            for (var dt = 0; dt < data.objects.length; dt++) {
                if (data.objects[dt].party == uniqueParties[j]) {

                    const senatorInfo = `<tr class="info" onclick="GetSenatorDetails(${dt})">
                                    <td>${data.objects[dt].person.firstname} ${data.objects[dt].person.lastname}</td>
                                    <td>${data.objects[dt].party}</td>
                                    <td>${data.objects[dt].state} - ${dataOfStates[data.objects[dt].state]}</td>
                                    <td>${data.objects[dt].person.gender_label}</td>
                                    <td>${data.objects[dt].senator_rank_label}</td>
                                    </tr>`;

                    table.innerHTML += senatorInfo;
                }
            }
        }
    })
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
        if (partyCell.indexOf(party) !== -1 && stateCell.indexOf(state) !== -1 && rankCell.indexOf(rank) !==-1)
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
    main.style.filter = 'blur(5px)';
    let wrapper = document.querySelector('.senatorDetailsTableWrapper');
    let senateImage = document.querySelector('.senateImage');
    wrapper.style.display = 'flex';
    fetch('./senators.json')
    .then(response => response.json())
    .then(data => {
        let table = document.querySelector('.senatorDetails');
        table.innerHTML = '';

        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.classList.add('senateInfo');
        td1.classList.add('senateRow');
        let td2 = document.createElement('td');
        td2.classList.add('senateRow');
        senateImage.src = ``;
        senateImage.src = `https://www.govtrack.us/static/legislator-photos/${data.objects[index].person.link.split("/")[6]}-200px.jpeg`;

        td1.innerHTML = `Name`
        td2.innerHTML = `${data.objects[index].title} ${data.objects[index].person.firstname} ${data.objects[index].person.middlename} ${data.objects[index].person.lastname}`;
        tr.innerHTML = `${td1.outerHTML}${td2.outerHTML}`
        table.innerHTML += tr.outerHTML

        if (data.objects[index].leadership_title !== null) {
            td1.innerHTML = `Leadership Title`
            td2.innerHTML = `${data.objects[index].leadership_title}`
            tr.innerHTML = `${td1.outerHTML}${td2.outerHTML}`
            table.innerHTML += tr.outerHTML;
        }

        td1.innerHTML = `Description`
        td2.innerHTML = `${data.objects[index].description}`
        tr.innerHTML = `${td1.outerHTML}${td2.outerHTML}`
        table.innerHTML += tr.outerHTML

        td1.innerHTML = `Party`
        td2.innerHTML = `${data.objects[index].party}`
        tr.innerHTML = `${td1.outerHTML}${td2.outerHTML}`
        table.innerHTML += tr.outerHTML

        fetch("https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json")
        .then(response => response.json())
        .then(dataOfStates => {
            td1.innerHTML = `State`
            td2.innerHTML = `${data.objects[index].state} - ${dataOfStates[data.objects[index].state]}`
            tr.innerHTML = `${td1.outerHTML}${td2.outerHTML}`
            table.innerHTML += tr.outerHTML
        })

        td1.innerHTML = `Rank`
        td2.innerHTML = `${data.objects[index].senator_rank_label} ${data.objects[index].senator_class_label}`
        tr.innerHTML = `${td1.outerHTML}${td2.outerHTML}`
        table.innerHTML += tr.outerHTML

        td1.innerHTML = `Start Date`
        td2.innerHTML = `${data.objects[index].startdate}`
        tr.innerHTML = `${td1.outerHTML}${td2.outerHTML}`
        table.innerHTML += tr.outerHTML

        td1.innerHTML = `End Date`
        td2.innerHTML = `${data.objects[index].enddate}`
        tr.innerHTML = `${td1.outerHTML}${td2.outerHTML}`
        table.innerHTML += tr.outerHTML

        td1.innerHTML = `Address`
        td2.innerHTML = `${data.objects[index].extra.address}`
        tr.innerHTML = `${td1.outerHTML}${td2.outerHTML}`
        table.innerHTML += tr.outerHTML

        td1.innerHTML = `Contact Form`
        td2.innerHTML = `<a style="text-decoration:none" target="_blank" href="${data.objects[index].extra.contact_form}">${data.objects[index].extra.contact_form}</a>`
        tr.innerHTML = `${td1.outerHTML}${td2.outerHTML}`
        table.innerHTML += tr.outerHTML

        if (data.objects[index].extra.fax !== undefined) {
            td1.innerHTML = `Fax`
            td2.innerHTML = `${data.objects[index].extra.fax}`
            tr.innerHTML = `${td1.outerHTML}${td2.outerHTML}`
            table.innerHTML += tr.outerHTML
        }

        if (data.objects[index].person.nickname !== "") {
            td1.innerHTML = `Nickname`
            td2.innerHTML = `${data.objects[index].person.nickname}`
            tr.innerHTML = `${td1.outerHTML}${td2.outerHTML}`
            table.innerHTML += tr.outerHTML
        }

        td1.innerHTML = `Gender`
        td2.innerHTML = `${data.objects[index].person.gender_label}`
        tr.innerHTML = `${td1.outerHTML}${td2.outerHTML}`
        table.innerHTML += tr.outerHTML

        td1.innerHTML = `Birthday`
        td2.innerHTML = `${data.objects[index].person.birthday}`
        tr.innerHTML = `${td1.outerHTML}${td2.outerHTML}`
        table.innerHTML += tr.outerHTML

        td1.innerHTML = `Twitter`
        td2.innerHTML = `${data.objects[index].person.twitterid}`
        tr.innerHTML = `${td1.outerHTML}${td2.outerHTML}`
        table.innerHTML += tr.outerHTML

        if (data.objects[index].person.youtubeid !== null) {
            td1.innerHTML = `Youtube`
            td2.innerHTML = `${data.objects[index].person.youtubeid}`
            tr.innerHTML = `${td1.outerHTML}${td2.outerHTML}`
            table.innerHTML += tr.outerHTML
        }

        td1.innerHTML = `Phone`
        td2.innerHTML = `${data.objects[index].phone}`
        tr.innerHTML = `${td1.outerHTML}${td2.outerHTML}`
        table.innerHTML += tr.outerHTML

        td1.innerHTML = `Website`
        td2.innerHTML = `<a style="text-decoration:none" target="_blank" href="${data.objects[index].website}">${data.objects[index].website}</a>`
        tr.innerHTML = `${td1.outerHTML}${td2.outerHTML}`
        table.innerHTML += tr.outerHTML

        td1.innerHTML = `For More Info`
        td2.innerHTML = `<a style="text-decoration:none" target="_blank" href="${data.objects[index].person.link}">${data.objects[index].person.link}</a>`
        tr.innerHTML = `${td1.outerHTML}${td2.outerHTML}`
        table.innerHTML += tr.outerHTML
    })
}

function closeInfoWindow()
{
    main.style.filter = 'none';
    let wrapper = document.querySelector('.senatorDetailsTableWrapper');
    wrapper.style.display = 'none';
}

GetJsonData();