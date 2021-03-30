const urlBase = 'https://api.punkapi.com/v2/beers';

async function getBeers() {
    const result = await fetch(urlBase);
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
        </div>    
        `;
    })
    beersDiv.innerHTML = html;
}
getBeers();