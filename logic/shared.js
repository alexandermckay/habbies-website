const createToast = (text) => Toastify({
    text,
    duration: 5000,
    newWindow: true,
    close: false,
    gravity: "bottom", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
        background: "var(--color-black)",
        borderRadius: '25px',
        color: "var(--color-white)",
        fontFamily: 'sans-serif'
    },
}).showToast()

window.habbies = {}
window.habbies.createToast = createToast