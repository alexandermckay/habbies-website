void (async function createRecipeList() {
    const { createClient } = SanityClient

    const client = createClient({
        projectId: 'yr351s4p',
        dataset: 'production',
        useCdn: true,
        apiVersion: '2024-10-17',

    })

    const recipes = await client.fetch(`*[_type == 'Main']{ _id, price, servings, time, title, "url": image.asset->url }`)

    const createRecipeListItem = ({ _id, price, servings, time, title, url }) => {
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
            return `        
                <div class="recipe">
                    <div class="box-img">
                        <a href="/recipe.html?_id=${_id}">
                            <div class="img" style="background-image:url('${url}')"></div>
                        </a>
                        <button id="toggle-${_id}">+</button>
                    </div>
                    <b class="title">${title}</b>
                    <div class="icons">
                        <div class="price">Price: ${formatPrice(price)}</div>
                        <div class="time">Time: ${formatTime(time)}</div>
                        <div class="servings">Serves: ${servings}</div>
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
            const storedRecipes = JSON.parse(localStorage.getItem(key))
            if (storedRecipes) {
                if (storedRecipes.hasOwnProperty(_id)) {
                    delete storedRecipes[_id]
                    // Add toast
                } else {
                    storedRecipes[_id] = true
                    // Add toast
                }
                const nextRecipes = JSON.stringify(storedRecipes)
                localStorage.setItem(key, nextRecipes)
            } else {
                localStorage.setItem(key, JSON.stringify({ [_id]: true }))
                // Add toast
            }
        }
    })


})()