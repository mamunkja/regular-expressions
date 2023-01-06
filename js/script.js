var form = document.querySelector("#re_form");
var validation = document.querySelector("#validation");
var input = document.querySelector("#input_string");
var radioInput = document.getElementsByName('re_select');


form.addEventListener('submit', validateInput);
input.addEventListener('click', getRadioValue);
document.addEventListener('DOMContentLoaded', radioClicked);


//if radio button clicked then enter value in placeholder
function radioClicked () {
    radioInput.forEach(radio => {
        radio.addEventListener('click', insertPlaceholder);
    });
}

//validate input string
function validateInput(e) {
    let inputValue = input.value.trim();
    if (inputValue === ''){
        alert('Please enter value!');
    } else if (getRadioValue == '') {
        alert('Please select one of your choice!');
    }
    else {
        let radio = getRadioValue();
        switch (radio) {
            case "email":
                validateEmail(inputValue);
                break;
            default:
                alert(`Please select one! value: ${radio}`);
        }        
    }
    e.preventDefault();
}

function getRadioValue() {
    let selectionValue = '';
    radioInput.forEach(radio => {
        if(radio.checked) {
            selectionValue = radio.value;
        }        
    });

    return selectionValue;
}

function insertPlaceholder(param) {
    input.placeholder = `Enter ${param.target.value}`;
    //console.log(param);
}

function validateEmail(str) {
    let re = /^([a-zA-Z0-9]\.?\_?)+[^\.\_]@([a-zA-Z0-9])+\.+([a-zA-Z0-9])+\.?([a-zA-Z0-9]){2,}$/;
    let check = re.test(str);
    if(check){
        validation.innerHTML = `<h5 class='success'>"${str}" matches with <br> RE: ${re.source}`;
    } else {
        validation.innerHTML = `<h5 class='error'>${str} does not matches <br> RE: ${re.source}`;
    }
}