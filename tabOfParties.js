document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelector('.tabs');
    const tabButtons = tabs.querySelectorAll('.tabButton');
    const content = document.querySelector('.description');
    const jsonFile = './senators.json';

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            clearTabButtonColors(tabButtons);
            content.innerHTML = "";

            fetch(jsonFile,{mode:'cors'})
                .then(response => response.json())
                .then(data => {
                    arrayOfColors = ['rgb(10, 49, 97)', 'rgb(179, 25, 66)', 'purple'];
                    const contentName = document.createElement('div');
                    const contentTitle = document.createElement('div');
                    
                    content.style.cssText = "font-size: 3.0vw;";
                    contentName.style.cssText = "flex: 1; text-align: right; padding: 2.0vh 2.0vw;";
                    contentTitle.style.cssText = "flex: 2; text-align: left; white-space: nowrap; overflow: auto; padding: 2.0vh 2.0vw;";

                    contentName.innerHTML  = `<br>`;
                    contentTitle.innerHTML = `<br>`;

                    if (button.name === 'republicBtn') {
                        button.style.backgroundColor = `${arrayOfColors[0]}`;
                        displayPartyLeaders(data, contentName, contentTitle, 'Republican', 0);
                    } else if (button.name === 'democratBtn') {
                        button.style.backgroundColor = `${arrayOfColors[1]}`;
                        displayPartyLeaders(data, contentName, contentTitle, 'Democrat', 1);
                    } else {
                        button.style.backgroundColor = `${arrayOfColors[2]}`;
                        content.style.backgroundColor = `${arrayOfColors[2]}`;
                        //todo change contentName.innerHTML
                        contentName.innerHTML = "There is no independent party leader";
                        contentName.style.textAlign = "center";
                        content.appendChild(contentName);
                    }
                    button.style.color = "#CAF0F8";
                    content.animate([{height: '0vmax'}, {height: '55.0vmax'}], {duration: 3000, fill: 'forwards', delay: 0});
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

    function displayPartyLeaders(data, contentName, contentTitle, party, index) {
        content.style.backgroundColor = `${arrayOfColors[index]}`;
        data.objects.forEach(obj => {
            if (obj.party === party && obj.leadership_title !== null) {
                contentName.innerHTML += `${obj.person.firstname} ${obj.person.lastname}&nbsp&nbsp&nbsp<br><br>`;
                contentTitle.innerHTML += `&nbsp&nbsp&nbsp${obj.leadership_title}<br><br>`;
            }
        });

        content.appendChild(contentName);
        content.appendChild(contentTitle);
    }
});
