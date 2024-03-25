let data = {};

fetch("./db.json").then(res => res.json()).then(response => {
    data = response;
    changeSubTitle();
});


function changeSubTitle(){
    const el = document.getElementById("subtitle");
    el.innerText = data.subtitle;
}

function changeSkills(){
    const el = document.querySelector(".skills");

    let text = "";
}



const el = document.querySelector(".socialMedias");

let text = "";
for(let sc of data.socialMedias){
    text += `
    <a href="${sc.url}" title="${sc.name}">
        <i class="${sc.icon}"></i>
    </a>
    `
}