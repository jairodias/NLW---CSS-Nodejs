function populateUFs(){
  const stateSelect = document.querySelector("select[name=uf]");
  
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then(res => res.json())
  .then(states => {
    for(var x in states){
      stateSelect.innerHTML += `<option value="${states[x].id}"> ${states[x].nome}</option>`
    }
    
  });

}
populateUFs();

function getCity(event){
  const citySelect = document.querySelector("select[name=city]");


  const stateInput = document.querySelector("[name=state]");

  stateInput.value = event.target.options[event.target.selectedIndex].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`;

  fetch(url)
  .then(res => res.json())
  .then(cities => {
    for(var x in cities){
      citySelect.innerHTML += `<option value="${cities[x].nome}">${cities[x].nome}</option>`
    }
    
    citySelect.disabled = false;
  });
} 

document.querySelector('select[name=uf]')
.addEventListener('change', getCity)

