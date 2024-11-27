void (async function createRecipeList() {
    const { createClient } = SanityClient

    const client = createClient({
        projectId: 'yr351s4p',
        dataset: 'production',
        useCdn: true,
        apiVersion: '2024-11-27',

    })

    const recipeId = new URLSearchParams(window.location.search).get('_id')

    if (typeof recipeId === 'string') {
        const recipe = await client.fetch(`*[_type == 'Main' && _id == "${recipeId}"]{ 
            Author->{name, "url": picture.asset->url}, ingredients, macros, price, recipe, servings, sides[]->, time, tips, title, "url": image.asset->url 
        }[0]`)

        const createRecipe = ({ Author, ingredients, macros, price, recipe, servings, sides, time, tips, title, url }) => {
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
            if (typeof Author.name === 'string' &&
                typeof Author.url === 'string' &&
                Array.isArray(ingredients) &&
                typeof price === 'number' &&
                typeof recipe === 'string' &&
                typeof servings === 'number' &&
                Array.isArray(sides) &&
                typeof time === 'number' &&
                typeof title === 'string' &&
                typeof tips === 'string' &&
                typeof url === 'string') {
                return /*html*/ `        
                    <div class='information'>
                        <div class="img" style="background-image:url('${url}')"></div>
                        <button class="solid" id='add'>Add to grocery list</button>

                        <b class="title">${title}</b>
                        <div class="icons">
                            <p class="price">Price: ${formatPrice(price)}</p>
                            <p class="time">Time: ${formatTime(time)}</p>
                            <p class="servings">Serves: ${servings}</p>
                        </div>       

                        <b>Ingredients</b>
                        <div class='ingredients'>
                            ${ingredients.sort((a, b) => a.ingredient < b.ingredient ? 1 : -1).map(i => `<p>${i.unit} x</p><p class='ingredient'>${i.ingredient}</p>`).join('')}
                        </div>     
                        
                        <div class='recipe'>
                            <b>Recipe</b>
                            ${recipe.split('\n').filter(Boolean).map(p => `<p>${p}</p>`).join('')}
                        </div>

                        <div class='tips'>
                            <b>Tips</b>
                            <p>${tips}</p>
                        </div>
                    </div>
                `
            } else {
                return `<div class="recipe"><p>An error has occured due to malformed data</p></div>`
            }
        }

        document.querySelector('main.recipe').innerHTML = createRecipe(recipe)
        document.querySelector('.lds-spinner').style = 'display:none;'

        document.querySelector(`#add`).onclick = () => {
            const key = 'recipes'
            const recipesSaved = localStorage.getItem(key)
            const storedRecipes = recipesSaved && JSON.parse(recipesSaved)

            if (storedRecipes) {
                if (storedRecipes.hasOwnProperty(recipeId)) {
                    delete storedRecipes[recipeId]
                    window.habbies.createToast('Deleted recipe')
                } else {
                    storedRecipes[recipeId] = true
                    window.habbies.createToast('Added recipe')
                }
                const nextRecipes = JSON.stringify(storedRecipes)
                localStorage.setItem(key, nextRecipes)
            } else {
                localStorage.setItem(key, JSON.stringify({ [recipeId]: true }))
                window.habbies.createToast('Added recipe')
            }
        }
    } else {
        window.location.href = 'recipes.html'
    }
})()
