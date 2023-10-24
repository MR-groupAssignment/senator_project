document.addEventListener('DOMContentLoaded', function() {
    let percentRepublic = document.querySelector('.percentRepublic');
    let percentDemocrat = document.querySelector('.percentDemocrat');
    let percentage = document.querySelectorAll('.percentage');
    const video = document.querySelector('.entryVideo video');
    const playButton = document.querySelector('.play');

    const jsonFile = './senators.json';

    percentage.forEach(function(element) {
        let countRepub = 0;
        let countDemo = 0;
        element.addEventListener('mouseover', function() {
            fetch(jsonFile)
            .then(response => response.json())
            .then(data => {
                let countRepublic = 0;
                let countDemocrat = 0;
                for (i = 0; i < data.objects.length; i++) {
                    if (data.objects[i].party === "Republican") {
                        countRepublic++;
                    } else if (data.objects[i].party === "Democrat") {
                        countDemocrat++;
                    }
                }
                if (element.classList.contains('percentRepublic') && countRepub === 0) {
                    countRepub++;
                    percentRepublic.style.cssText = 'text-align: center; font-size: 3.0vw; color: #023E8A; text-shadow: #b8e6ff 0.1vw 0.1vw 0vw;';
                    percentRepublic.innerHTML +=`${(countRepublic / data.objects.length) * 100}%<br>`;
                    percentRepublic.innerHTML += `Majority Republican<br>`;
                    percentRepublic.innerHTML += `Total ${countRepublic} Members`;
                } 
                else if (element.classList.contains('percentDemocrat') && countDemo === 0) {
                    countDemo++;
                    percentDemocrat.style.cssText = 'text-align: center; font-size: 3.0vw; color: #ad1940; text-shadow: rgb(255 169 169) 0.1vw 0.1vw 0vw;';
                    percentDemocrat.innerHTML +=`${(countDemocrat / data.objects.length) * 100}%<br>`;
                    percentDemocrat.innerHTML += `Majority Democrat<br>`;
                    percentDemocrat.innerHTML += `Total ${countDemocrat} Members`;
                }
            });
        });
        element.addEventListener('mouseout', function() {
            if (element.classList.contains('percentRepublic') && countRepub === 1) {
                countRepub--;
                percentRepublic.innerHTML = '';
            } else if (element.classList.contains('percentDemocrat') && countDemo === 1) {
                countDemo--;
                percentDemocrat.innerHTML = '';
            }
        });
    });

    playButton.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            // playButton.style.display = 'none';
        } else {
            video.pause();
            // playButton.style.display = 'block';
        }
    });
});
