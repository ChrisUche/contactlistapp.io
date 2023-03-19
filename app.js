
const addBtn = document.getElementById('submit-btn');
const deleteBtn = document.getElementById('delete-btn');
const resetBtn = document.getElementById('reset-btn');
const cancelBtn = document.getElementById('cancel-btn');
const recordContainer = document.querySelector('.record-container');

/*********/

const name = document.getElementById('name');
const address = document.getElementById('address');
const number = document.getElementById('contact-num');

let contactArray = [];
let id = 0;

// object constructor for contact
function Contact(id, name, address, number){
    this.id = id;
    this.name = name;
    this.address = address;
    this.number = number;
}

//display available record
document.addEventListener('DOMContentLoaded', function(){
    if(localStorage.getItem('contacts') == null){
        contactArray = [];
    } else {
        contactArray = JSON.parse(localStorage.getItem('contacts'));
        lastID(contactArray);
    }
    displayRecord();
});

// Display function
function displayRecord(){
    contactArray.forEach(function(singleContact){
        addToList(singleContact);
    });
}   

// finding the last id
function lastID(contactArray){
    if(contactArray.length > 0){
        id = contactArray[contactArray.length - 1].id;
    } else{
        id = 0;
    }
}

// Adding contact record
addBtn.addEventListener('click', function(){
    if(checkInputField([name, address, number])){
        setMessage("success", "Record added successfully!");
        id++;
        const contact = new Contact(id, name.value, address.value, number.value);
        contactArray.push(contact);
        //storing contact record in local storage
        localStorage.setItem('contacts', JSON.stringify(contactArray));

        clearInputFields();


    
        //adding to list
        addToList(contact);
    } else {
        setMessage("error", "Empty input fields or invalid input!");
    }
});

// Adding to list (on the DOM)
    function addToList(item){
        const newRecordDiv = document.createElement('div');
        newRecordDiv.classList.add('record-item');
        newRecordDiv.innerHTML =`
        <div class="record-el">
            <span id="labelling">Contact ID:</span>
            <span id="Contact-id-content">${item.id}</span>
        </div>

        <div class="record-el">
            <span id="labelling">Name:</span>
            <span id="Contact-id-content">${item.name}</span>
        </div>

        <div class="record-el">
            <span id="labelling">Address:</span>
            <span id="Contact-id-content">${item.address}</span>
        </div>

        <div class="record-el">
            <span id="labelling">Contact Number:</span>
            <span id="Contact-id-content">${item.number}</span>
        </div>

        <button type="button" id="delete-btn">
            <span>
                <i class="fas fa-trash"></i>
            </span>Delete
        </button>
        `;
        recordContainer.appendChild(newRecordDiv);
    }

    // deletion of record
    recordContainer.addEventListener('click', function(event){
        //console.log(event.target);
        if(event.target.id === 'delete-btn'){
            // removing from DOM
            let recordItem = event.target.parentElement;
            recordContainer.removeChild(recordItem);
            let tempContacList = contactArray.filter(function(record){
                return (record.id !== parseInt(recordItem.firstElementChild.lastElementChild.textContent));
            });
            contactArray = tempContacList
            // rremoving from localstorage by overwriting
            localStorage.setItem('contacts', JSON.stringify(contactArray));
        }
    });

    //resetting everything (id will get to 0)
    resetBtn.addEventListener('click', function(){
        contactArray = [];
        localStorage.setItem('contacts', JSON.stringify(contactArray));
        location.reload();
    });
    
    // displaying alerts
    function setMessage(status, message){
        let messageBox = document.querySelector('.message');
         if(status == "error"){
            messageBox.innerHTML = `${message}`;
            messageBox.classList.add('error');
            removeMessage(status, messageBox);
         }
         if(status == "success"){
            messageBox.innerHTML = `${message}`;
            messageBox.classList.add('success');
            removeMessage(status, messageBox);
         }
    }

    // clearing all input feilds
     cancelBtn.addEventListener('click', function(){
        clearInputFields();
     });

     function clearInputFields(){
        name.value = "";
        address.value = "";
        number.value = "";
     }

    // removing alerts
        function removeMessage(status, messageBox){
            setTimeout(function(){
                messageBox.classList.remove(`${status}`);
            }, 2000);
        }
            

    // input field validation
    function checkInputField(inputArr){
        for(let i = 0; i < inputArr.length; i++){
            if(inputArr[i].value === ""){
                return false;
            }
        }
        if(!phoneNumCheck(inputArr[2].value)){
            return false;
        }
        return true;
    }

// phone num validation func

function phoneNumCheck(inputtxt){
    let phoneNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (inputtxt.match(phoneNo)){
        return true;
    } else {
        return false;
    }
}

// works for these formats:
// xxx.xxx.xxxx
// xxx-xxx-xxxx
// xxx xxx xxxx