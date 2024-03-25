let data = {};

apiRequest();


function apiRequest(){
    fetch("./db.json")
    .then(res => res.json())
    .then(response => {
        data = response;
        changeAboutMe();
    })
}


function changeAboutMe(){
    const el = document.getElementById("aboutMeContent");
    el.innerHTML = data.aboutMeContent;
}