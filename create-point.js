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
  citySelect.innerHTML = "";
  citySelect.disabled = true;
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


const itemsToCollect = document.querySelectorAll(".items-grid li");

for(let item of itemsToCollect){
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.getElementById("items");

let selectedItems = [];

function handleSelectedItem(event){
  const itemLi = event.target;

  itemLi.classList.toggle('selected');

  const itemId = itemLi.dataset.id;
  
  const alreadySelected = selectedItems.findIndex( item  => item == itemId)

  if(alreadySelected >= 0){
    const filteredItems = selectedItems.filter( item =>{
      const itemIsDifferent = item !== itemId
      return itemIsDifferent;
    });
  }else{
    selectedItems.push(itemId);
  }

  collectedItems.value = selectedItems;

}
