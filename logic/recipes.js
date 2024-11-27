void (async function createRecipeList() {
    const { createClient } = SanityClient

    const client = createClient({
        projectId: 'yr351s4p',
        dataset: 'production',
        useCdn: true,
        apiVersion: '2024-11-27',

    })

    const recipes = await client.fetch(`*[_type == 'Main']{ _id, price, servings, time, title, "url": image.asset->url }`)

    const spinner = document.querySelector('.lds-spinner')
    spinner.style = "display:none;"

    const createRecipeListItem = ({ _id, price, servings, time, title, url }) => {
        const key = 'recipes'
        const recipesSaved = localStorage.getItem(key)
        const recipeSaved = recipesSaved && JSON.parse(recipesSaved).hasOwnProperty(_id)
        const icon = recipeSaved ? 'images/bin.png' : 'images/basket.png'
        const formatPrice = (price) => Array(price).fill('$').join('')
        const formatTime = (time) => {
            const oneHour = 60
            if (time <= oneHour) {
                return time + 'm'
            } else {
                const hours = Math.floor(time / oneHour) + 'h '
                const minutes = time % oneHour === 0 ? '' : time % oneHour
                return hours + minutes
            }
        }
        if (typeof price === 'number' &&
            typeof servings === 'number' &&
            typeof time === 'number' &&
            typeof title === 'string' &&
            typeof url === 'string') {
            return /* html */ `        
                <div class="recipe">
                    <div class="box-img">
                        <a href="/recipe.html?_id=${_id}">
                            <div class="img" style="background-image:url('${url}')"></div>
                        </a>
                        <button id="toggle-${_id}">
                            <img alt='basket' id="toggle-icon-${_id}" class='basket' src="${icon}" />
                        </button>
                    </div>
                    <b class="title">${title}</b>
                    <div class="icons">
                        <p class="price">Price: ${formatPrice(price)}</p>
                        <p class="time">Time: ${formatTime(time)}</p>
                        <p class="servings">Serves: ${servings}</p>
                    </div>
                </div>
            `
        } else {
            return `<div class="recipe"><p>An error has occured due to malformed data</p></div>`
        }
    }

    const innerHTML = recipes.reduce((htmlStr, recipe) => htmlStr + createRecipeListItem(recipe), '')
    document.querySelector('.recipes').innerHTML = innerHTML

    recipes.forEach(({ _id }) => {
        document.querySelector(`#toggle-${_id}`).onclick = () => {
            const key = 'recipes'
            const recipesSaved = localStorage.getItem(key)
            const storedRecipes = recipesSaved && JSON.parse(recipesSaved)
            const icon = document.querySelector(`#toggle-icon-${_id}`)
            if (storedRecipes) {
                if (storedRecipes.hasOwnProperty(_id)) {
                    delete storedRecipes[_id]
                    window.habbies.createToast('Deleted recipe')
                    icon.src = 'images/basket.png'
                } else {
                    storedRecipes[_id] = true
                    window.habbies.createToast('Added recipe')
                    icon.src = 'images/bin.png'
                }
                const nextRecipes = JSON.stringify(storedRecipes)
                localStorage.setItem(key, nextRecipes)
            } else {
                localStorage.setItem(key, JSON.stringify({ [_id]: true }))
                window.habbies.createToast('Added recipe')
                icon.src = 'images/bin.png'
            }
        }
    })


})()