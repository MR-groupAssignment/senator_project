let body = document.querySelector('body');
let main = document.querySelector('main');

async function GetJsonData() {
    const jsonfile = './senators.json';
    const response = await fetch(jsonfile, { mode: 'cors' });
    const data = await response.json();

    const uniqueParties = Array.from(new Set(data.objects.map(obj => obj.party)));
    const uniqueStates = Array.from(new Set(data.objects.map(obj => obj.state)));
    const uniqueRanks = Array.from(new Set(data.objects.map(obj => obj.senator_rank_label)));

    uniqueStates.sort();
    uniqueRanks.sort();

    const statesResponse = await fetch("https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json");
    const statesData = await statesResponse.json();
    const updatedStates = uniqueStates.map(state => `${state} - ${statesData[state]}`);

    AddStateFilterValues(updatedStates);
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
                        let iconOfGender = data.objects[dt].person.gender_label === "Male" ? "♂" : "♀";
                        let iconOfParty = data.objects[dt].party === "Democrat" ? "🫏" : data.objects[dt].party === "Republican" ? "🐘" : "🦅";
                        console.log(iconOfGender)
                        const senatorInfo = `<tr class="info" onclick="GetSenatorDetails(${dt})">
                                            <td>${data.objects[dt].person.firstname} ${data.objects[dt].person.lastname}</td>
                                            <td>${iconOfParty} ${data.objects[dt].party}</td>
                                            <td>${data.objects[dt].state} - ${dataOfStates[data.objects[dt].state]}</td>
                                            <td>${iconOfGender} ${data.objects[dt].person.gender_label}</td>
                                            <td>${data.objects[dt].senator_rank_label}</td>
                                            </tr>`;
                        table.innerHTML += senatorInfo;
                    }
                }
            }
        })
}

function ApplyFilters() {
    const party = document.getElementById("partyFilter").value.toLowerCase();
    const state = document.getElementById("stateFilter").value.toLowerCase();
    const rank = document.getElementById("rankFilter").value.toLowerCase();

    const informationRows = document.getElementsByClassName("info");

    for (const row of informationRows) {
        const [partyCell, stateCell, rankCell] = row.cells;
        const isPartyMatch = partyCell.innerHTML.toLowerCase().includes(party);
        const isStateMatch = stateCell.innerHTML.toLowerCase().includes(state);
        const isRankMatch = rankCell.innerHTML.toLowerCase().includes(rank);

        row.style.display = isPartyMatch && isStateMatch && isRankMatch ? "" : "none";
    }
}

function AddPartyFilterValues(uniqueParties) {
    const partyFilter = document.getElementById("partyFilter");
    for (var i = 0; i < uniqueParties.length; i++) {
        var option = document.createElement("option")
        option.innerHTML = uniqueParties[i];
        partyFilter.appendChild(option);
    }
}

function AddStateFilterValues(uniqueStates) {
    const stateFilter = document.getElementById("stateFilter");
    for (var i = 0; i < uniqueStates.length; i++) {
        var option = document.createElement("option")
        option.innerHTML = uniqueStates[i];
        stateFilter.appendChild(option);
    }
}

function AddRankFilterValues(uniqueRanks) {
    const rankFilter = document.getElementById("rankFilter");

    for (var i = 0; i < uniqueRanks.length; i++) {
        var option = document.createElement("option")
        option.innerHTML = uniqueRanks[i];
        rankFilter.appendChild(option);
    }
}

function GetSenatorDetails(index) {
    main.style.filter = 'blur(5px)';
    let wrapper = document.querySelector('.senatorDetailsTableWrapper');
    let senateImage = document.querySelector('.senate.Image');
    let flag1Image = document.querySelector('.flag1.Image');
    let flag2Image = document.querySelector('.flag2.Image');
    wrapper.style.display = 'flex';

    fetch('./senators.json')
        .then(response => response.json())
        .then(data => {
            let table = document.querySelector('.senatorDetails');
            table.innerHTML = '';

            let createTableRow = (label, value) => {
                let tr = document.createElement('tr');
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                td1.classList.add('senateInfo', 'senateRow');
                td2.classList.add('senateRow');

                td1.innerHTML = label;
                td2.innerHTML = value;

                tr.innerHTML = `${td1.outerHTML}${td2.outerHTML}`;
                table.appendChild(tr);
            };

            let senator = data.objects[index];

            senateImage.src = `https://www.govtrack.us/static/legislator-photos/${senator.person.link.split("/")[6]}-200px.jpeg`;

            let partyLogo = './images/';
            if (senator.party === "Democrat") {
                partyLogo += 'democraticPartyyLogo.avif';
            } else if (senator.party === "Republican") {
                partyLogo += 'republicanPartyLogo.avif';
            } else if (senator.party === "Independent") {
                partyLogo += 'independentPartyLogo.avif';
            }
            flag1Image.src = partyLogo;
            flag2Image.src = partyLogo;

            createTableRow('Name', `${senator.title} ${senator.person.firstname} ${senator.person.middlename} ${senator.person.lastname}`);

            if (senator.leadership_title !== null) {
                createTableRow('Leadership Title', senator.leadership_title);
            }

            createTableRow('Description', senator.description);
            createTableRow('Party', senator.party);

            fetch("https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json")
                .then(response => response.json())
                .then(dataOfStates => {
                    createTableRow('State', `${senator.state} - ${dataOfStates[senator.state]}`);
                    createTableRow('Rank', `${senator.senator_rank_label} ${senator.senator_class_label}`);
                    createTableRow('Start Date', senator.startdate);
                    createTableRow('End Date', senator.enddate);
                    createTableRow('Address', senator.extra.address);
                    createTableRow('Contact Form', `<a class="styleToLink" target="_blank" href="${senator.extra.contact_form}">${senator.extra.contact_form}</a>`);

                    if (senator.extra.fax !== undefined) {
                        createTableRow('Fax', senator.extra.fax);
                    }

                    if (senator.person.nickname !== "") {
                        createTableRow('Nickname', senator.person.nickname);
                    }

                    createTableRow('Gender', senator.person.gender_label);
                    createTableRow('Birthday', senator.person.birthday);
                    createTableRow('Twitter', senator.person.twitterid);

                    if (senator.person.youtubeid !== null) {
                        createTableRow('Youtube', senator.person.youtubeid);
                    }

                    createTableRow('Phone', senator.phone);
                    createTableRow('Website', `<a class="styleToLink" target="_blank" href="${senator.website}">${senator.website}</a>`);
                    createTableRow('For More Info', `<a class="styleToLink" target="_blank" href="${senator.person.link}">${senator.person.link}</a>`);
                });
        });
}

function closeInfoWindow() {
    main.style.filter = 'none';
    let wrapper = document.querySelector('.senatorDetailsTableWrapper');
    wrapper.style.display = 'none';
}

GetJsonData();

