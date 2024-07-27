document.addEventListener('DOMContentLoaded', function() {
    const formContainer = document.querySelector('.search-container');
    const expandableElements = document.querySelectorAll('.expandable');

    expandableElements.forEach(element => {
        element.addEventListener('focus', function() {
            formContainer.classList.add('expanded');
            document.querySelectorAll('.return-location, .data-picker-container, .residence-and-age, .check-box, .input-wrapper, .submit-btn')
                .forEach(el => el.classList.add('expanded'));
        });
    });
});