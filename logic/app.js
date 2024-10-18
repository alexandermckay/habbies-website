void (function configureGallery() {
    const swiper = new window.Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        scrollbar: {
            el: '.swiper-scrollbar',
        },
    })
})()

void (function configureForm() {
    const form = document.getElementById('contact')

    form.addEventListener('submit', (event) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const formObject = Object.fromEntries(formData.entries())

        // bots will fill in the name field, whereas humans will not
        if (!formObject.name) {
            // send email
            alert('We will be in touch soon.')
        }
    })
})()

void (function configureNav() {
    let savedScrollPosition = 0
    const nav = document.querySelector("nav")
    let ticking = false

    const onScroll = () => {
        const scrollPosition = window.scrollY
        const scrollingUp = savedScrollPosition > scrollPosition
        const scrolledBeyondNav = scrollPosition > 100

        if (scrollingUp) {
            nav.style.top = "0"
        } else if (scrolledBeyondNav) {
            if (nav.style.top !== '-10rem') {
                nav.style.top = "-10rem"
            }
        }

        savedScrollPosition = scrollPosition
    }

    const handleScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                onScroll()
                ticking = false
            })
            ticking = true
        }
    }

    window.addEventListener('scroll', handleScroll)
})()