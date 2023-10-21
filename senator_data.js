var uniqueresult = [];

fetch("D:\Masters Class Learning\Assignments\Web Dev\senator_project\senators.json")
.then(response => response.json())
.then(response => {
    for (var i =0; i< response.objects.length; i++)
    {
        if(uniqueresult.includes(response.obejcts[i].leadership_title))
        {
            continue;
        }
        else
        {
            uniqueresult.push(response.obejcts[i].leadership_title);
        }
    }

    console.log(uniqueresult)
})