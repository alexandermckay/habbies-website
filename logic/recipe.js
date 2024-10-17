void (async function createRecipeList() {
    const { createClient } = SanityClient

    const client = createClient({
        projectId: 'yr351s4p',
        dataset: 'production',
        useCdn: true,
        apiVersion: '2024-10-17',

    })

    const recipeId = new URLSearchParams(window.location.search).get('_id')

    if (typeof recipeId === 'string') {
        const recipe = await client.fetch(`*[_type == 'Main' && _id == "${recipeId}"]{ 
            Author->{name, "url": picture.asset->url}, ingredients, macros, price, recipe, servings, sides[]->, time, tips, title, "url": image.asset->url 
        }[0]`)

        console.log(recipe)

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
                typeof macros.carbs === 'number' &&
                typeof macros.fats === 'number' &&
                typeof macros.protein === 'number' &&
                typeof macros.calories === 'number' &&
                typeof price === 'number' &&
                typeof recipe === 'string' &&
                typeof servings === 'number' &&
                Array.isArray(sides) &&
                typeof time === 'number' &&
                typeof title === 'string' &&
                typeof tips === 'string' &&
                typeof url === 'string') {
                return `        
                    <div>
                        <div class="img" style="background-image:url('${url}')"></div>
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

        document.querySelector('main.recipe').innerHTML = createRecipe(recipe)
    }
})()