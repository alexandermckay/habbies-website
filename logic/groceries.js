void (async function createRecipeList() {
    const { keys, valid } = accessLocalStorage('recipes')
    const client = createSanityClient()
    loadPage({ client, keys, valid })
})()

function createSanityClient() {
    const { createClient } = SanityClient
    const client = createClient({
        projectId: 'yr351s4p',
        dataset: 'production',
        useCdn: true,
        apiVersion: '2024-10-17',
    })
    return client
}

function accessLocalStorage(key) {
    const update = (value) => localStorage.setItem(key, JSON.stringify(value))
    try {
        const str = localStorage.getItem(key)
        const data = str && JSON.parse(str)
        const keys = Object.keys(data)

        if (!str || !data || !keys) throw new Error('Failed')

        return { data, keys, update, str, valid: true }
    } catch (event) {
        return { data: false, keys: [], update, str: '', valid: false }
    }
}

function attachRecipeToIngredients({ ingredients, _id, title }) {
    return ingredients.map(i => Object.assign(i, { ...i, _id, title }))
}

function createTableRow({ _key, ingredient, unit, title }) {
    if (typeof _key === 'string' &&
        typeof ingredient === 'string' &&
        typeof unit === 'string') {
        const { keys } = accessLocalStorage('groceries')
        return /* html */ `
            <tr>
                <th><input id="toggle-${_key}" type='checkbox' ${keys.includes(_key) && 'checked'}  /></th>
                <th>${unit}</th>
                <th class='ingredient'>${ingredient}</th>
                <th>${title}</th>
            </tr>
        `
    }
}

function createTableBody(ingredients) {
    const sorted = ingredients.sort((a, b) => a.ingredient.toLowerCase() < b.ingredient.toLowerCase() ? -1 : 1)
    const str = sorted.reduce((htmlStr, grocery) => htmlStr + createTableRow(grocery), '')
    return str
}

function displaySelectedRecipes(titles) {
    const recipeSpan = document.querySelector('#recipes')
    if (titles.length) {
        recipeSpan.textContent = 'You have selected ' + titles.map(t => t.text).join(', ')
    } else {
        recipeSpan.textContent = 'No recipes have been selected yet.'
    }
}

function displayRecipeDropdown(titles) {
    const { keys } = accessLocalStorage('recipes')
    const form = document.querySelector('form.delete-recipe')
    if (keys?.length) {
        form.style.display = 'block'
    } else {
        form.style.display = 'none'
    }
    const select = document.querySelector('select.delete-recipe')
    const options = titles.map(({ _id, text }) => /*html*/`
        <option id="delete-recipe-${_id}" value="${_id}">${text}</option>
    `).join('')
    select.innerHTML = options
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const client = createSanityClient()
        const formData = new FormData(event.currentTarget)
        const formObject = Object.fromEntries(formData.entries())
        console.log(formObject)
        const { data, update } = accessLocalStorage('recipes')
        delete data[formObject.recipe]
        console.log(data)
        update(data)
        const { keys, valid } = accessLocalStorage('recipes')
        console.log(keys)

        loadPage({ client, keys, valid })
    })
}

async function getSelectedRecipes(client, ids) {
    const recipes = await client.fetch(`
        *[_type == 'Main' && _id in $ids]{
            _id,
            title, 
            ingredients 
        }`,
        { ids })
    const ingredients = recipes.flatMap(attachRecipeToIngredients)
    const titles = recipes.map(({ title, _id }) => ({ text: title, _id }))
    return { ingredients, titles }
}

async function loadPage({ client, keys, valid }) {
    if (valid) {
        const tbody = document.querySelector('tbody')
        const { ingredients, titles } = await getSelectedRecipes(client, keys)
        displaySelectedRecipes(titles)
        displayRecipeDropdown(titles)
        tbody.innerHTML = createTableBody(ingredients)
        ingredients.forEach(updateSelectedGroceries)
    }
}

function updateSelectedGroceries({ _key }) {
    const checkbox = document.querySelector(`#toggle-${_key}`)
    checkbox.addEventListener('click', () => {
        const { data, update, valid } = accessLocalStorage('groceries')
        if (valid) {
            if (data.hasOwnProperty(_key)) delete data[_key]
            else data[_key] = true
            update(data)
        } else {
            update({ [_key]: true })
        }
    })
}







