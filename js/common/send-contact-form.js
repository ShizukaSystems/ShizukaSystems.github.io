var captcahForm = null;

// reCaptchaV2
var onloadCallback = function() {
    captcahForm = grecaptcha.render(document.getElementById("recaptchav2-contact-form")
    , {
        'sitekey' : '6LeNqvUUAAAAAGJpdlZduT-e-mHZI1-Qx2YLbV7H',
        'theme' : 'dark'
    });
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function isValidEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
    
    return false;
}

function sendForm(token) {
    let fieldName = document.getElementById("name").value;
    let fieldEmail = document.getElementById("email").value;
    let fieldPhone = document.getElementById("phone").value;
    let fieldSubject = document.getElementById("subject").value;
    let fieldDescription = document.getElementById("description").value;
    let fieldPrivacy = document.getElementById("privacy").checked;
    // let fieldRecaptcha = document.getElementById("g-recaptcha-response").value;
    let elemMessageBoxSendForm = document.getElementById("message_box_send_form");

    if (isEmpty(fieldName)) {
        messageBox("Name can't be empty!", false, elemMessageBoxSendForm);
        return;
    }

    if (isEmpty(fieldEmail)) {
        messageBox("Email can't be empty!", false, elemMessageBoxSendForm);
        return;
    }

    if (!isValidEmail(fieldEmail)) {
        messageBox("Email is invalid!", false, elemMessageBoxSendForm);
        return;
    }

    if (isEmpty(fieldPhone)) {
        messageBox("Phone can't be empty!", false, elemMessageBoxSendForm);
        return;
    }

    if (isEmpty(fieldSubject)) {
        messageBox("Subject can't be empty!", false, elemMessageBoxSendForm);
        return;
    }

    if (isEmpty(fieldDescription)) {
        messageBox("Description can't be empty!", false, elemMessageBoxSendForm);
        return;
    }

    if (fieldPrivacy !== true) {
        messageBox("You must accept the terms!", false, elemMessageBoxSendForm);
        return;
    }

    var xhr = new XMLHttpRequest();
    var body = 'name=' + encodeURIComponent(fieldName) +
    '&email=' + encodeURIComponent(fieldEmail) + 
    '&phone=' + encodeURIComponent(fieldPhone) + 
    '&subject=' + encodeURIComponent(fieldSubject) + 
    '&description=' + encodeURIComponent(fieldDescription) + 
    '&privacy_accept=' + fieldPrivacy +
    '&g-recaptcha-response=' + encodeURIComponent(token);
    
    xhr.open("POST", 'https://shizukasystems.herokuapp.com/services/contacts/send-form/', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() {
        if (this.readyState != 4)
            return;

        // RecaptchaV2 reset
        grecaptcha.reset(captcahForm);

        let response = JSON.parse(this.response);
        if (response.success === false) {
            messageBox(response.message, false, elemMessageBoxSendForm);
            // alert("Send form error: " + response.message)
            return;
        }

        // Success
        messageBox(response.message, true, elemMessageBoxSendForm);
    }

    // Send process
    let sendProcessMessage = `<div class="text_block_with_img"><div>Form submitting in progress </div><img class="emoji" src="https://m3ikshizuka.github.io/sscdn/img/Spinner-1s-200px.png"/></div>`;
    let color = {
        bg: "rgba(255, 255, 255, 0.15)", //"#ffffff25",
        border: "#b1b1b1"
    };
    
    messageBox(sendProcessMessage, true, elemMessageBoxSendForm, color);

    xhr.send(body);
}

function grecaptchaExecv2() {
    return grecaptcha.getResponse(captcahForm);
}

document.addEventListener("DOMContentLoaded", function() {
    let buttomSendForm = document.getElementById("send-form");

    buttomSendForm.addEventListener("click", function(event) {   
        event.preventDefault();
        // // reCaptchaV3
        // grecaptchaExec()
        let token = grecaptchaExecv2();
        if (!token) {
            messageBox("Сaptcha not passed!", false, document.getElementById("message_box_send_form"));
            return;
        }

        sendForm(token);
    });
})