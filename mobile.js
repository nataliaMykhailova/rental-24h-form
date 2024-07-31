document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <=768) {
        const formContainer = document.querySelector('.search-container');
        const expandableElements = document.querySelectorAll('.expandable');
        const removeIcon = document.getElementById('remove-expanded-icon');
        const returnLocationWrapper = document.getElementById('returnLocationWrapper');
        const promoCodeField = document.querySelector('.promo-code');

        expandableElements.forEach(element => {
            element.addEventListener('click', function () {
                if (!formContainer.classList.contains('expanded')) {
                    formContainer.classList.add('expanded');
                    document.querySelectorAll('.return-location, .data-picker-container, .residence-and-age, .check-box, .input-wrapper, .submit-btn, .promo-code, #returnLocationWrapper')
                        .forEach(el => el.classList.add('expanded'));
                    removeIcon.style.display = 'inline';
                }
            });
        });


        removeIcon.addEventListener('click', function () {
            formContainer.classList.remove('expanded');
            document.querySelectorAll('.return-location, .data-picker-container, .residence-and-age, .check-box, .input-wrapper, .submit-btn')
                .forEach(el => el.classList.remove('expanded'));
            removeIcon.style.display = 'none';
            returnLocationWrapper.classList.add('hidden')
            promoCodeField.classList.remove('active');

        });
    }
});