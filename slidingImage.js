document.addEventListener('DOMContentLoaded', function() {
    let percentRepublic = document.querySelector('.percentRepublic');
    let percentDemocrat = document.querySelector('.percentDemocrat');
    let percentage = document.querySelectorAll('.percentage');
    const jsonFile = './senators.json';
    percentage.forEach(element => {
        element.addEventListener('mouseover', () => {
            fetch(jsonFile)
                .then(response => response.json())
                .then(data => {
                    countRepublic = 0;
                    countDemocrat = 0;
                    for (i = 0; i < data.objects.length; i++) {
                        if (data.objects[i].party === 'Republican') {
                            countRepublic++;
                        } else if (data.objects[i].party === 'Democrat') {
                            countDemocrat++;
                        }
                    if (element.innerHTML === 'Republican') {
                        element.style.color = 'white';
                        percentRepublic.innerHTML = `${(countRepublic / data.objects.length) * 100}<br><br>`;
                        percentRepublic.innerHTML += `Majority Republican<br><br>`;
                        percentRepublic.innerHTML += `Total ${countRepublic} Members`;
                    }
                    else {
                        percentDemocrat.innerHTML = `${(countDemocrat / data.objects.length) * 100}<br><br>`;
                        percentDemocrat.innerHTML += `Majority Democrat<br><br>`;
                        percentDemocrat.innerHTML += `Total ${countDemocrat} Members`;
                    }
                });
        });
    });

    percentage.forEach(element => {
        element.addEventListener('mouseout', () => {
            percentRepublic.innerHTML = ``;
            percentDemocrat.innerHTML = ``;
        });
    });
});
