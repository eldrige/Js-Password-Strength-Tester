// variables and nodes

"use-strict"

const strengthMeter = document.getElementById("strength-meter")
const passwordInput = document.getElementById("password-input")
const reasonContainer = document.getElementById("reasons")

// functions and logic

passwordInput.addEventListener('input', updateStrengthMeter) //increase value of strength meter wrt weaknesses

updateStrengthMeter()

function updateStrengthMeter(){
    const weaknesses = calculatePasswordStrength(passwordInput.value)
    let strength = 100

    reasonContainer.innerHTML = ''
    weaknesses.forEach( weakness => {
        if(weakness == null) return
        strength -= weakness.deduction  // gets the deduction ppty from weakness and subtract it from the strength var

        let messageElement = document.createElement('div')
        messageElement.innerText = weakness.message;
        reasonContainer.appendChild(messageElement)  // adds reason for weak password to the reason Div

    })
    strengthMeter.style.setProperty('--strength', strength)  // the css var --strength is now equivalent to our strength variable
}

function calculatePasswordStrength(password){
    const weaknesses = []
    weaknesses.push(lengthWeakness(password))
    weaknesses.push(lowerCaseWeakness(password))
    weaknesses.push(uppercaseWeakness(password))
    weaknesses.push(numberWeakness(password))
    weaknesses.push(speacialCharacterWeakness(password))
    weaknesses.push(repeatCharacterWeakness(password))
    return weaknesses
}  // creates an array of weaknesses and pushes the respective weaknesses to them

function lengthWeakness(password){
    const length = password.length

    if( length < 5 ){
        return {
            message: "Your password is too short",
            deduction: 40
        }
    }

    if( length <= 10) {
        return {
            message: "Your password could be longer",
            deduction: 15
        }
    }


} // returns an object based on the password.value ppty

function uppercaseWeakness(password){
    return characterTypeWeakness(password, /[A-Z]/g, 'Uppercase Characters')
}

function lowerCaseWeakness(password){

    return characterTypeWeakness(password,/[a-z]/g , 'Lowercase Characters' )

    // const matches  = password.match(/[a-z]/g) || []   //match function returns an array of characters matching our RegExp

    // if(matches.length === 0){
    //     return {
    //         message: 'Your message has no lowercase characters',
    //         deduction: 20
    //     }

    // }

    // if (matches.length <= 2) {
    //     return {
    //         message: "Your password could use more characters",
    //         deduction : 5
    //     }
    // }
   
}

function characterTypeWeakness(password, regex, type){
    const matches = password.match(regex) || []

    if(matches.length === 0){
        return {
            message: `Your message has no ${type} characters`,
            deduction: 20
        }

    }

    if (matches.length <= 2) {
        return {
            message: `Your password could use more  ${type} characters`,
            deduction : 5
        }
    }
}  // a helper function that enables us to check for both uppercase,lowercase, numbers, special xters based on their Regex

function numberWeakness(password){
    return characterTypeWeakness(password,/[0-9]/g,'numbers')
}

function speacialCharacterWeakness(password){
    return characterTypeWeakness(password,/[^0-9a-zA-Z\s]/g, 'special characters')  //the caret negates, meaning that it will select everything not in the string
}

function repeatCharacterWeakness(password){
    const matches = password.match(/(.)\1/g) || []  // this regex matches any stuff that has been repeated
    if( matches.length > 0){
        return {
            message: 'you password has repeat characters',
            deduction: matches.length * 10
        }
    }

}