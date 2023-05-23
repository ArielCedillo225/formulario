function say_hello() {
    let nombre = document.getElementById('NombreCompleto')
    alert('Hola ' + nombre.value)
    console.log(nombre)
}

function validateState(element) {

    if (element.value == '') {
        element.setAttribute('style', 'border-color:red')
        element.setAttribute('placeholder', 'Campo obligatorio')
        return false
    } else {
        element.removeAttribute('style')
        return true
    }

}

function validateInterests() {
    const interests = document.querySelectorAll("#interests")
    for (let i = 0; i < interests.length; i++) {
        if (interests[i].checked == true) {
            return true
        }
    }
    return false
}

function showErrors(errors){

    let messageError = 'Se encontraron los siguientes errores en el formulario: \n'
    
    for (let i = 0; i < errors.length; i++) {
        messageError += errors[i] + '\n'
    }

    alert(messageError)
    console.log(errors)
}

function register() {

    const name = document.getElementById('NombreCompleto')
    const email = document.getElementById('email')
    const birthDate = document.getElementById('date')
    const sex = document.getElementById('sex')

    let errors = []

    if (!validateInterests()) {
        errors.push("Se debe verificar un interes")
    }

    if (!validateState(name)) {
        errors.push("Se debe introducir un nombre")
    }

    if (!validateState(email)) {
        errors.push("Se debe introducir un email")
    }

    if (!validateState(birthDate)) {
        errors.push("Se debe introducir una fecha de Nacimiento")
    }

    if (!validateState(sex)) {
        errors.push("Se debe introducir un sexo")
    }

    if(errors.length>0){
        showErrors(errors)
        return
    }

    const interests = document.querySelectorAll('#interests')
    let selectedInterests = []

    for (let i = 0; i < interests.length; i++) {
        if (interests[i].checked) selectedInterests.push(interests[i].value)
    }

    const request = {
        email: email.value,
        name: name.value,
        birthDate: birthDate.value,
        sex: sex.value,
        interests: selectedInterests
    }
    //console.log(request)
    
    users.push(request)
    //console.log("Lista de usuarios: ", users)
    alert('Registro satisfactorio')
    showListUsers(request)

    fetch('http://localhost/api-php/',{
        method:'POST', body: JSON.stringify(request)})
        .then(res=>result = res.json())
        .then(data => {
            phpUsers = data
            console.log(phpUsers)
        })
        .catch(err=>console.log(err))
}

function showListUsers(request){
    const table = document.getElementById('table_users')
    const row = document.createElement('tr')
    for(let prop in request){
        const col = document.createElement('td')
        if(prop == 'sex'){
            col.innerHTML = request[prop] == 1 ? 'Masculino':'Femenino'
        }
        else{
            col.innerHTML = request[prop]
        }
        
        row.appendChild(col)
    }
    table.appendChild(row)
}

