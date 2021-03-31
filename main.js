const urlBase = 'https://api.punkapi.com/v2/beers';
const filterABV = document.getElementById('filterABV');
const filterIBU = document.getElementById('filterIBU');
let optionsABV = '';
let optionsIBU = '';

//filter
filterABV.addEventListener('change', e => {
    const value = e.target.value;

    switch(value){
          case 'all': 
             optionsABV = '';
             break;
          case 'weak':
              optionsABV = 'abv_lt=4.6';
              break;
          case 'medium':
              optionsABV = 'abv_gt=4.5&abv_lt=7.6';
              break;
          case 'strong':
              optionsABV = 'abv_gt=7.5';           
    }
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
             optionsIBU = 'ibu_lt=35';
             break;
         case 'medium':
             optionsIBU = 'ibu_gt=34&ibu_lt=75';
             break;
         case 'strong':
             optionsIBU = 'ibu_gt=74';
             break;            
    }
    getBeers();
})


async function getBeers() {
    const url = urlBase + '?' + optionsABV + '&' +optionsIBU;
    console.log(url)

    const result = await fetch(url);
    const data = await result.json();
    console.log(data);
    const beersDiv = document.querySelector('.beers');

    let html = '';

    data.forEach(item => {

        html+=`
        <div class='beer-wrapper card'>
          <div class='beer'>
            <img class='beer__img' src='${item.image_url}'>
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
getBeers();