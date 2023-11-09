document.addEventListener("DOMContentLoaded", function () {
    const summaryName = document.querySelector(".memberSummaryName");
    const summary = document.querySelector(".memberSummaryDesc");
    const switcher = document.querySelectorAll(".switchMember button");
    const socialLinks = document.querySelectorAll(".socialLinks a");
    const socialNames = document.querySelectorAll(".socialLinks a i span");
    const creatorImage = document.querySelector(".creatorImage img");

    switcher.forEach(element => {
        element.addEventListener("click", () => {
                fetch("./members.json",{mode:'cors'})
                .then(response => response.json())
                .then(data => {
                    const name = element.id === "musaddique" ? "Musaddique" : "Ritwik";
                    summaryName.textContent = data[name].Name;
                    summary.textContent = data[name].Summary;
                    creatorImage.src = data[name].image;
                    for (let i = 0; i < socialLinks.length; i++) {
                        socialLinks[i].href = data[name].Social[i].URL;
                        socialNames[i].textContent = data[name].Social[i].Name;
                    }
                })
                .catch((err)=>{
                    summary.textContent = "Sorry, Cannot display the data right now!";
                });
        });
    });
    switcher[0].click();
});
