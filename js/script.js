// Sistema para ingresar corredores a la lista de la carrera de el evento Reto Volcanico (Marathon en las volcanes) tipo CRUD

let selectedRow = null

function onFormSubmit() { //validar
    if (validate()) {
        let formData = readFormData()
        if (selectedRow == null)
            insertNewRecord(formData)
        else
            updateRecord(formData)
        resetForm()
    }
}

function readFormData() { //  datos
    let formData = {}
    formData["fullName"] = document.getElementById("fullName").value
    formData["empCode"] = document.getElementById("empCode").value
    formData["city"] = document.getElementById("city").value
    formData["town"] = document.getElementById("town").value
    return formData
}

let listaCorredores = []
const agregarCorredores = (ev) => {
     ev.preventDefault()
     let corredores = {
         nombre: document.getElementById("fullName").value,
         distancia: document.getElementById("empCode").value,
         ciudad: document.getElementById("city").value,
         colonia: document.getElementById("town").value,

     }
     listaCorredores.push(corredores)
     console.warn('added' , {listaCorredores} )
     localStorage.setItem('miListaCorredores', JSON.stringify(listaCorredores))
     
}

        

function insertNewRecord(data) { //agregar a la tabla
    let table = document.getElementById("runnersList").getElementsByTagName('tbody')[0]
    let newRow = table.insertRow(table.length)
    cell1 = newRow.insertCell(0)
    cell1.innerHTML = data.fullName
    cell2 = newRow.insertCell(1)
    cell2.innerHTML = data.empCode
    cell3 = newRow.insertCell(2)
    cell3.innerHTML = data.city
    cell4 = newRow.insertCell(3)
    cell4.innerHTML = data.town
    cell4 = newRow.insertCell(4)
    cell4.innerHTML = `<button class="editar" onClick="onEdit(this)">Editar</button>
                       <button class="borrar" onClick="onDelete(this)">Borrar</button>`
}

function resetForm() {  // vaciar
    document.getElementById("fullName").value = ""
    document.getElementById("empCode").value = ""
    document.getElementById("city").value = ""
    document.getElementById("town").value = ""
    selectedRow = null
}

function onEdit(td) {  // editar
    selectedRow = td.parentElement.parentElement
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML
    document.getElementById("empCode").value = selectedRow.cells[1].innerHTML
    document.getElementById("city").value = selectedRow.cells[2].innerHTML
    document.getElementById("town").value = selectedRow.cells[3].innerHTML
}
function updateRecord(formData) {  //actualizar
    selectedRow.cells[0].innerHTML = formData.fullName
    selectedRow.cells[1].innerHTML = formData.empCode
    selectedRow.cells[2].innerHTML = formData.city
    selectedRow.cells[3].innerHTML = formData.town
}

function onDelete(td) { // alerta
    if (confirm('Deseas eliminar a este corredor?')) {
        row = td.parentElement.parentElement
        document.getElementById("runnersList").deleteRow(row.rowIndex)
        resetForm()
    }
}
function validate() { // confirmacion
    isValid = true
    if (document.getElementById("fullName").value == "") {
        isValid = false
        document.getElementById("fullNameValidationError").classList.remove("hide")
    } else {
        isValid = true
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide")
    }
    return isValid
}