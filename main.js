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
    dropdown.style.top = this.offsetTop + this.offsetHeight + 'px';
    dropdown.style.left = this.offsetLeft + 'px';
    dropdown.classList.toggle('open');
});

document.getElementById('sb-age').addEventListener('click', function () {
    const dropdown = this.nextElementSibling;
    dropdown.style.top = this.offsetTop + this.offsetHeight + 'px';
    dropdown.style.left = this.offsetLeft + 'px';
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






document.querySelectorAll('.input-wrapper input').forEach(input => {
    input.addEventListener('input', function() {
        // Додаємо або видаляємо клас 'filled' в залежності від значення інпуту
        if (this.value.trim() !== '') {
            this.classList.add('filled');
        } else {
            this.classList.remove('filled');
        }
    });
});

// Додаємо подію кліку на всі іконки очищення тексту
document.querySelectorAll('.clear-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        // Очищаємо значення відповідного інпуту
        const input = this.previousElementSibling;
        input.value = '';
        input.classList.remove('filled');
    });
});



document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('myForm');
    const locationInput = document.getElementById('location');
    const returnLocationInput = document.getElementById('returnLocation');
    const locationPlace =[
        'Miami - Airport, MIA, Florida, USA',
        'Kobe - Airport, UKB, Japan',
        'Reynosa - Airport, REX, Mexico',
        'Poznan - Airport - Lawica, POZ, Poland',
        'Trondheim - Airport, TRD, Norway',
        'Phoenix - Airport, PHX, Arizona, USA',
        'Portland - International Airport, PDX, Oregon, USA',
        'Philadelphia Airport, PHL, Pennsylvania, USA',
        'Reno Airport, RNO, Nevada, USA',
        'Marrakech - Airport, RAK, Morocco',
        'Milan - Airport - Malpensa, MXP, Italy',
        'Knock - Airport, NOC, Ireland',
        'Warsaw - Airport - Frederic Chopin, WAW, Poland',
        'Jerez - Airport, XRY, Spain'
    ]
    const popularLocation = [
        'Warsaw - Airport - Frederic Chopin, WAW, Poland',
        'Miami - Airport, MIA, Florida, USA',
        'Kobe - Airport, UKB, Japan',
        'Reynosa - Airport, REX, Mexico',
        'Poznan - Airport - Lawica, POZ, Poland',
        'Trondheim - Airport, TRD, Norway',
        'Phoenix - Airport, PHX, Arizona, USA',
    ]

    function createCustomButton(label, iconPosition, iconType) {
        const buttonDiv = document.createElement('div');
        let svgIcon;

        if (iconType === 'rent') {
            svgIcon = `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" fill-rule="evenodd" d="M8 1a.75.75 0 01.691.46l5.25 12.5a.75.75 0 01-1.027.96L8 12.457 3.086 14.92a.75.75 0 01-1.027-.96l5.25-12.5A.75.75 0 018 1zM4.227 12.67l3.437-1.722a.75.75 0 01.672 0l3.437 1.723L8 3.687 4.227 12.67z" clip-rule="evenodd"></path></g></svg>`;
        } else {
            svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14.1 4C15.7167 4 17.1042 4.525 18.2625 5.575C19.4208 6.625 20 7.93333 20 9.5C20 11.0667 19.4208 12.375 18.2625 13.425C17.1042 14.475 15.7167 15 14.1 15H7.8L10.4 17.6L9 19L4 14L9 9L10.4 10.4L7.8 13H14.1C15.15 13 16.0625 12.6667 16.8375 12C17.6125 11.3333 18 10.5 18 9.5C18 8.5 17.6125 7.66667 16.8375 7C16.0625 6.33333 15.15 6 14.1 6H7V4H14.1Z" fill="black"/></svg>`;
        }

        buttonDiv.innerHTML = iconPosition === 'left' ? `${svgIcon} ${label}` : `${label} ${svgIcon}`;
        buttonDiv.querySelector('svg').style.margin = iconPosition === 'left' ? '0 10px 0 0' : '0 0 0 10px';
        buttonDiv.style.display = 'flex';
        buttonDiv.style.alignItems = 'center';
        return buttonDiv;
    }





    function autocomplete(inp, arr, isPickup) {
        let currentFocus;
        inp.addEventListener('input', function (e) {
            let a, b, i, val = this.value;
            closeAllLists();
            if (!val) {
                return false;
            }
            currentFocus = -1;
            a = document.createElement('DIV');
            a.setAttribute('id', this.id + '-autocomplete-list');
            a.setAttribute('class', 'autocomplete-items');
            this.parentNode.appendChild(a);

            if (isPickup) {
                const rentNearMeDiv = createCustomButton('Rent car near me', 'left', 'rent' );
                rentNearMeDiv.addEventListener('click', function (e) {
                    inp.value = 'Rent car near me';
                    closeAllLists();
                });
                a.appendChild(rentNearMeDiv);
            } else {
                const returnAtPickupDiv = createCustomButton('Return at Pick-up', 'left', 'return');
                returnAtPickupDiv.addEventListener('click', function (e) {
                    inp.value = locationInput.value;
                    closeAllLists();
                });
                a.appendChild(returnAtPickupDiv);
            }

            for (i = 0; i < arr.length; i++) {
                if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                    b = document.createElement('DIV');
                    b.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>';
                    b.innerHTML += arr[i].substr(val.length);
                    b.innerHTML += '<input type="hidden" value="' + arr[i] + '">';
                    b.addEventListener('click', function (e) {
                        inp.value = this.getElementsByTagName('input')[0].value;
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });

        inp.addEventListener('keydown', function (e) {
            let x = document.getElementById(this.id + '-autocomplete-list');
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

    autocomplete(locationInput, locationPlace, true);
    autocomplete(returnLocationInput, locationPlace, false);





    // Submit
    form.onsubmit = function (event) {
        event.preventDefault();

        document.getElementById('hidden-country').value = document.getElementById('sb-country').innerText;
        document.getElementById('hidden-age').value = document.getElementById('sb-age').innerText;
        document.getElementById('pickup-date-input').value = document.getElementById('pickup-date-display').innerText;
        document.getElementById('dropoff-date-input').value = document.getElementById('dropoff-date-display').innerText;
        document.getElementById('pickup-time-input').value = document.getElementById('pickup-hour-display').innerText;
        document.getElementById('dropoff-time-input').value = document.getElementById('dropoff-hour-display').innerText;

        const inputs = form.querySelectorAll("input[type='text'], input[type='hidden']");
        let formIsValid = true;
        let formData = {};




        inputs.forEach(input => {
            const inputWrapper = input.closest('.input-wrapper');
            if (inputWrapper) {
                const errorIcon = inputWrapper.querySelector('.error-icon');


                // при фокусі, видаляє іконку error
                input.addEventListener('focus', () => {
                    if (errorIcon) {
                        errorIcon.style.display = 'none';
                    }
                });

                //добавляє класс error і припиняє submit при певних умовах
                if (input.name === 'location' && !locationPlace.includes(input.value)) {
                    inputWrapper.classList.add('error');
                    input.classList.add('error');
                    input.classList.remove('filled');
                    if (errorIcon) {
                        errorIcon.style.display = 'inline';
                    }
                    formIsValid = false;

                } else if (input.name === 'returnLocation' && !locationPlace.includes(input.value) && !returnLocationWrapper.classList.contains('hidden')) {
                    inputWrapper.classList.add('error');
                    input.classList.add('error');
                    input.classList.remove('filled');
                    const locationInput = form.querySelector("input[name='location']");
                    if (errorIcon) {
                        errorIcon.style.display = 'inline';
                    }
                    formIsValid = false;
                } else if (input.name === 'returnLocation' && returnLocationWrapper.classList.contains('hidden')) {
                    const locationInput = form.querySelector("input[name='location']");
                    if (locationInput && locationPlace.includes(locationInput.value.trim())) {
                        input.value = locationInput.value.trim();
                        formData[input.name] = input.value;
                        inputWrapper.classList.remove('error');
                        input.classList.remove('error');
                        if (errorIcon) {
                            errorIcon.style.display = 'none';
                        }
                    }
                } else {
                    if (input.name !== 'search-country') {
                        formData[input.name] = input.value;
                    }
                    inputWrapper.classList.remove('error');
                    input.classList.remove('filled')
                    input.classList.remove('error');
                    if (errorIcon) {
                        errorIcon.style.display = 'none';
                    }
                }
            } else {
                if (input.name !== 'search-country') {
                    formData[input.name] = input.value;
                }
            }
        });

        if (formIsValid) {
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
                    form.reset();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            form.reset();
        }
    };


    // Hidden/find dropoff location
    const returnLocationButton = document.querySelector('.return-location');
    const returnLocationWrapper = document.getElementById('returnLocationWrapper');
    const closeDropoffLocation = document.getElementById('expanded-icon2');

    returnLocationButton.addEventListener('click', () => {
        returnLocationButton.classList.add('hidden');
        returnLocationWrapper.classList.remove('hidden');
    });

    closeDropoffLocation.addEventListener('click', () => {
        returnLocationButton.classList.remove('hidden');
        returnLocationWrapper.classList.add('hidden');
    })

})




// calendar
document.addEventListener('DOMContentLoaded', function () {
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
            cell.dataset.date = date.toISOString(); // Зберігаємо дату у форматі ISO

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

                cell.addEventListener('mouseover', () => {
                    if (currentPicker === 'dropoff' && selectedPickupDate && date > selectedPickupDate) {
                        addInRangeClasses(date);
                        cell.classList.add('hover-highlight');
                    }
                });

                cell.addEventListener('mouseout', () => {
                    clearInRangeClasses();
                    cell.classList.remove('hover-highlight');
                });
            }

            if (date.toDateString() === today.toDateString()) {
                cell.classList.add('today');
            }

            if (selectedPickupDate && date.toDateString() === selectedPickupDate.toDateString()) {
                cell.classList.add('selected-pickup');
            }

            if (selectedDropoffDate && date.toDateString() === selectedDropoffDate.toDateString()) {
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
            currentPicker = 'dropoff';
            pickupPicker.classList.remove('focused-clas');
            dropoffPicker.classList.add('focused-clas');
        } else if (currentPicker === 'dropoff') {
            selectedDropoffDate = date;
            currentPicker = 'pickup';
            calendarContainer.style.display = 'none'; // Закрити календар після вибору дати дроп-оф
        }
        updateCalendar();
        updateDateDisplays();
        updateContinueButton();
    }

    function updateDateDisplays() {
        const pickupDateDisplay = document.getElementById('pickup-date-display');
        const dropoffDateDisplay = document.getElementById('dropoff-date-display');
        const pickupDateDisplayModal = document.getElementById('pickup-date-display-modal'); // NEW
        const dropoffDateDisplayModal = document.getElementById('dropoff-date-display-modal'); // NEW

        pickupDateDisplay.textContent = formatDate(selectedPickupDate);
        dropoffDateDisplay.textContent = formatDate(selectedDropoffDate);

        pickupDateDisplayModal.textContent = `${formatDate(selectedPickupDate)}`; // NEW
        dropoffDateDisplayModal.textContent = `${formatDate(selectedDropoffDate)}`; // NEW

        // Додав перевірку для активних блоків
        if (currentPicker === 'pickup') {
            pickupDateDisplayModal.parentElement.classList.add('active');
            dropoffDateDisplayModal.parentElement.classList.remove('active');
        } else {
            pickupDateDisplayModal.parentElement.classList.remove('active');
            dropoffDateDisplayModal.parentElement.classList.add('active');
        }
    }

    function formatDate(date) {
        if (!date) return 'N/A';
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    function showCalendar(event) {
        event.stopPropagation();

        if (window.innerWidth <= 768) { // NEW
            showModal(); // NEW
            return; // NEW
        } // NEW

        calendarContainer.style.display = 'block';

        const rect = document.getElementById('original-picker-section');

        calendarContainer.style.position = 'absolute';
        calendarContainer.style.top = `${rect.bottom + window.scrollY}px`;
        calendarContainer.style.left = `${rect.left}px`;

        if (event.currentTarget.id === 'pickup-picker') {
            currentPicker = 'pickup';
        } else if (event.currentTarget.id === 'dropoff-picker') {
            currentPicker = 'dropoff';
        }
        updateCalendar();
    }

    function hideCalendar(event) {
        const calendar = document.querySelector('.calendar-container');
        if (calendar.style.display === 'block' && !calendar.contains(event.target) &&
            !event.target.closest('#pickup-picker') &&
            !event.target.closest('#dropoff-picker') &&
            !event.target.closest('#prev-button') &&
            !event.target.closest('#next-button') &&
            currentPicker === 'pickup') {
            calendar.style.display = 'none';
        }
    }

    function showPreviousMonth() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    }

    function showNextMonth() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    }

    function addInRangeClasses(hoverDate) {
        document.querySelectorAll('.day-cell').forEach(dayCell => {
            const dayDate = new Date(dayCell.dataset.date);
            if (dayDate > selectedPickupDate && dayDate < hoverDate) {
                dayCell.classList.add('in-range');
            }
        });
    }

    function clearInRangeClasses() {
        document.querySelectorAll('.day-cell').forEach(dayCell => {
            dayCell.classList.remove('in-range');
        });
    }

    // NEW: Функції для модального вікна
    function showModal() {
        const modal = document.getElementById('date-modal');
        modal.classList.remove('hidden');

        updateModalCalendar(); // Виклик функції оновлення календаря

        document.getElementById('close-modal-btn').addEventListener('click', hideModal);
        document.getElementById('continue-btn').addEventListener('click', hideModal);
    }

    function updateModalCalendar() {
        const modalCalendarContainer = document.getElementById('calendar-container-modal');
        modalCalendarContainer.innerHTML = ''; // Очищення контейнера календаря модального вікна

        // Масив для зберігання контейнерів для місяців
        const calendarContainers = [];

        // Створення та додавання контейнерів для 10 місяців
        for (let i = 0; i < 10; i++) {
            const calendarSection = document.createElement('div'); // NEW
            calendarSection.classList.add('calendar-section'); // NEW

            const newContainer = document.createElement('div');
            newContainer.classList.add('calendar-body');

            const monthYearElement = document.createElement('div'); // NEW
            monthYearElement.classList.add('month-year'); // NEW
            calendarSection.appendChild(monthYearElement); // NEW

            calendarSection.appendChild(newContainer);
            calendarContainers.push(newContainer);
            modalCalendarContainer.appendChild(calendarSection); // NEW
        }

        // Заповнення календарів даними для кожного місяця
        for (let i = 0; i < 10; i++) {
            const monthYear = getAdjustedMonthYear(currentMonth + i, currentYear);
            const monthDays = getDaysInMonth(monthYear.year, monthYear.month);

            const monthYearElement = calendarContainers[i].previousElementSibling; // NEW
            monthYearElement.textContent = `${months[monthYear.month]} ${monthYear.year}`;

            appendWeekDays(calendarContainers[i]);
            appendDays(calendarContainers[i], monthDays, monthYear.month, monthYear.year);
        }

        updateDateDisplays(); // Оновлення відображення дати
    }

    function hideModal() { // NEW
        const modal = document.getElementById('date-modal');
        modal.classList.add('hidden');
    }
    function updateContinueButton() {
        const continueButton = document.getElementById('continue-btn');
        if (selectedDropoffDate) {
            continueButton.disabled = false;
            continueButton.style.opacity = 1;
        } else {
            continueButton.disabled = true;
            continueButton.style.opacity = 0.5;
        }
    }

    // Initial setup
    updateCalendar();

    pickupPicker.addEventListener('click', showCalendar);
    dropoffPicker.addEventListener('click', showCalendar);
    document.addEventListener('click', hideCalendar);
    prevButton.addEventListener('click', showPreviousMonth);
    nextButton.addEventListener('click', showNextMonth);
});









document.addEventListener('DOMContentLoaded', () => {
    const pickupPicker = document.getElementById('pickup-picker');
    const dropoffPicker = document.getElementById('dropoff-picker');
    const myForm = document.getElementById('myForm');

    const handlePickersPositioning = () => {
        // Отримати координати myForm
        const formRect = myForm.getBoundingClientRect();

        // Позиціонувати pickupPicker зліва
        pickupPicker.style.top = `${formRect.top}px`;
        pickupPicker.style.left = `${formRect.left}px`;
        pickupPicker.style.right = 'auto';
        pickupPicker.classList.add('active-picker', 'left-side');

        // Позиціонувати dropoffPicker справа
        dropoffPicker.style.top = `${formRect.top}px`;
        dropoffPicker.style.right = `${window.innerWidth - formRect.right}px`;
        dropoffPicker.style.left = 'auto';
        dropoffPicker.classList.add('active-picker', 'right-side');
    };

    pickupPicker.addEventListener('click', handlePickersPositioning);
    dropoffPicker.addEventListener('click', handlePickersPositioning);
});

function toggleSelectVisibility(containerId, selectId) {
    const container = document.getElementById(containerId);
    const select = document.getElementById(selectId);

    container.addEventListener('click', function (event) {
        event.stopPropagation();
        select.classList.toggle('hidden');
        select.style.position = 'absolute';
        select.style.top = container.offsetHeight + 'px';
        select.style.left = '0';
        select.style.width = container.offsetWidth + 'px';
        select.focus();
    });

    select.addEventListener('change', function () {
        document.getElementById(containerId).querySelector('span').innerText = this.options[this.selectedIndex].text;;

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
        // event.stopPropagation();
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
    const pickupTimeDisplay = document.getElementById('pickup-time-select');
    const pickupDateInput = document.getElementById('pickup-date-input');
    const pickupTimeInput = document.getElementById('pickup-time-input');

    const dropoffDateDisplay = document.getElementById('dropoff-date-display');
    const dropoffTimeDisplay = document.getElementById('dropoff-time-select');
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