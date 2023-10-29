document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelector('.tabs');
    const tabButtons = tabs.querySelectorAll('.tabButton');
    const content = document.querySelector('.description .tableOfTabs');
    const description = document.querySelector('.description');
    const jsonFile = './senators.json';

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            clearTabButtonColors(tabButtons);
            content.innerHTML = "";

            fetch(jsonFile,{mode:'cors'})
                .then(response => response.json())
                .then(data => {
                    arrayOfColors = ['rgb(10, 49, 97)', 'rgb(179, 25, 66)', 'purple'];
                    const tr = document.createElement('tr');
                    const contentName = document.createElement('td');
                    contentName.classList.add('contentName');
                    const contentTitle = document.createElement('td');
                    contentTitle.classList.add('contentTitle');

                    if (button.name === 'republicBtn') {
                        button.style.backgroundColor = `${arrayOfColors[0]}`;
                        displayPartyLeaders(data, tr, contentName, contentTitle, 'Republican', 0);
                    } else if (button.name === 'democratBtn') {
                        button.style.backgroundColor = `${arrayOfColors[1]}`;
                        displayPartyLeaders(data, tr, contentName, contentTitle, 'Democrat', 1);
                    } else if (button.name === 'independentBtn') {
                        button.style.backgroundColor = `${arrayOfColors[2]}`;
                        displayPartyLeaders(data, tr, contentName, contentTitle, 'Independent', 2);
                    }
                    button.style.color = "#CAF0F8";
                    description.animate([{height: '0vmax'}, {height: '75.0vmin'}], {duration: 3000, fill: 'forwards', delay: 0});
                });
        });
    });
    
    tabButtons[0].click();

    function clearTabButtonColors(buttons) {
        buttons.forEach(button => {
            button.style.color = "#515151";
            button.style.backgroundColor = "#ECECEC";
        });
    }

    function displayPartyLeaders(data, tr, contentName, contentTitle, party, index) {
        tr.innerHTML = "";
        description.style.backgroundColor = `${arrayOfColors[index]}`;
        count = 0;
        data.objects.forEach(obj => {
            if (obj.party === party && obj.leadership_title !== null) {
                contentName.innerHTML = `${obj.person.firstname} ${obj.person.lastname}&nbsp&nbsp&nbsp&nbsp&nbsp`;
                contentTitle.innerHTML = `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${obj.leadership_title}`;
                tr.innerHTML = contentName.outerHTML + contentTitle.outerHTML;
                content.innerHTML += tr.outerHTML;
                count++;
            }
        });

        if (count === 0) {
            contentName.innerHTML = `There is no ${party} party leader`;
            contentName.style.textAlign = "center";
            tr.innerHTML = contentName.outerHTML;
            content.innerHTML += tr.outerHTML;
        }
    }
});
