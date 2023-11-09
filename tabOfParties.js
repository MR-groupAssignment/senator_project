document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelector('.tabs');
    const tabButtons = tabs.querySelectorAll('.tabButton');
    const content = document.querySelector('.description .tableOfTabs');
    const description = document.querySelector('.description');
    const jsonFile = './senators.json';
    const leader = document.getElementById('leaders');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            clearTabButtonColors(tabButtons);
            content.innerHTML = "";
            arrayOfColors = ['rgba(179, 25, 66, 0.5)', 'rgba(10, 49, 97, 0.5)','rgba(128, 0, 128, 0.5)'];
            arrayOfTextColors = ['#ba002f', '#023E8A', '#800080'];
            arrayOfStrokeColors = ['#ff99a5', '#81c4ff', '#ff72ff'];
            arrayOfBackground = ['./images/republican.avif', './images/democrat.avif', './images/independent.avif'];
            const tr = document.createElement('tr');
            const contentName = document.createElement('td');
            contentName.classList.add('contentName');
            const contentTitle = document.createElement('td');
            contentTitle.classList.add('contentTitle');
            if (button.name === 'republicBtn')
            {
                button.style.backgroundColor = `${arrayOfColors[0]}`;
                button.style.color = `${arrayOfTextColors[0]}`;
                button.style.webkitTextStroke = `0.1vw ${arrayOfStrokeColors[0]}`;
                leader.style.backgroundImage = `url(${arrayOfBackground[0]})`;
            }
            else if (button.name === 'democratBtn')
            {
                button.style.backgroundColor = `${arrayOfColors[1]}`;
                button.style.color = `${arrayOfTextColors[1]}`;
                button.style.webkitTextStroke = `0.1vw ${arrayOfStrokeColors[1]}`;
                leader.style.backgroundImage = `url(${arrayOfBackground[1]})`;
            }
            else if (button.name === 'independentBtn')
            {
                button.style.backgroundColor = `${arrayOfColors[2]}`;
                button.style.color = `${arrayOfTextColors[2]}`;
                button.style.webkitTextStroke = `0.1vw ${arrayOfStrokeColors[2]}`;
                leader.style.backgroundImage = `url(${arrayOfBackground[2]})`;
            }
                fetch(jsonFile,{mode:'cors'})
                .then(response => response.json())
                .then(data => {
                    if (button.name === 'republicBtn') {
                        displayPartyLeaders(data, tr, contentName, contentTitle, 'Republican', 0);
                    } else if (button.name === 'democratBtn') {
                        displayPartyLeaders(data, tr, contentName, contentTitle, 'Democrat', 1);
                    } else if (button.name === 'independentBtn') {
                        displayPartyLeaders(data, tr, contentName, contentTitle, 'Independent', 2);
                    }
                    button.style.transition = "all 0.5s ease-in-out";
                    description.animate([{height: '0vmax'}, {height: '80.0vw'}], {duration: 5000, fill: 'forwards', delay: 0});
                })
                .catch((error) =>
                {
                    description.innerHTML ="";
                    description.innerHTML += "<p>" + "Sorry not able to fetch data" +"</p>";
                    button.style.transition = "all 0.5s ease-in-out";
                    description.animate([{height: '0vmax'}, {height: '80.0vw'}], {duration: 5000, fill: 'forwards', delay: 0});

                });
        });
    });
    tabButtons[0].click();

    function clearTabButtonColors(buttons) {
        buttons.forEach(button => {
            button.style.color = "#515151";
            button.style.webkitTextStroke = "0.1vw #b9b9b9";
            button.style.backgroundColor = "rgba(236, 236, 236, 0.5)";
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