(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();


/* Envio de correos */

const contactForm = document.querySelector('.contact-form');
let names = document.getElementById('names');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = {
        name: names.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
        if(xhr.responseText == 'success') {
            names.value = '';
            email.value = '';
            subject.value = '';
            message.value = '';
            mess("id-sent");
        } else {
            mess("id-error")
        }
    }

    xhr.send(JSON.stringify(formData));
})

function mess(id) {
    setTimeout(() => {
        document.getElementById(id).style="display: block";
        setTimeout(() => {
            document.getElementById(id).style="display: none";
        }, 2000)
    }, "100");
}

/* Cambio de idioma */

const flagsElement = document.getElementById("flags");

const textsToChange = document.querySelectorAll("[data-section]");

const changeLanguage = async language => {
    const requestJson = await fetch(`../languages/${language}.json`);
    const texts = await requestJson.json();

    setTimeout(() => {
        for(const textToChange of textsToChange) {
            const section = textToChange.dataset.section;
            const value = textToChange.dataset.value;
    
            textToChange.innerHTML = texts[section][value];
        }
    }, 300)
}

flagsElement.addEventListener("click", (e) => {
    changeLanguage(e.target.parentElement.dataset.language)
})