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
            case "cell":
                validateCell(inputValue);
                break;
            case "postcode":
                validatePostcode(inputValue);
                break;
            case "name":
                validateName(inputValue);
                break;
            default:
            alert(`Please select one! value: ${radio}`);
        }        
    }
    e.preventDefault();
}

//get the value of checked radio
function getRadioValue() {
    let selectionValue = '';
    radioInput.forEach(radio => {
        if(radio.checked) {
            selectionValue = radio.value;
        }        
    });

    return selectionValue;
}

//insert placeholder after selecting the radio button 
function insertPlaceholder(param) {
    input.value = '';
    input.placeholder = `Enter ${param.target.value}`;
    
    //if cell no. selected insert +88 before input field
    if(param.target.value == 'cell') {
        if(input.previousElementSibling.nodeName != 'SPAN'){
            let beforeInput = document.querySelector('#lbl_name');
            let span = document.createElement('span');
            span.textContent = '+88';
            form.insertBefore(span,input);
        }        
    } else {
        if(input.previousElementSibling.nodeName == 'SPAN'){
            input.previousElementSibling.remove();
        }
    }
}

function validateEmail(str) {
    /* allowed special character = '@' '.' '_' '-'
    after @ 1 or 2 '.' allowed */
    let re = /^([a-zA-Z0-9]\.?\_?\-?)+[^\.\_]@([a-zA-Z0-9])+\.+([a-zA-Z0-9])+\.?([a-zA-Z0-9]){2,}$/;
    showResult(str, re);
}

function validatePostcode(str) {
    let re = /^[0-9]{4}$/;
    showResult(str, re);
}

function validateCell(str) {
    let re = /^01[0-9]{9}$/;
    showResult(str, re);
}


function validateName(str) {
    let re = /^(([A-Za-z])+(\.?\s?\'?\-?)){2,}$/;
    showResult(str, re);
}


function showResult(str, re) {
    if(re.test(str)){
        validation.innerHTML = `<h5 class='success'>"${str}" matches with <br> RE: "${re.source}"`;
    } else {
        validation.innerHTML =  `<h5 class='error'>"${str}" does not matches <br> RE: "${re.source}"`;
    }    
}