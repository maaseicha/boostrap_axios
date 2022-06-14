const apiUrl = 'https://bp-marvel-api.herokuapp.com/marvel-characters?idAuthor=1';

window.addEventListener('DOMContentLoaded', function(e){
	axios.get(apiUrl)
  .then(function (res) {
    var html = document.getElementById('items');
    html.innerHTML = '';
    var data = res.data;
    for (let i = 0; i < data.length; i++) {
        html.innerHTML += `<div class="row pt-3">
        <div class="col-md-12">
            <div class="card card-color">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${data[i].image}" class="card-img" alt="...">
                        </div>
                        <div class="col-md-7">
                            <h5 class="card-title">${data[i].title}</h5>
                            <p class="card-text">${data[i].body}</p>
                        </div>
                        <div class="col-md-2 align-self-center">
                            <div class="row"><div class="col"><button type="button" class="btn btn-accions" onclick="btnEditElement('${data[i]._id}')"><i class="fa-solid fa-pencil"></i></button></div></div>
                            <div class="row pt-3"><div class="col"><button type="button" class="btn btn-accions" onclick="btnDeleteElement('${data[i]._id}')"><i class="fa-solid fa-trash"></i></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    }
  })
  .catch(function (error) {
    console.log(error);
  });

});

async function savePersonaje(){
    let bandera = true;
    let nombre = document.getElementById('validationCustom01').value;
    let descripcion = document.getElementById('validationCustom02').value
    let url = document.getElementById('validationCustom03').value
    if (nombre == '') {
        document.querySelector('#inputNombre .input-error').innerHTML = 'Por favor ingrese un nombre.';
		bandera = false;        
    }else{
        document.querySelector('#inputNombre .input-error').innerHTML = '';
    }
    if (descripcion == '') {
        document.querySelector('#textareaDescripcion .input-error').innerHTML = 'Por favor ingrese una descripción.';
		bandera = false;        
    }else{
        document.querySelector('#textareaDescripcion .input-error').innerHTML = '';
    }
    if (url == '') {
        document.querySelector('#inputUrl .input-error').innerHTML = 'Por favor ingrese la url de una imagen.';
		bandera = false;        
    }else{
        document.querySelector('#inputUrl .input-error').innerHTML = '';
    }
    if (bandera) {
        await axios.post(apiUrl, {
            title: nombre,
            body: descripcion,
            image: url,
            category: "main"
            });
        alert("Personaje Guardado");
        location.reload();
    }
}
function btnEditElement(id){
    alert(id);
}

async function btnDeleteElement(id){
    let url = `https://bp-marvel-api.herokuapp.com/marvel-characters/${id}?idAuthor=1`;
    await axios.delete(url);
    location.reload();
}

function mostrar(id){
    document.getElementById(id).style.display = "flex";
}

function ocultar(id){
    document.getElementById(id).style.display = "none";
}