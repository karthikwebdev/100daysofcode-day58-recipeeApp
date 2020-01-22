let past = ''
fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
.then((res)=>res.json())
.then((data)=>{
    let categories = data.meals
    let options = '<option selected>Choose...</option>'
    categories.forEach(category => {
        options += `<option>${category.strCategory}</option>`
    });
    document.querySelector('select').innerHTML = options
})
function fun(){
    let mainhtml = ''
    let fetchdata = 'https://www.themealdb.com/api/json/v1/1/filter.php?c='+document.getElementById('inputState').value;
    fetch(fetchdata)
    .then((res)=>res.json())
    .then((data)=>{
        data.meals.forEach(meal=>{
            mainhtml = mainhtml + `
            <div class="card  col col-lg-3 border-dark col-md-12 col-sm-12 col-12" style="width: 18rem;">
        <img src="${meal.strMealThumb}" class="card-img-top mt-4" alt="img for recipee">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <button onclick="getItem(${meal.idMeal})" class="btn btn-dark">Get Recipee</button>
        </div>
    </div>
            `
        })
        document.getElementById('main').innerHTML = mainhtml
    })
}
function getItem(id){
    let fetchMeal =  'https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id;
    fetch(fetchMeal)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
         past = document.getElementById('main').innerHTML;
        document.getElementById('main').innerHTML = ''
        let mainmarkup =  `
        <button class="btn btn-dark m-4" onclick="back()">Back</button>
        <div class="card col col-12">
            <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h1 class="card-title">${data.meals[0].strMeal}</h1>
              <span class="card-text text-uppercase text-black font-weight-bold">Area:</span>
              <p class="card-text">${data.meals[0].strArea}</p>
              <span class="card-text text-uppercase text-black font-weight-bold">Category:</span>
              <p class="card-text">${data.meals[0].strCategory}</p>
              <span class="card-text text-uppercase text-black font-weight-bold">ingredients:</span>
              <ul class="list-group list-group-flush">
                <li class="list-group-item ">${data.meals[0].strIngredient1} - ${data.meals[0].strMeasure1}</li>
                <li class="list-group-item "> ${data.meals[0].strIngredient2} - ${data.meals[0].strMeasure2}</li>
                <li class="list-group-item ">${data.meals[0].strIngredient3} - ${data.meals[0].strMeasure3}</li>
                <li class="list-group-item">${data.meals[0].strIngredient4} - ${data.meals[0].strMeasure4}</li>
                <li class="list-group-item">${data.meals[0].strIngredient5} - ${data.meals[0].strMeasure5}</li>
                <li class="list-group-item">${data.meals[0].strIngredient6} - ${data.meals[0].strMeasure6}</li>
                <li class="list-group-item">${data.meals[0].strIngredient7} - ${data.meals[0].strMeasure7}</li>
                <li class="list-group-item">${data.meals[0].strIngredient8} - ${data.meals[0].strMeasure8}</li>
              </ul>
              <span class="card-text text-uppercase text-black font-weight-bold">recipe:</span>
              <p class="card-text">${data.meals[0].strInstructions}</p>
            </div>
            <div class="card-body">
              <a href="${data.meals[0].strSource}" class="card-link">SOURCE</a>
              <a href="${data.meals[0].strYoutube}" class="card-link">YOUTUBE</a>
            </div>
        `
        document.getElementById('main').innerHTML = mainmarkup;
    })
}
function back(){
    document.getElementById('main').innerHTML = past;
}
function search() {
    let item ="https://www.themealdb.com/api/json/v1/1/search.php?s="+document.getElementById('search-item').value;
    
    fetch(item)
    .then(res=>res.json())
    .then(data=>getItem(data.meals[0].idMeal))
}