let personels = [];

function save(event){
    event.preventDefault();

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

    setPersonelsToTable();
}


function setPersonelsToTable(){

    const tbodyElement = document.querySelector("tbody");

    personels = personels.sort((a,b) => a.firstName.localeCompare(b.firstName));

    let value= '';

    for(const index in personels){
        const date = new Date(personels[index].startDate);
        const newDate = `
                            ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}
                        `

        const salary = formatSalary(personels[index].salary.replaceAll(",","."));
        value += `
                    <tr>
                        <td>${+ index + 1 }</td>
                        <td>${personels[index].firstName}</td>
                        <td>${personels[index].lastName}</td>
                        <td>${personels[index].profession}</td>
                        <td>${newDate}</td>
                        <td>${salary}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary">Update</button>
                            <button class="btn btn-sm btn-outline-danger">Delete</button>
                        </td>
                    </tr>
                `
    }

    tbodyElement.innerHTML = value;
}


function formatSalary(salaryString){
    const salaryNumber = +salaryString;

    const formatter = new Intl.NumberFormat('tr-TR',{
        style : "currency",
        currency : "TRY",
        minimumFractionDigits : 2
    });

    return formatter.format(salaryNumber);
}