const urlBase = 'https://api.punkapi.com/v2/beers?page=';
const filterABV = document.getElementById('filterABV');
const filterIBU = document.getElementById('filterIBU');
const pageText = document.getElementById('pageNumber');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
let optionsABV = '';
let optionsIBU = '';
let page = 1;

//filter
filterABV.addEventListener('change', e => {
    const value = e.target.value;

    switch(value){
          case 'all': 
             optionsABV = '';
             break;
          case 'weak':
              optionsABV = '&abv_lt=4.6';
              break;
          case 'medium':
              optionsABV = '&abv_gt=4.5&abv_lt=7.6';
              break;
          case 'strong':
              optionsABV = '&abv_gt=7.5';           
    }
    page = 1;
    getBeers();
})


//filters
filterIBU.addEventListener('change', e => {
    const value = e.target.value;

    switch(value) {
         case 'all':
             optionsIBU = '';
             break;
         case 'weak':
             optionsIBU = '&ibu_lt=35';
             break;
         case 'medium':
             optionsIBU = '&ibu_gt=34&ibu_lt=75';
             break;
         case 'strong':
             optionsIBU = '&bu_gt=74';
             break;            
    }
    page = 1;
    getBeers();
})


async function getBeers() {
    const url = urlBase + page + optionsABV + optionsIBU;
    console.log(url);
    const result = await fetch(url);
    const data = await result.json();
    console.log(data);
    pageText.innerText = page;

    if(page === 1) {
        prevPage.disabled = true;
    } else {
        prevPage.disabled = false;
    } 
    if(data.length < 25) {
       nextPage.disabled = true;
    }else {
        nextPage.disabled = false;
    }

    const beersDiv = document.querySelector('.beers');

    let html = '';
    const genericBottle = 'https://cdn.pixabay.com/photo/2014/12/22/00/04/bottle-576717_960_720.png';

    data.forEach(item => {

        html+=`
        <div class='beer-wrapper card'>
          <div class='beer'>
            <img class='beer__img' src='${item.image_url ? item.image_url : genericBottle}'>
            <h3>${item.name}</h3>
            <span class='beer__info'>
               <span>ABV: ${item.abv}%</span>
               <span>IBU: ${item.ibu}</span>
            </span>
          </div>
          <div class='beer__content'>
            <div class='beer__name'>${item.name}</div>
            <div class='beer__tagline'>${item.tagline}</div>
            <div class='beer__description'>${item.description}</div>
            <div class='beer__food-paring'>
               Pair with: ${item.food_pairing.join(', ')}
            </div>
          </div>
        </div>    
        `;
    })
    beersDiv.innerHTML = html;
}

//pagination
prevPage.addEventListener('click', () => {
    page--;
    getBeers();
});
nextPage.addEventListener('click', () => {
    page++;
    getBeers();
})

getBeers();