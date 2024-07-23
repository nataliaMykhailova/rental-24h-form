// document.getElementById('promo-code-toggle').addEventListener('change', function () {
//     const promoCodeField = document.querySelector('.promo-code');
//     if (this.checked) {
//         promoCodeField.classList.add('active');
//     } else {
//         promoCodeField.classList.remove('active');
//     }
// });
document.querySelectorAll('.input-wrapper').forEach(function(element) {
    element.addEventListener('focusin', function() {
        this.classList.add('focused');
    });
    element.addEventListener('focusout', function() {
        this.classList.remove('focused');
    });
});



document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('myForm');
    form.onsubmit  = function(event) {
        event.preventDefault();
        const inputs = form.querySelectorAll("input");
        inputs.forEach(input => {
            const inputWrapper = input.closest('.input-wrapper');
            if (input.value === '') {
                inputWrapper.classList.add('error');
            } else {
                inputWrapper.classList.remove('error'); //Дописати лінку
            }
       })
    }

    const returnLocationButton = document.querySelector('.return-location');
    const returnLocationWrapper = document.getElementById('returnLocationWrapper');

    returnLocationButton.addEventListener('click', () => {
        returnLocationButton.classList.add('hidden');
        returnLocationWrapper.classList.remove('hidden');
    });
});





