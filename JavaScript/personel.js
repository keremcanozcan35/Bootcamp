let personels = [];

function save(event){
    event.preventDefault();
    console.log(event);
    const firstNameInputElement = document.getElementById("firstName");
    const lasttNameInputElement = document.getElementById("lastName");
    const professionInputElement = document.getElementById("profession");
    const startDateInputElement = document.getElementById("startDate");
    const salaryInputElement = document.getElementById("salary");



    const data = {
        firstName: firstNameInputElement.value,
        lastName: lasttNameInputElement.value,
        profession: professionInputElement.value,
        startDate: startDateInputElement.value,
        salary: salaryInputElement.value
    }

    personels.push(data);
    console.log(personels);
    

}


function setPersonelsToTable(){

    const tbodyElement = document.querySelector("tbody");

    let value = "";

    for(const index in personels){
        value += `
        <tr>
            <td>${+ index + 1 }</td>
            <td>${personels[index].firstName}</td>
            <td>${personels[index].lastName}</td>
            <td>${personels[index].profession}</td>
            <td>${personels[index].startDate}</td>
            <td>${personels[index].salary}</td>
            
        </tr>
        
        
        `
    }


    const value2 = ``
}