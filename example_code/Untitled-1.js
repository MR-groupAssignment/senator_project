var uniqueresult = [];

fetch("../senators.json")
.then(response => response.json())
.then(response =>
    {
        for(var i=0; i< response.objects.length; i++)
        {
            // console.log(response.objects[i].leadership_title)
            if (response.objects[i].leadership_title !== null && response.objects[i].party === "Republican")
            {
                uniqueresult.push(response.objects[i].leadership_title)
            }
        }
        console.log(uniqueresult)
    } )