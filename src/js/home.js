const renderAllCoctels = ()=>{
    list.innerHTML = ' ';

    for (const drink of listCoctels){

        const indexFav = favCoctels.findIndex(
            (item) => item.idDrink === drink.idDrink
          );
          
          let classFav = indexFav === -1 ? '' : 'pink';

        list.innerHTML += `<li class= "js_li ${classFav}" id= "${drink.idDrink}"> <i class="fa-solid fa-circle-xmark"></i> ${drink.strDrink} 
        <img src = '${drink.strDrinkThumb}'/>
        </li>`
    }
    const liCoctel = document.querySelectorAll('.js_li');
    for (const item of liCoctel) {
        item.addEventListener('click', handleFav);
    }

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

function handleFav (event){
    const coctelClicked = event.currentTarget.id;
    console.log(coctelClicked);
    const coctelListClicked = listCoctels.find((item) => item.idDrink === coctelClicked
)
console.log(coctelListClicked)
const favoriteLiClickedIndex = favCoctels.findIndex ((item)=> item.idDrink === coctelClicked);
if (favoriteLiClickedIndex === -1){
    favCoctels.push(coctelListClicked);
    event.currentTarget.classList.add('pink')
} else{
    favCoctels.splice(favoriteLiClickedIndex, 1);
    event.currentTarget.classList.remove('pink')
}
console.log(favCoctels)
// renderAllCoctels (listCoctels);
favoriteList.innerHTML =" ";
for (const fav of favCoctels) {

    favoriteList.innerHTML += `<li class= "js_li" id= "${fav.idDrink}"> ${fav.strDrink}
<img src = '${fav.strDrinkThumb}'/>
</li>`
}
localStorage.setItem('favCoctels', JSON.stringify(favCoctels));
}


  

getDataApi();
btnSearch.addEventListener('click', handleSearch);
