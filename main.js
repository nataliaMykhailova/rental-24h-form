document.getElementById('promo-code-toggle').addEventListener('change', function () {
    const promoCodeField = document.querySelector('.promo-code');
    if (this.checked) {
        promoCodeField.classList.add('active');
    } else {
        promoCodeField.classList.remove('active');
    }
});
document.getElementById('sb-country').addEventListener('click', function () {
    const dropdown = this.nextElementSibling;
    dropdown.classList.toggle('open');
});

document.getElementById('sb-age').addEventListener('click', function () {
    const dropdown = this.nextElementSibling;
    dropdown.classList.toggle('open');
});

document.querySelectorAll('.age-select-list li').forEach(item => {
    item.addEventListener('click', function () {
        document.getElementById('sb-age').innerText = this.innerText;
        document.querySelector('.age-dropdown').classList.remove('open');
        document.querySelectorAll('.age-select-list li').forEach(li => li.classList.remove('selected'));
        this.classList.add('selected');
    });
});

document.getElementById('residence-sb-country').addEventListener('change', function () {
    const selectedCountry = this.options[this.selectedIndex].text;
    document.getElementById('sb-country').innerText = selectedCountry;
    document.querySelector('.residence-dropdown').classList.remove('open');
});

document.getElementById('search-country').addEventListener('input', function () {
    const filter = this.value.toLowerCase();
    const options = document.getElementById('residence-sb-country').options;
    for (let i = 0; i < options.length; i++) {
        const txtValue = options[i].textContent || options[i].innerText;
        options[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? '' : 'none';
    }
});

document.addEventListener('click', function (e) {
    const residenceDropdown = document.querySelector('.residence-dropdown');
    const ageDropdown = document.querySelector('.age-dropdown');
    if (!residenceDropdown.contains(e.target) && !document.getElementById('sb-country').contains(e.target)) {
        residenceDropdown.classList.remove('open');
    }
    if (!ageDropdown.contains(e.target) && !document.getElementById('sb-age').contains(e.target)) {
        ageDropdown.classList.remove('open');
    }
});

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
    const locationInput = document.getElementById('location');
    const returnLocationInput = document.getElementById('returnLocation');

    function autocomplete(inp, arr) {
        let currentFocus;
        inp.addEventListener('input', function(e) {
            let a, b, i, val = this.value;
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            a = document.createElement('DIV');
            a.setAttribute('id', this.id + 'autocomplete-list');
            a.setAttribute('class', 'autocomplete-items');
            this.parentNode.appendChild(a);
            for (i = 0; i < arr.length; i++) {
                if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                    b = document.createElement('DIV');
                    b.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>';
                    b.innerHTML += arr[i].substr(val.length);
                    b.innerHTML += '<input type="hidden" value="' + arr[i] + '">';
                    b.addEventListener('click', function(e) {
                        inp.value = this.getElementsByTagName('input')[0].value;
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });

        inp.addEventListener('keydown', function(e) {
            let x = document.getElementById(this.id + 'autocomplete-list');
            if (x) x = x.getElementsByTagName('div');
            if (e.keyCode === 40) {
                currentFocus++;
                addActive(x);
            } else if (e.keyCode === 38) {
                currentFocus--;
                addActive(x);
            } else if (e.keyCode === 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                }
            }
        });

        function addActive(x) {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            x[currentFocus].classList.add('autocomplete-active');
        }

        function removeActive(x) {
            for (let i = 0; i < x.length; i++) {
                x[i].classList.remove('autocomplete-active');
            }
        }

        function closeAllLists(elmnt) {
            const x = document.getElementsByClassName('autocomplete-items');
            for (let i = 0; i < x.length; i++) {
                if (elmnt !== x[i] && elmnt !== inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }

        document.addEventListener('click', function (e) {
            closeAllLists(e.target);
        });
    }

    autocomplete(locationInput, locationPlace);
    autocomplete(returnLocationInput, locationPlace);

    form.onsubmit = function (event) {
        event.preventDefault(); // Запобігає відправці форми

        // Збираємо дані з форми
        const inputs = form.querySelectorAll("input[type='text'], input[type='hidden']");
        let formIsValid = true;
        let formData = {};

        inputs.forEach(input => {
            const inputWrapper = input.closest('.input-wrapper');
            if (inputWrapper) {
                const errorIcon = inputWrapper.querySelector('.error-icon');

                if (input.value.trim() === '' || !locationPlace.includes(input.value.trim())) {
                    inputWrapper.classList.add('error');
                    input.classList.add('error');

                    if (errorIcon) {
                        errorIcon.style.display = 'inline';
                    }

                    formIsValid = false;
                } else {
                    formData[input.name] = input.value;
                    inputWrapper.classList.remove('error');
                    input.classList.remove('error');
                    if (errorIcon) {
                        errorIcon.style.display = 'none';
                    }
                }
            } else {
                formData[input.name] = input.value;
            }
        });

        if (formIsValid) {
            // Видаляємо класи помилки після вдалого сабміту
            inputs.forEach(input => {
                const inputWrapper = input.closest('.input-wrapper');
                if (inputWrapper) {
                    inputWrapper.classList.remove('error');
                    input.classList.remove('error');
                    const errorIcon = inputWrapper.querySelector('.error-icon');
                    if (errorIcon) {
                        errorIcon.style.display = 'none';
                    }
                }
            });

            fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    // Очищення форми після успішної відправки
                    form.reset();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            // Очищення форми після відправки
            form.reset();
        }
    };













    const returnLocationButton = document.querySelector('.return-location');
    const returnLocationWrapper = document.getElementById('returnLocationWrapper');

    returnLocationButton.addEventListener('click', () => {
        returnLocationButton.classList.add('hidden');
        returnLocationWrapper.classList.remove('hidden');
    });
})
















document.addEventListener('DOMContentLoaded', function() {
    const calendarBody1 = document.getElementById('calendar-body-1');
    const calendarBody2 = document.getElementById('calendar-body-2');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const monthYear1 = document.getElementById('month-year-1');
    const monthYear2 = document.getElementById('month-year-2');
    const pickupPicker = document.getElementById('pickup-picker');
    const dropoffPicker = document.getElementById('dropoff-picker');
    const calendarContainer = document.querySelector('.calendar-container');

    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    let selectedPickupDate = today;
    let selectedDropoffDate = today;

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    let currentPicker = 'pickup';

    function updateCalendar() {
        calendarBody1.innerHTML = '';
        calendarBody2.innerHTML = '';

        const firstMonthYear = getAdjustedMonthYear(currentMonth, currentYear);
        const secondMonthYear = getAdjustedMonthYear(currentMonth + 1, currentYear);

        const firstMonthDays = getDaysInMonth(firstMonthYear.year, firstMonthYear.month);
        const secondMonthDays = getDaysInMonth(secondMonthYear.year, secondMonthYear.month);

        monthYear1.textContent = `${months[firstMonthYear.month]} ${firstMonthYear.year}`;
        monthYear2.textContent = `${months[secondMonthYear.month]} ${secondMonthYear.year}`;

        appendWeekDays(calendarBody1);
        appendDays(calendarBody1, firstMonthDays, firstMonthYear.month, firstMonthYear.year);

        appendWeekDays(calendarBody2);
        appendDays(calendarBody2, secondMonthDays, secondMonthYear.month, secondMonthYear.year);

        updateDateDisplays();
    }

    function appendWeekDays(container) {
        weekDays.forEach(day => {
            const cell = document.createElement('div');
            cell.className = 'day-cell weekday-header';
            cell.textContent = day;
            container.appendChild(cell);
        });
    }

    function appendDays(container, days, month, year) {
        const firstDay = new Date(year, month, 1).getDay();
        const emptyCells = (firstDay + 6) % 7;

        for (let i = 0; i < emptyCells; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'day-cell';
            container.appendChild(emptyCell);
        }

        days.forEach((day) => {
            const cell = document.createElement('div');
            cell.className = 'day-cell';
            cell.textContent = day;
            const date = new Date(year, month, day);

            if (date < today && date.toDateString() !== today.toDateString()) {
                cell.classList.add('past-date');
            } else {
                if (date.getDay() === 0 || date.getDay() === 6) {
                    cell.classList.add('weekend');
                } else {
                    cell.classList.add('weekday');
                }

                if (currentPicker === 'dropoff' && selectedPickupDate && date < selectedPickupDate) {
                    cell.classList.add('disabled');
                } else {
                    cell.addEventListener('click', () => selectDate(date));
                }
            }

            if (date.toDateString() === today.toDateString()) {
                cell.classList.add('today');
            }

            if (selectedPickupDate && date.toDateString() === selectedPickupDate.toDateString() && selectedPickupDate !== today) {
                cell.classList.add('selected-pickup');
            }

            if (selectedDropoffDate && date.toDateString() === selectedDropoffDate.toDateString() && selectedDropoffDate !== today) {
                cell.classList.add('selected-dropoff');
            }

            if (selectedPickupDate && selectedDropoffDate && date > selectedPickupDate && date < selectedDropoffDate) {
                cell.classList.add('in-range');
            }

            container.appendChild(cell);
        });

        const totalCells = emptyCells + days.length;
        const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        for (let i = 0; i < remainingCells; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'day-cell';
            container.appendChild(emptyCell);
        }
    }

    function getDaysInMonth(year, month) {
        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            days.push(date.getDate());
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    function getAdjustedMonthYear(month, year) {
        if (month < 0) {
            return { month: 11, year: year - 1 };
        } else if (month > 11) {
            return { month: 0, year: year + 1 };
        } else {
            return { month: month, year: year };
        }
    }

    function selectDate(date) {
        if (currentPicker === 'pickup') {
            selectedPickupDate = date;
            if (selectedDropoffDate && selectedDropoffDate < selectedPickupDate) {
                selectedDropoffDate = null;
            }
        } else if (currentPicker === 'dropoff') {
            selectedDropoffDate = date;
        }
        updateCalendar();
    }

    function updateDateDisplays() {
        const pickupDateDisplay = document.getElementById('pickup-date-display');
        const dropoffDateDisplay = document.getElementById('dropoff-date-display');

        pickupDateDisplay.textContent = formatDate(selectedPickupDate);
        dropoffDateDisplay.textContent = formatDate(selectedDropoffDate);
    }

    function formatDate(date) {
        if (!date) return 'N/A';
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    function showCalendar(event) {
        event.stopPropagation();
        const calendar = document.querySelector('.calendar-container');
        calendar.style.display = 'block';

        const rect = event.currentTarget.getBoundingClientRect();
        const calendarRect = calendar.getBoundingClientRect();

        calendar.style.position = 'absolute';
        calendar.style.top = `${rect.bottom + window.scrollY}px`;
        calendar.style.left = `${rect.left}px`;

        if (event.currentTarget.id === 'pickup-picker') {
            currentPicker = 'pickup';
        } else if (event.currentTarget.id === 'dropoff-picker') {
            currentPicker = 'dropoff';
        }
        updateCalendar();
    }

    function hideCalendar(event) {
        const calendar = document.querySelector('.calendar-container');
        if (calendar.style.display === 'block' && !calendar.contains(event.target) && !event.target.closest('.calendar-container') && !event.target.closest('#prev-button') && !event.target.closest('#next-button')) {
            calendar.style.display = 'none';
        }
    }

    pickupPicker.addEventListener('click', showCalendar);
    dropoffPicker.addEventListener('click', showCalendar);

    document.addEventListener('click', hideCalendar);

    prevButton.addEventListener('click', (event) => {
        event.stopPropagation();
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        updateCalendar();
    });

    nextButton.addEventListener('click', (event) => {
        event.stopPropagation();
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        updateCalendar();
    });

    updateCalendar();
});

















function toggleSelectVisibility(containerId, selectId) {
    const container = document.getElementById(containerId);
    const select = document.getElementById(selectId);

    container.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent click from closing the dropdown
        select.classList.toggle('hidden');
        select.style.position = 'absolute';
        select.style.top = container.offsetHeight + 'px'; // Position below the container
        select.style.left = '0'; // Align to the left of the container
        select.style.width = container.offsetWidth + 'px'; // Match container width
        select.focus(); // Focus on the select to show options
    });

    select.addEventListener('change', function () {
        const selectedTime = this.options[this.selectedIndex].text;
        document.getElementById(containerId).querySelector('span').innerText = selectedTime;

        // Hide select after a short delay to ensure selection is processed
        setTimeout(() => {
            select.classList.add('hidden');
        }, 100); // Adjust the delay as needed
    });
}

// Initialize pick-up time
toggleSelectVisibility('pickup-hour-container', 'pickup-time-select');

// Initialize drop-off time
toggleSelectVisibility('dropoff-hour-container', 'dropoff-time-select');

// Hide select when clicking outside
document.addEventListener('click', function (event) {
    document.querySelectorAll('.time-select').forEach(select => {
        if (!select.classList.contains('hidden')) {
            select.classList.add('hidden');
        }
    });
});


document.querySelectorAll('.data-picker-day, .data-picker-hour').forEach(function(element) {
    element.addEventListener('click', function(event) {
        event.stopPropagation();
        document.querySelectorAll('.data-picker-day, .data-picker-hour').forEach(function(el) {
            el.classList.remove('focused-clas');
        });
        this.classList.add('focused-clas');
        document.addEventListener('click', hidePicker, true);
    });
});

function hidePicker(event) {
    document.querySelectorAll('.data-picker-day, .data-picker-hour').forEach(function(element) {
        if (!element.contains(event.target)) {
            element.classList.remove('focused-clas');
            const select = element.querySelector('select');
            if (select) {
                select.classList.add('hidden');
            }
        }
    });
    document.removeEventListener('click', hidePicker, true);
}
document.querySelectorAll('.data-picker-hour select').forEach(function(select) {
    select.addEventListener('click', function(event) {
        event.stopPropagation();
    });
    select.addEventListener('blur', function() {
        this.classList.add('hidden');
        this.parentElement.classList.remove('focused-clas');
    });
});

















document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('residence-sb-country');
    const ageList = document.querySelectorAll('.age-select-list li');

    // Невидимі інпути
    const hiddenCountryInput = document.getElementById('hidden-country');
    const hiddenAgeInput = document.getElementById('hidden-age');

    // Оновлення інпуту для країни
    countrySelect.addEventListener('change', function() {
        const selectedOption = countrySelect.options[countrySelect.selectedIndex];
        document.getElementById('sb-country').textContent = selectedOption.textContent;
        hiddenCountryInput.value = selectedOption.value;
    });

    // Оновлення інпуту для віку
    ageList.forEach(function(li) {
        li.addEventListener('click', function() {
            // Знімаємо вибір з усіх елементів
            ageList.forEach(function(el) {
                el.classList.remove('selected');
            });
            // Встановлюємо вибраний клас
            li.classList.add('selected');
            document.getElementById('sb-age').textContent = li.textContent;
            hiddenAgeInput.value = li.dataset.value;
        });
    });



    const pickupDateDisplay = document.getElementById('pickup-date-display');
    const pickupTimeSelect = document.getElementById('pickup-time-select');
    const pickupDateInput = document.getElementById('pickup-date-input');
    const pickupTimeInput = document.getElementById('pickup-time-input');

    const dropoffDateDisplay = document.getElementById('dropoff-date-display');
    const dropoffTimeSelect = document.getElementById('dropoff-time-select');
    const dropoffDateInput = document.getElementById('dropoff-date-input');
    const dropoffTimeInput = document.getElementById('dropoff-time-input');

    // Example function to set the date and time
    function setDateTime(pickerType, date, time) {
        if (pickerType === 'pickup') {
            pickupDateDisplay.textContent = date;
            pickupTimeDisplay.textContent = time;
            pickupDateInput.value = date;
            pickupTimeInput.value = time;
        } else if (pickerType === 'dropoff') {
            dropoffDateDisplay.textContent = date;
            dropoffTimeDisplay.textContent = time;
            dropoffDateInput.value = date;
            dropoffTimeInput.value = time;
        }
    }

});



const locationPlace =[
    'Miami - Airport, MIA, Florida, USA',
    'Kobe - Airport, UKB, Japan',
    'Reynosa - Airport, REX, Mexico',
    'Poznan - Airport - Lawica, POZ, Poland',
    'Trondheim - Airport, TRD, Norway',
    'Phoenix - Airport, PHX, Arizona, USA',
    'Portland - International Airport, PDX, Oregon, USA'
]