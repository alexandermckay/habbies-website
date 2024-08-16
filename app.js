void (function videoPlayer() {
    const video = document.getElementById('player')
    const playButton = document.getElementById('play')

    function onVideoPlay() {
        playButton.style.display = 'none'
        video.play()
    }

    function onVideoPause() {
        playButton.style.display = 'block'
        video.pause()
    }

    function onVideoToggle() {
        if (video.paused) onVideoPlay()
        else onVideoPause()
    }

    playButton.addEventListener('click', onVideoPlay)
    video.addEventListener('click', onVideoToggle)
})()

void (function gallery() {
    const swiper = new window.Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    })
})()

void (function form() {
    const form = document.getElementById('contact')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const formData = new FormData(evt.currentTarget)
        const formObject = Object.fromEntries(formData.entries())
        alert('We will be in touch soon.')
        if (formObject.name) {
            // ignore
        } else {
            // send email
        }
    })
})()

void (function nav() {
    let prevScrollpos = window.scrollY
    window.onscroll = function listener() {
        const currentScrollPos = window.scrollY
        if (prevScrollpos > currentScrollPos) {
            document.querySelector("nav").style.top = "0"
        } else if (currentScrollPos > 100) {
            document.querySelector("nav").style.top = "-10rem"
        }
        prevScrollpos = currentScrollPos
    }
})()