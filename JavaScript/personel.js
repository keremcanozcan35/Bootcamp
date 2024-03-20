let personels = [
   {
    firstName: "firstNameInputElement.value",
        lastName: "lasttNameInputElement.value",
        profession: "professionInputElement.value",
        startDate:" startDateInputElement.value",
        salary: "salaryInputElement.value"
   },
   {
    firstName: "firstNameInputElement.value",
        lastName: "lasttNameInputElement.value",
        profession: "professionInputElement.value",
        startDate:" startDateInputElement.value",
        salary: "salaryInputElement.value"
   },
   {
    firstName: "firstNameInputElement.value",
        lastName: "lasttNameInputElement.value",
        profession: "professionInputElement.value",
        startDate:" startDateInputElement.value",
        salary: "salaryInputElement.value"
   },
];

let updateIndex = -1;

 setPersonelsToTable();

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

    firstNameInputElement.value = "";
    lasttNameInputElement.value = "";
    professionInputElement.value = "";
    startDateInputElement.value = "";
    salaryInputElement.value = "";

    firstNameInputElement.focus();

    showToast("Personel create is successfull");
    
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
                            <button class="btn btn-sm btn-outline-primary" onclick="showUpdateForm(${index})">
                            <i class="fa-solid fa-edit></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteByIndex(${index})">
                            <i class="fa-solid fa-trash></i>
                            </button>
                        </td>
                    </tr>
                `
    }

    tbodyElement.innerHTML = value;
}


function deleteByIndex(index){
    const personel = personels[index];
    Swal.fire({ //promise
        title: 'Delete!',
        text: ` Do you want to delete ${personel.firstName}`,
        icon: 'question',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        showCancelButton : true
      }).then(value => {
        if(value.isConfirmed === true){
            personels.splice(index,1);
            setPersonelsToTable();
            showToast("Personel delete is successful","info");
        }
      })
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

function showToast(message, icon="success"){
    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton : false,
        timer : 1500
      });
      Toast.fire(message,"",icon)
}


function showOrHideAddPersonelForm(){
    const el = document.getElementById("addPersonelForm");
    if(el !== null){
        if(el.style.display=== "flex"){
            showOrHideFormAdditionalMethod(el,"none","initial")
        }else{
            showOrHideFormAdditionalMethod(el,"flex","none");
        }
    }
}



function showOrHideFormAdditionalMethod(el,eld,btneld){
    el.style.display = eld;

    const btnEL = document.getElementById("addPersonelBtnDiv");
  
}