const renderAllCoctels = ()=>{
    list.innerHTML = ' ';

    for (const drink of listCoctels){

        const indexFav = favCoctels.findIndex(
            (item) => item.idDrink === drink.idDrink
          );
          
          let classFav = indexFav === -1 ? '' : 'pink';

        list.innerHTML += `<li class= "js_li ${classFav}" id= "${drink.idDrink}"> <i class="fa-solid fa-plus js_plus hidden"></i> <i class="fa-solid fa-circle-xmark hidden js_less"></i> ${drink.strDrink} </i> <p>${drink.strCategory}</p>
        <img src="${drink.strDrinkThumb ? drink.strDrinkThumb : './images/emoji.jpg'}"/>
        </li>`
    }

    const liCoctel = document.querySelectorAll('.js_li');
    for (const item of liCoctel) {
        item.addEventListener('click', handleFav);
    }

    // plus();
}

function renderFav(){
    listFav.innerHTML = ' ';
    favoriteList.innerHTML =" ";
for (const fav of favCoctels) {
    listFav.innerHTML = 'Mis cocteles favoritos';
    favoriteList.innerHTML += `<li class= " "> <i class="fa-solid fa-circle-xmark js_x" id= "${fav.idDrink}"> ${fav.strDrink}
<img src = '${fav.strDrinkThumb}'/>
</li>`
}
localStorage.setItem('favCoctels', JSON.stringify(favCoctels));

const btnClose = document.querySelectorAll('.js_x');
for (const btn of btnClose) {
    btn.addEventListener('click', handleClose);
    console.log(btn);
}
// renderAllCoctels();
}

const getDataApi = ()=>{
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then (response => response.json())
    .then ((data)=> {

        listCoctels = data.drinks
        renderAllCoctels (listCoctels)
        localStorage.setItem('cocteles', JSON.stringify(listCoctels));
    })
    
}


function handleSearch (){
    const valueSearch = input.value;
    console.log(valueSearch);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${valueSearch}`)
    .then ((response)=> response.json())
    .then ((data) =>{
        listCoctels = data.drinks
        renderAllCoctels (listCoctels)
    });
};

function handleClose (event){
    
    const clickedElement = event.target;
    // Verificar si el elemento clicado tiene la clase .js_x
    if (clickedElement.classList.contains('js_x')) {
        const coctelClicked = clickedElement.id;
        const favoriteLiClickedIndexClose = favCoctels.findIndex((item) => item.idDrink === coctelClicked);

        favCoctels.splice(favoriteLiClickedIndexClose, 1);
        localStorage.setItem('favCoctels', JSON.stringify(favCoctels));

        renderAllCoctels();
        renderFav();
    }
}

function handleFav (event){
    const coctelFavClicked = event.currentTarget.id;
    console.log(coctelFavClicked);
    const coctelListClicked = listCoctels.find((item) => item.idDrink === coctelFavClicked
)
const favoriteLiClickedIndex = favCoctels.findIndex ((item)=> item.idDrink === coctelFavClicked);
if (favoriteLiClickedIndex === -1){
    favCoctels.push(coctelListClicked);
    event.currentTarget.classList.add('pink')
} else{
    favCoctels.splice(favoriteLiClickedIndex, 1);
    event.currentTarget.classList.remove('pink')
}

renderFav();
}

function handleReset(){
    favCoctels.splice(0, favCoctels.length);
    renderFav();
    console.log('hola');
};

// function handlePlus(event){

//     if (favoriteLiClickedIndex === -1){
//         favCoctels.push(coctelListClicked);
//         event.currentTarget.classList.add('pink')
//         less.classList.remove('hidden');
// };
// };

// function plus(){
//     const btnPlus = document.querySelectorAll('.js_plus');
//     console.log(btnPlus);
//     for (const each of btnPlus) {
//         each.addEventListener('click', handlePlus);
//         console.log(each);
//     }
// }

const init = () => {
    const coctelsFavLocal = localStorage.getItem('favCoctels');
    if (coctelsFavLocal !== null) {
      favCoctels = JSON.parse(coctelsFavLocal);
    }
    const coctelsLocal = localStorage.getItem('cocteles');

    if (coctelsLocal !== null) {
      listCoctels = JSON.parse(coctelsLocal);
      renderAllCoctels(listCoctels);
      renderFav(favCoctels);
    } else {
      getDataApi();
    }
  };

  function handleConsole(){
    for (const favorite of favCoctels) {
        console.log(favorite.strDrink);        
    }
  }
  
  log.addEventListener('click', handleConsole);

init();
btnReset.addEventListener ('click', handleReset);
// getDataApi();
btnSearch.addEventListener('click', handleSearch);
