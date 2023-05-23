let users = [];

fetch("http://localhost/api-php/listusers.php")
    .then(response => result = response.json())
    .then(data => {
        users = data
        console.log(users)
        showUsers()
    })
    .catch(err => console.log(err))

function showUsers() {

    //clearTableUsers();

    const table = document.getElementById('table_class')
    table.innerHTML="";
    for (let i = 0; i < users.length; i++) {
        const row = document.createElement('tr')
        row.setAttribute('class','rowUsers')
        const colid = document.createElement('td')
        const colName = document.createElement('td')
        const colEmail = document.createElement('td')
        const colBirthdate = document.createElement('td')
        const colSex = document.createElement('td')
        const colUpdate = document.createElement('td')
        const colDelete = document.createElement('td')

        colid.innerHTML = users[i].id
        colName.innerHTML = users[i].username
        colEmail.innerHTML = users[i].email
        colBirthdate.innerHTML = users[i].birthdate

        if (users[i.sex = '1']) {
            colSex.innerHTML = 'Masculino'
        } else {
            colSex.innerHTML = 'Femenino'
        }

        const updateButton = document.createElement('button')
        updateButton.innerHTML = 'Actualizar'
        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = 'Borrar'

        deleteButton.setAttribute('class', 'btn btn-danger')
        deleteButton.style.backgroundColor = 'red'

        updateButton.style.backgroundColor = '#07c22f'
        updateButton.setAttribute('class', 'btn btn-success')
        updateButton.setAttribute('onclick', `showFormUpdate('${users[i].id}', '${users[i].username}', '${users[i].email}',
                                    '${users[i].birthdate}','${users[i].sex}')`)

        deleteButton.setAttribute('onclick', `confirmDelete('${users[i].id}', '${users[i].username}','${users[i].email}',
                                    '${users[i].birthdate}','${users[i].sex}')`)

        colUpdate.appendChild(updateButton)
        colDelete.appendChild(deleteButton)

        row.appendChild(colid)
        row.appendChild(colName)
        row.appendChild(colEmail)
        row.appendChild(colBirthdate)
        row.appendChild(colSex)
        row.appendChild(colUpdate)
        row.appendChild(deleteButton)
        table.appendChild(row)
    }

}

function showFormUpdate(id, username, email, birthdate, sex) {

    
    const txtId = document.getElementById('id')
    txtId.value = id
    const txtName = document.getElementById('name')
    txtName.value = username
    const txtEmail = document.getElementById('email')
    txtEmail.value = email
    const txtBirthdate = document.getElementById('birthdate')
    txtBirthdate.value = birthdate
    const txtSex = document.getElementById('sex')
    txtSex.value = sex

    const dialog = document.getElementById('formUpdate')
    dialog.showModal();

}

function update() {

    const id = document.getElementById('id')
    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const birthdate = document.getElementById('birthdate')
    const sex = document.getElementById('sex')

    const user = {
        id: id.value,
        name: name.value,
        email: email.value,
        birthdate: birthdate.value,
        sex: sex.value
    }

    fetch("http://localhost/api-php/update.php", { method: "post", mode:"no-cors", body: JSON.stringify(user) })
        .then(() => alert('Registro actualizado'))
        .catch(err => console.log(err))

}

function confirmDelete(id, name, email, date, sex) {

    const dialogDelete = document.getElementById('formDelete')
    dialogDelete.showModal()

    const idDelete =document.getElementById('deleteId')

    const spanName = document.getElementById('spanName')
    const spanDate = document.getElementById('spanDate')
    const spanEmail = document.getElementById('spanEmail')
    const spanSex = document.getElementById('spanSex')

    idDelete.setAttribute('value', id)
    spanName.innerHTML = name
    spanEmail.innerHTML=email
    spanSex.innerHTML = sex

    if(spanSex.innerHTML==1){
        spanSex.innerHTML='Masculino'
    } else {
        spanSex.innerHTML="Femenino"
    }

    spanDate.innerHTML = date

}

function deleteUser(){
    const id = document.getElementById('deleteId').value
    fetch(`http://localhost/api-php/delete.php?id=${id}`, {method:'get', mode:'no-cors'})
    .then(() => {
    alert('Registro eliminado')
        showUsers();}
    )
    .catch((error) =>{
        alert('No se pudo eliminar')
        console.log(error)
    })

    
}

function clearTableUsers(){
    const rows = document.getElementsByClassName('rowUsers')
    const users = [...rows];
    users.map(user => user.remove)
}