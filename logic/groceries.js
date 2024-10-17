void (async function createRecipeList() {
    const { createClient } = SanityClient

    const client = createClient({
        projectId: 'yr351s4p',
        dataset: 'production',
        useCdn: true,
        apiVersion: '2024-10-17',
    })

    if (localStorage.getItem('recipes') &&
        JSON.parse(localStorage.getItem('recipes'))
    ) {
        const recipeIdsMap = JSON.parse(localStorage.getItem('recipes'))
        const recipeIdsList = Object.keys(recipeIdsMap)
        const groceries = await client.fetch(`
            *[_type == 'Main' && _id in $ids]{ 
                ingredients, 
                sides[]->{ingredients} }[0]`,
            { ids: recipeIdsList })
        const list = [...groceries.ingredients, ...groceries.sides.map(side => side.ingredients[0])]

        const key = 'groceries'
        const savedGroceries = JSON.parse(localStorage.getItem(key))

        const createTableRow = ({ _key, ingredient, unit }) => {
            if (typeof _key === 'string' &&
                typeof ingredient === 'string' &&
                typeof unit === 'string'
            ) {
                return `
                    <tr>
                        <th><input id="toggle-${_key}" type='checkbox' ${savedGroceries.hasOwnProperty(_key) && 'checked'}  /></th>
                        <th>${unit}</th>
                        <th>${ingredient}</th>
                    </tr>
                `
            }
        }

        const innerHTML = list.sort((a, b) => a.ingredient.toLowerCase() < b.ingredient.toLowerCase() ? -1 : 1).reduce((htmlStr, grocery) => htmlStr + createTableRow(grocery), '')
        document.querySelector('tbody').innerHTML = innerHTML

        list.forEach(({ _key }) => {
            document.querySelector(`#toggle-${_key}`).onclick = () => {
                const key = 'groceries'
                const groceries = JSON.parse(localStorage.getItem(key))
                if (groceries) {
                    if (groceries.hasOwnProperty(_key)) {
                        delete groceries[_key]
                        // Add toast
                    } else {
                        groceries[_key] = true
                        // Add toast
                    }
                    const nextGroceries = JSON.stringify(groceries)
                    localStorage.setItem(key, nextGroceries)
                } else {
                    localStorage.setItem(key, JSON.stringify({ [_key]: true }))
                    // Add toast
                }
            }
        })

    }

})()