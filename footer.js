document.addEventListener("DOMContentLoaded", function () {
    const summaryName = document.querySelector(".memberSummaryName");
    const summary = document.querySelector(".memberSummaryDesc");
    const switcher = document.querySelectorAll(".switchMember button");
    const socialLinks = document.querySelectorAll(".socialLinks a");
    const socialNames = document.querySelectorAll(".socialLinks a i span");

    switcher.forEach(element => {
        element.addEventListener("click", () => {
            fetch("./members.json")
                .then(response => response.json())
                .then(data => {
                    const name = element.id === "musaddique" ? "Musaddique" : "Ritwik";
                    summaryName.textContent = data[name].Name;
                    summary.textContent = data[name].Summary;
                    for(let i = 0; i < socialLinks.length; i++) {
                        socialLinks[i].href = data[name].Social[i].URL;
                        socialNames[i].textContent = data[name].Social[i].Name;
                    }
                });
        });
    });
    switcher[0].click();
});
