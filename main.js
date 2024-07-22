// document.getElementById('promo-code-toggle').addEventListener('change', function () {
//     const promoCodeField = document.querySelector('.promo-code');
//     if (this.checked) {
//         promoCodeField.classList.add('active');
//     } else {
//         promoCodeField.classList.remove('active');
//     }
// });
document.querySelector('.input-wrapper').addEventListener('focusin', function () {
    this.classList.add('focused');
});
document.querySelector('.input-wrapper').addEventListener('focusout', function () {
    this.classList.remove('focused');
});



document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('myForm');
    const locationInput = document.getElementById('location');

    console.log('Form element:', form);
    console.log('Location input element:', locationInput);

    if (form && locationInput) {
        form.addEventListener('submit', function(event) {
            console.log('Form is attempting to submit');
            event.preventDefault();

            console.log('After preventDefault');

            if (!locationInput.value) {
                console.log('Location input is empty');
                locationInput.parentElement.classList.add('error');
            } else {
                console.log('Location input is filled');
                locationInput.parentElement.classList.remove('error');
            }
        });

        locationInput.addEventListener('input', function() {
            console.log('Input event on location field');
            if (locationInput.value) {
                locationInput.parentElement.classList.remove('error');
            }
        });
    } else {
        console.error('Form or location input not found');
    }
    const returnLocation = document.querySelector('.return-location');
    returnLocation.addEventListener('click', function() {
        console.log('Return location clicked');
        const newBlock = document.createElement('div');
        newBlock.classList.add('form-group', 'input-wrapper');
        newBlock.setAttribute('tabindex', '0');
        newBlock.innerHTML = `
                    <div class="form-group input-wrapper" tabindex="0">
                    <label for="returnLocation">Return location</label>
                    <svg class="default-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5ZM12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2Z" fill="black"/>
                    </svg>
                    <svg class="error-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 17V15H13V17H11ZM11 7V13H13V7H11Z" fill="#D4281E"/>
                    </svg>
                    <input type="text" id="returnLocation" name="returnLocation" placeholder="Return location" required>
                    </div>
                `;
        returnLocation.parentNode.replaceChild(newBlock, returnLocation);
    });
});





