document.addEventListener('DOMContentLoaded', function() { // Runs when the DOM is loaded and ready to be manipulated

    const tabs = document.querySelector('.tabs');
    let tabButton = tabs.querySelectorAll('.tabButton');
    let content = document.querySelector('.description');

    tabButton.forEach(item => { // Inside this forEach() loop, will read json file and create a new tab for each senator
        item.addEventListener('click', () => {
            for (var i=0; i<tabButton.length;i++)
            {
                tabButton[i].style.backgroundColor = "#515151";
            }  
            content.innerHTML = "";      
            jsonFile = './senators.json';
            fetch(jsonFile)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                item.style.backgroundColor = "red";
                let contentTitle = document.createElement('div');
                let contentName = document.createElement('div');
                contentName.style.textAlign = "right";
                contentTitle.style.textAlign = "left";
                contentName.style.flex = "1";
                contentTitle.style.flex = "1";
                content.style.backgroundColor = "red";
                if (item.name === 'republicBtn'){
                    for(let i = 0; i < data.objects.length; i++){
                        if(data.objects[i].party === 'Republican' && data.objects[i].leadership_title !== null){
                            contentName.innerHTML += `${data.objects[i].person.firstname}&nbsp${data.objects[i].person.lastname}&nbsp&nbsp&nbsp<br>`;
                            contentTitle.innerHTML += `&nbsp&nbsp&nbsp${data.objects[i].leadership_title}<br>`;
                        }
                    }
                    content.appendChild(contentName);
                    content.appendChild(contentTitle);
                }
                else if(item.name === 'democratBtn'){
                    for(let i = 0; i < data.objects.length; i++){
                        if(data.objects[i].party === 'Democrat'  && data.objects[i].leadership_title !== null){
                            contentName.innerHTML += `${data.objects[i].person.firstname}&nbsp${data.objects[i].person.lastname}&nbsp&nbsp&nbsp<br>`;
                            contentTitle.innerHTML += `&nbsp&nbsp&nbsp${data.objects[i].leadership_title}<br>`;
                        }
                    }
                    content.appendChild(contentName);
                    content.appendChild(contentTitle);        
                }
                else{
                    contentName.innerHTML += `There is No independent party leader`;
                    contentName.style.textAlign = "center";
                    content.appendChild(contentName);      
                }
            });
        });
    })
});