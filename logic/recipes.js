void (function createRecipeList() {
    const mockData = [
        {
            price: 1, servings: 4, time: 79, title: 'Beef roast', url: 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Peppery-Roast-Beef_EXPS_TOHCA20_31448_B07_24_6b.jpg'
        },
        {
            price: 1, servings: 4, time: 79, title: 'Beef roast', url: 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Peppery-Roast-Beef_EXPS_TOHCA20_31448_B07_24_6b.jpg'
        },
        {
            price: 1, servings: 4, time: 79, title: 'Beef roast', url: 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Peppery-Roast-Beef_EXPS_TOHCA20_31448_B07_24_6b.jpg'
        },
        {
            price: 1, servings: 4, time: 79, title: 'Beef roast', url: 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Peppery-Roast-Beef_EXPS_TOHCA20_31448_B07_24_6b.jpg'
        },
        {
            price: 1, servings: 4, time: 79, title: 'Beef roast', url: 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Peppery-Roast-Beef_EXPS_TOHCA20_31448_B07_24_6b.jpg'
        },
        {
            price: 1, servings: 4, time: 79, title: 'Beef roast', url: 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Peppery-Roast-Beef_EXPS_TOHCA20_31448_B07_24_6b.jpg'
        }
    ]


    const createRecipeListItem = ({ price, servings, time, title, url }) => {
        const formatPrice = (price) => Array(price).fill('$').join('')
        const formatTime = (time) => {
            const oneHour = 60
            if (time <= oneHour) {
                return time + 'm'
            } else {
                const hours = Math.floor(time / oneHour)
                const minutes = time % oneHour
                return hours + 'h ' + minutes + 'm'
            }
        }
        if (typeof price === 'number' &&
            typeof servings === 'number' &&
            typeof time === 'number' &&
            typeof title === 'string' &&
            typeof url === 'string') {
            return `        
                <div class="recipe">
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

    const innerHTML = mockData.reduce((htmlStr, recipe) => htmlStr + createRecipeListItem(recipe), '')
    document.querySelector('.recipes').innerHTML = innerHTML

})()