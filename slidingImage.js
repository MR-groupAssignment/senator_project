document.addEventListener('DOMContentLoaded', function () {
    let percentRepublic = document.querySelector('.percentRepublic');
    let percentDemocrat = document.querySelector('.percentDemocrat');
    let percentIndependent = document.querySelector('.percentIndependent');
    const imageRepublic = document.querySelector('.imageRepublic');
    const imageDemocrat = document.querySelector('.imageDemocrat');
    const imageIndependent = document.querySelector('.imageIndependent');
    let percentage = document.querySelectorAll('.percentage');
    const video = document.querySelector('.entryVideo video');
    const playButton = document.querySelector('.play');
    const videoText = document.querySelector('.videoText');
    const videoLayer = document.querySelector('.videoLayer');

    const jsonFile = './senators.json';
    setTimeout(function () {
        percentage.forEach(function (element) {
            element.innerHTML = 'Now'
            let countRepub = 0;
            let countDemo = 0;
            let countInde = 0;
            element.addEventListener('mouseover', function () {
                element.innerHTML = '';

                    fetch(jsonFile,{mode:'cors'})
                    .then(response => response.json())
                    .then(data => {
                        let countRepublic = 0;
                        let countDemocrat = 0;
                        let countIndependent = 0;
                        for (let i = 0; i < data.objects.length; i++) {
                            if (data.objects[i].party === "Republican") {
                                countRepublic++;
                            } else if (data.objects[i].party === "Democrat") {
                                countDemocrat++;
                            }
                            else if (data.objects[i].party === "Independent") {
                                countIndependent++;
                            }
                        }
                        if (element.classList.contains('percentRepublic') && countRepub === 0) {
                            countRepub++;
                            percentRepublic.innerHTML +=`${(countRepublic / data.objects.length) * 100}%<br>`;
                            percentRepublic.innerHTML += `Majority Republicans<br>`;
                            percentRepublic.innerHTML += `Total ${countRepublic} Members`;
                            imageRepublic.style.animation = 'flip 2.0s 0s alternate linear';
    
                        } 
                        else if (element.classList.contains('percentDemocrat') && countDemo === 0) {
                            countDemo++;
                            percentDemocrat.innerHTML +=`${(countDemocrat / data.objects.length) * 100}%<br>`;
                            percentDemocrat.innerHTML += `Majority Democrat<br>`;
                            percentDemocrat.innerHTML += `Total ${countDemocrat} Members`;
                            imageDemocrat.style.animation = 'flip 2.0s 0s alternate linear';
                        }
                        else if (element.classList.contains('percentIndependent') && countInde === 0) {
                            countInde++;
                            percentIndependent.innerHTML +=`${(countIndependent / data.objects.length) * 100}%<br>`;
                            percentIndependent.innerHTML += `Majority Independent<br>`;
                            percentIndependent.innerHTML += `Total ${countIndependent} Members`;
                            imageIndependent.style.animation = 'flip 2.0s 0s alternate linear';
                        }
                    }
                    )
                    .catch((error) =>
                    {
                        document.getElementsByClassName("percentRepublic")[0].innerHTML = "Sorry not able to fetch data";
                        document.getElementsByClassName("percentDemocrat")[0].innerHTML = "Sorry not able to fetch data";
                        document.getElementsByClassName("percentIndependent")[0].innerHTML = "Sorry not able to fetch data";
                    });
            });

            element.addEventListener('mouseout', function () {
                if (element.classList.contains('percentRepublic') && countRepub === 1) {
                    countRepub--;
                    percentRepublic.innerHTML = '';
                    imageRepublic.style.animation = 'none';
                } else if (element.classList.contains('percentDemocrat') && countDemo === 1) {
                    countDemo--;
                    percentDemocrat.innerHTML = '';
                    imageDemocrat.style.animation = 'none';
                }
                else if (element.classList.contains('percentIndependent') && countInde === 1) {
                    countInde--;
                    percentIndependent.innerHTML = '';
                    imageIndependent.style.animation = 'none';
                }
            });
        });
    }, 12000);

    function changeVideo() {
        if (video.paused) {
            video.play();
            playButton.style.opacity = '0';
            videoText.style.opacity = '0';
        } else {
            video.pause();
            playButton.style.opacity = '1';
            videoText.style.opacity = '1';
        }
        videoText.animate([
            { width: '0%' },
            { width: '100%' }
        ], {
            duration: 1000,
            fill: 'forwards'
        });
    }

    video.addEventListener('click', function () {
        changeVideo();
    });

    videoLayer.addEventListener('click', function () {
        changeVideo();
    });
});
