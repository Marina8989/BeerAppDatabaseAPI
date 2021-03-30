const urlBase = 'https://api.punkapi.com/v2/beers';

async function getBeers() {
    const result = await fetch(urlBase);
    const data = await result.json();

    let html = '';

    data.forEach(item => {
        html+=`<p>${item.name}</p>`;
    })
    document.querySelector('.beers').innerHTML = html;
}
getBeers();