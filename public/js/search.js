const searchBtn = document.getElementById('search-button');
const restaurantList = document.getElementById('restaurant-list');

searchBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const res = await fetch('/api/restaurants/search');
    const data = await res.json();
    console.log(data)
    data.forEach((rest) => {
        const listItem = document.createElement('li');
        listItem.textContent = rest.name;
        restaurantList.appendChild(listItem);

    })
})