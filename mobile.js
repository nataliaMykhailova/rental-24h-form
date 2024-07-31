document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth < 768) {
        const formContainer = document.querySelector('.search-container');
        const expandableElements = document.querySelectorAll('.expandable');
        const removeIcon = document.getElementById('remove-expanded-icon');
        const returnLocationWrapper = document.getElementById('returnLocationWrapper')
        const promoCodeField = document.querySelector('.promo-code');

        expandableElements.forEach(element => {
            element.addEventListener('input', function () {
                if (element.value.trim() !== "") {
                    formContainer.classList.add('expanded');
                    document.querySelectorAll('.return-location, .data-picker-container, .residence-and-age, .check-box, .input-wrapper, .submit-btn, .promo-code, #returnLocationWrapper')
                        .forEach(el => el.classList.add('expanded'));
                    removeIcon.style.display = 'inline';
                } else {
                    formContainer.classList.remove('expanded');
                    document.querySelectorAll('.return-location, .data-picker-container, .residence-and-age, .check-box, .input-wrapper, .submit-btn')
                        .forEach(el => el.classList.remove('expanded'));
                    removeIcon.style.display = 'none';
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







// document.addEventListener('DOMContentLoaded', function () {
//     const calendarBody1 = document.getElementById('calendar-body-1');
//     const calendarBody2 = document.getElementById('calendar-body-2');
//     const prevButton = document.getElementById('prev-button');
//     const nextButton = document.getElementById('next-button');
//     const monthYear1 = document.getElementById('month-year-1');
//     const monthYear2 = document.getElementById('month-year-2');
//     const pickupPicker = document.getElementById('pickup-picker');
//     const dropoffPicker = document.getElementById('dropoff-picker');
//
//     const calendarContainer = document.querySelector('.calendar-container');
//     const dateModal = document.getElementById('date-modal');
//     const closeModalBtn = document.getElementById('close-modal-btn');
//     const continueBtn = document.getElementById('continue-btn');
//     const calendarContainerModal = document.getElementById('calendar-container-modal');
//
//     const today = new Date();
//     let currentMonth = today.getMonth();
//     let currentYear = today.getFullYear();
//
//     let selectedPickupDate = new Date(today);
//     let selectedDropoffDate = new Date(today);
//
//     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
//
//     let currentPicker = 'pickup';
//
//     function updateCalendar() {
//         calendarBody1.innerHTML = '';
//         calendarBody2.innerHTML = '';
//
//         const firstMonthYear = getAdjustedMonthYear(currentMonth, currentYear);
//         const secondMonthYear = getAdjustedMonthYear(currentMonth + 1, currentYear);
//
//         const firstMonthDays = getDaysInMonth(firstMonthYear.year, firstMonthYear.month);
//         const secondMonthDays = getDaysInMonth(secondMonthYear.year, secondMonthYear.month);
//
//         monthYear1.textContent = `${months[firstMonthYear.month]} ${firstMonthYear.year}`;
//         monthYear2.textContent = `${months[secondMonthYear.month]} ${secondMonthYear.year}`;
//
//         appendWeekDays(calendarBody1);
//         appendDays(calendarBody1, firstMonthDays, firstMonthYear.month, firstMonthYear.year);
//
//         appendWeekDays(calendarBody2);
//         appendDays(calendarBody2, secondMonthDays, secondMonthYear.month, secondMonthYear.year);
//
//         updateDateDisplays();
//     }
//
//     function appendWeekDays(container) {
//         weekDays.forEach(day => {
//             const cell = document.createElement('div');
//             cell.className = 'day-cell weekday-header';
//             cell.textContent = day;
//             container.appendChild(cell);
//         });
//     }
//
//     function appendDays(container, days, month, year) {
//         const firstDay = new Date(year, month, 1).getDay();
//         const emptyCells = (firstDay + 6) % 7;
//
//         for (let i = 0; i < emptyCells; i++) {
//             const emptyCell = document.createElement('div');
//             emptyCell.className = 'day-cell';
//             container.appendChild(emptyCell);
//         }
//
//         days.forEach((day) => {
//             const cell = document.createElement('div');
//             cell.className = 'day-cell';
//             cell.textContent = day;
//             const date = new Date(year, month, day);
//
//             if (date < today && date.toDateString() !== today.toDateString()) {
//                 cell.classList.add('past-date');
//             } else {
//                 if (date.getDay() === 0 || date.getDay() === 6) {
//                     cell.classList.add('weekend');
//                 } else {
//                     cell.classList.add('weekday');
//                 }
//
//                 if (currentPicker === 'dropoff' && selectedPickupDate && date < selectedPickupDate) {
//                     cell.classList.add('disabled');
//                 } else {
//                     cell.addEventListener('click', () => selectDate(date));
//                 }
//             }
//
//             if (date.toDateString() === today.toDateString()) {
//                 cell.classList.add('today');
//             }
//
//             if (selectedPickupDate && date.toDateString() === selectedPickupDate.toDateString()) {
//                 cell.classList.add('selected-pickup');
//             }
//
//             if (selectedDropoffDate && date.toDateString() === selectedDropoffDate.toDateString()) {
//                 cell.classList.add('selected-dropoff');
//             }
//
//             if (selectedPickupDate && selectedDropoffDate && date > selectedPickupDate && date < selectedDropoffDate) {
//                 cell.classList.add('in-range');
//             }
//
//             container.appendChild(cell);
//         });
//
//         const totalCells = emptyCells + days.length;
//         const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
//         for (let i = 0; i < remainingCells; i++) {
//             const emptyCell = document.createElement('div');
//             emptyCell.className = 'day-cell';
//             container.appendChild(emptyCell);
//         }
//     }
//
//     function getDaysInMonth(year, month) {
//         const date = new Date(year, month, 1);
//         const days = [];
//         while (date.getMonth() === month) {
//             days.push(date.getDate());
//             date.setDate(date.getDate() + 1);
//         }
//         return days;
//     }
//
//     function getAdjustedMonthYear(month, year) {
//         if (month < 0) {
//             return { month: 11, year: year - 1 };
//         } else if (month > 11) {
//             return { month: 0, year: year + 1 };
//         } else {
//             return { month: month, year: year };
//         }
//     }
//
//     function selectDate(date) {
//         if (currentPicker === 'pickup') {
//             selectedPickupDate = date;
//             if (selectedDropoffDate && selectedDropoffDate < selectedPickupDate) {
//                 selectedDropoffDate = null;
//             }
//         } else if (currentPicker === 'dropoff') {
//             selectedDropoffDate = date;
//         }
//         updateCalendar();
//         updateDateDisplays();
//     }
//
//     function updateDateDisplays() {
//         const pickupDateDisplay = document.getElementById('pickup-date-display');
//         const dropoffDateDisplay = document.getElementById('dropoff-date-display');
//         const pickupDateDisplayModal = document.getElementById('pickup-date-display-modal');
//         const dropoffDateDisplayModal = document.getElementById('dropoff-date-display-modal');
//
//         pickupDateDisplay.textContent = formatDate(selectedPickupDate);
//         dropoffDateDisplay.textContent = formatDate(selectedDropoffDate);
//         pickupDateDisplayModal.textContent = formatDate(selectedPickupDate);
//         dropoffDateDisplayModal.textContent = formatDate(selectedDropoffDate);
//     }
//
//     function formatDate(date) {
//         if (!date) return 'N/A';
//         const options = { month: 'short', day: 'numeric' };
//         return date.toLocaleDateString('en-US', options);
//     }
//
//     function showCalendar(event) {
//         event.stopPropagation();
//
//         if (window.innerWidth <= 768) {
//             // Mobile version - show modal
//             dateModal.classList.remove('hidden');
//
//             if (event.currentTarget.id === 'pickup-picker') {
//                 currentPicker = 'pickup';
//             } else if (event.currentTarget.id === 'dropoff-picker') {
//                 currentPicker = 'dropoff';
//             }
//
//             updateCalendarModal();
//         } else {
//             // Desktop version - show inline calendar
//             const calendar = document.querySelector('.calendar-container');
//             calendar.style.display = 'block';
//
//             const rect = event.currentTarget.getBoundingClientRect();
//             const calendarRect = calendar.getBoundingClientRect();
//
//             calendar.style.position = 'absolute';
//             calendar.style.top = `${rect.bottom + window.scrollY}px`;
//             calendar.style.left = `${rect.left}px`;
//
//             if (event.currentTarget.id === 'pickup-picker') {
//                 currentPicker = 'pickup';
//             } else if (event.currentTarget.id === 'dropoff-picker') {
//                 currentPicker = 'dropoff';
//             }
//             updateCalendar();
//         }
//     }
//
//     function hideCalendar(event) {
//         const calendar = document.querySelector('.calendar-container');
//         if (calendar.style.display === 'block' && !calendar.contains(event.target) &&
//             !event.target.closest('#pickup-picker') &&
//             !event.target.closest('#dropoff-picker') &&
//             !event.target.closest('#prev-button') &&
//             !event.target.closest('#next-button')) {
//             calendar.style.display = 'none';
//         }
//     }
//
//     // Update calendar in modal
//     function updateCalendarModal() {
//         calendarContainerModal.innerHTML = '';
//
//         function appendMonth(container, month, year) {
//             const monthYearDiv = document.createElement('div');
//             monthYearDiv.className = 'month-year';
//             monthYearDiv.textContent = `${months[month]} ${year}`;
//             container.appendChild(monthYearDiv);
//
//             appendWeekDays(container);
//             const days = getDaysInMonth(year, month);
//             appendDays(container, days, month, year);
//         }
//
//         function appendWeekDays(container) {
//             weekDays.forEach(day => {
//                 const cell = document.createElement('div');
//                 cell.className = 'day-cell weekday-header';
//                 cell.textContent = day;
//                 container.appendChild(cell);
//             });
//         }
//
//         function appendDays(container, days, month, year) {
//             const firstDay = new Date(year, month, 1).getDay();
//             const emptyCells = (firstDay + 6) % 7;
//
//             for (let i = 0; i < emptyCells; i++) {
//                 const emptyCell = document.createElement('div');
//                 emptyCell.className = 'day-cell';
//                 container.appendChild(emptyCell);
//             }
//
//             days.forEach(day => {
//                 const cell = document.createElement('div');
//                 cell.className = 'day-cell';
//                 cell.textContent = day;
//                 const date = new Date(year, month, day);
//
//                 if (date < today && date.toDateString() !== today.toDateString()) {
//                     cell.classList.add('past-date');
//                 } else {
//                     if (date.getDay() === 0 || date.getDay() === 6) {
//                         cell.classList.add('weekend');
//                     } else {
//                         cell.classList.add('weekday');
//                     }
//
//                     if (currentPicker === 'dropoff' && selectedPickupDate && date < selectedPickupDate) {
//                         cell.classList.add('disabled');
//                     } else {
//                         cell.addEventListener('click', () => selectDateInModal(date));
//                     }
//                 }
//
//                 if (date.toDateString() === today.toDateString()) {
//                     cell.classList.add('today');
//                 }
//
//                 if (selectedPickupDate && date.toDateString() === selectedPickupDate.toDateString()) {
//                     cell.classList.add('selected-pickup');
//                 }
//
//                 if (selectedDropoffDate && date.toDateString() === selectedDropoffDate.toDateString()) {
//                     cell.classList.add('selected-dropoff');
//                 }
//
//                 if (selectedPickupDate && selectedDropoffDate && date > selectedPickupDate && date < selectedDropoffDate) {
//                     cell.classList.add('in-range');
//                 }
//
//                 container.appendChild(cell);
//             });
//
//             const totalCells = emptyCells + days.length;
//             const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
//             for (let i = 0; i < remainingCells; i++) {
//                 const emptyCell = document.createElement('div');
//                 emptyCell.className = 'day-cell';
//                 container.appendChild(emptyCell);
//             }
//         }
//
//         const startMonth = today.getMonth();
//         const startYear = today.getFullYear();
//
//         for (let i = 0; i < 12; i++) {
//             const month = (startMonth + i) % 12;
//             const year = startYear + Math.floor((startMonth + i) / 12);
//             appendMonth(calendarContainerModal, month, year);
//         }
//     }
//
//     function selectDateInModal(date) {
//         if (currentPicker === 'pickup') {
//             selectedPickupDate = date;
//             if (selectedDropoffDate && selectedDropoffDate < selectedPickupDate) {
//                 selectedDropoffDate = null;
//             }
//         } else if (currentPicker === 'dropoff') {
//             selectedDropoffDate = date;
//         }
//         updateCalendarModal();
//         updateDateDisplays();
//     }
//
//     function handleContinueBtnClick() {
//         if (selectedPickupDate && selectedDropoffDate) {
//             dateModal.classList.add('hidden');
//         }
//     }
//
//     // Add month navigation functionality
//     function showPreviousMonth() {
//         currentMonth--;
//         if (currentMonth < 0) {
//             currentMonth = 11;
//             currentYear--;
//         }
//         updateCalendar();
//     }
//
//     function showNextMonth() {
//         currentMonth++;
//         if (currentMonth > 11) {
//             currentMonth = 0;
//             currentYear++;
//         }
//         updateCalendar();
//     }
//
//     // Initial setup
//     updateCalendar();
//     updateCalendarModal();
//
//     pickupPicker.addEventListener('click', showCalendar);
//     dropoffPicker.addEventListener('click', showCalendar);
//     document.addEventListener('click', hideCalendar);
//     closeModalBtn.addEventListener('click', () => dateModal.classList.add('hidden'));
//     continueBtn.addEventListener('click', handleContinueBtnClick);
//     prevButton.addEventListener('click', showPreviousMonth); // Add event listener for previous month
//     nextButton.addEventListener('click', showNextMonth); // Add event listener for next month
//
//     // Update continue button state
//     function updateContinueButton() {
//         continueBtn.style.opacity = (selectedPickupDate && selectedDropoffDate) ? '1' : '0.5';
//         continueBtn.disabled = !(selectedPickupDate && selectedDropoffDate);
//     }
// });







// document.addEventListener('DOMContentLoaded', function () {
//     const calendarBody1 = document.getElementById('calendar-body-1');
//     const calendarBody2 = document.getElementById('calendar-body-2');
//     const prevButton = document.getElementById('prev-button');
//     const nextButton = document.getElementById('next-button');
//     const monthYear1 = document.getElementById('month-year-1');
//     const monthYear2 = document.getElementById('month-year-2');
//     const pickupPicker = document.getElementById('pickup-picker');
//     const dropoffPicker = document.getElementById('dropoff-picker');
//
//     const calendarContainer = document.querySelector('.calendar-container');
//     const dateModal = document.getElementById('date-modal');
//     const closeModalBtn = document.getElementById('close-modal-btn');
//     const continueBtn = document.getElementById('continue-btn');
//     const calendarContainerModal = document.getElementById('calendar-container-modal');
//
//     const today = new Date();
//     let currentMonth = today.getMonth();
//     let currentYear = today.getFullYear();
//
//     let selectedPickupDate = new Date(today);
//     let selectedDropoffDate = new Date(today);
//
//     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
//
//     let currentPicker = 'pickup';
//
//     function updateCalendar() {
//         calendarBody1.innerHTML = '';
//         calendarBody2.innerHTML = '';
//
//         const firstMonthYear = getAdjustedMonthYear(currentMonth, currentYear);
//         const secondMonthYear = getAdjustedMonthYear(currentMonth + 1, currentYear);
//
//         const firstMonthDays = getDaysInMonth(firstMonthYear.year, firstMonthYear.month);
//         const secondMonthDays = getDaysInMonth(secondMonthYear.year, secondMonthYear.month);
//
//         monthYear1.textContent = `${months[firstMonthYear.month]} ${firstMonthYear.year}`;
//         monthYear2.textContent = `${months[secondMonthYear.month]} ${secondMonthYear.year}`;
//
//         appendWeekDays(calendarBody1);
//         appendDays(calendarBody1, firstMonthDays, firstMonthYear.month, firstMonthYear.year);
//
//         appendWeekDays(calendarBody2);
//         appendDays(calendarBody2, secondMonthDays, secondMonthYear.month, secondMonthYear.year);
//
//         updateDateDisplays();
//     }
//
//     function appendWeekDays(container) {
//         weekDays.forEach(day => {
//             const cell = document.createElement('div');
//             cell.className = 'day-cell weekday-header';
//             cell.textContent = day;
//             container.appendChild(cell);
//         });
//     }
//
//     function appendDays(container, days, month, year) {
//         const firstDay = new Date(year, month, 1).getDay();
//         const emptyCells = (firstDay + 6) % 7;
//
//         for (let i = 0; i < emptyCells; i++) {
//             const emptyCell = document.createElement('div');
//             emptyCell.className = 'day-cell';
//             container.appendChild(emptyCell);
//         }
//
//         days.forEach((day) => {
//             const cell = document.createElement('div');
//             cell.className = 'day-cell';
//             cell.textContent = day;
//             const date = new Date(year, month, day);
//
//             if (date < today && date.toDateString() !== today.toDateString()) {
//                 cell.classList.add('past-date');
//             } else {
//                 if (date.getDay() === 0 || date.getDay() === 6) {
//                     cell.classList.add('weekend');
//                 } else {
//                     cell.classList.add('weekday');
//                 }
//
//                 if (currentPicker === 'dropoff' && selectedPickupDate && date < selectedPickupDate) {
//                     cell.classList.add('disabled');
//                 } else {
//                     cell.addEventListener('click', () => selectDate(date));
//                 }
//             }
//
//             if (date.toDateString() === today.toDateString()) {
//                 cell.classList.add('today');
//             }
//
//             if (selectedPickupDate && date.toDateString() === selectedPickupDate.toDateString()) {
//                 cell.classList.add('selected-pickup');
//             }
//
//             if (selectedDropoffDate && date.toDateString() === selectedDropoffDate.toDateString()) {
//                 cell.classList.add('selected-dropoff');
//             }
//
//             if (selectedPickupDate && selectedDropoffDate && date > selectedPickupDate && date < selectedDropoffDate) {
//                 cell.classList.add('in-range');
//             }
//
//             container.appendChild(cell);
//         });
//
//         const totalCells = emptyCells + days.length;
//         const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
//         for (let i = 0; i < remainingCells; i++) {
//             const emptyCell = document.createElement('div');
//             emptyCell.className = 'day-cell';
//             container.appendChild(emptyCell);
//         }
//     }
//
//     function getDaysInMonth(year, month) {
//         const date = new Date(year, month, 1);
//         const days = [];
//         while (date.getMonth() === month) {
//             days.push(date.getDate());
//             date.setDate(date.getDate() + 1);
//         }
//         return days;
//     }
//
//     function getAdjustedMonthYear(month, year) {
//         if (month < 0) {
//             return { month: 11, year: year - 1 };
//         } else if (month > 11) {
//             return { month: 0, year: year + 1 };
//         } else {
//             return { month: month, year: year };
//         }
//     }
//
//     function selectDate(date) {
//         if (currentPicker === 'pickup') {
//             selectedPickupDate = date;
//             if (selectedDropoffDate && selectedDropoffDate < selectedPickupDate) {
//                 selectedDropoffDate = null;
//             }
//         } else if (currentPicker === 'dropoff') {
//             selectedDropoffDate = date;
//         }
//         updateCalendar();
//         updateDateDisplays();
//     }
//
//     function updateDateDisplays() {
//         const pickupDateDisplay = document.getElementById('pickup-date-display');
//         const dropoffDateDisplay = document.getElementById('dropoff-date-display');
//         const pickupDateDisplayModal = document.getElementById('pickup-date-display-modal');
//         const dropoffDateDisplayModal = document.getElementById('dropoff-date-display-modal');
//
//         pickupDateDisplay.textContent = formatDate(selectedPickupDate);
//         dropoffDateDisplay.textContent = formatDate(selectedDropoffDate);
//         pickupDateDisplayModal.textContent = formatDate(selectedPickupDate);
//         dropoffDateDisplayModal.textContent = formatDate(selectedDropoffDate);
//     }
//
//     function formatDate(date) {
//         if (!date) return 'N/A';
//         const options = { month: 'short', day: 'numeric' };
//         return date.toLocaleDateString('en-US', options);
//     }
//
//     function showCalendar(event) {
//         event.stopPropagation();
//
//         if (window.innerWidth <= 768) {
//             // Mobile version - show modal
//             dateModal.classList.remove('hidden');
//
//             if (event.currentTarget.id === 'pickup-picker') {
//                 currentPicker = 'pickup';
//             } else if (event.currentTarget.id === 'dropoff-picker') {
//                 currentPicker = 'dropoff';
//             }
//
//             updateCalendarModal();
//         } else {
//             // Desktop version - show inline calendar
//             const calendar = document.querySelector('.calendar-container');
//             calendar.style.display = 'block';
//
//             const rect = event.currentTarget.getBoundingClientRect();
//             const calendarRect = calendar.getBoundingClientRect();
//
//             calendar.style.position = 'absolute';
//             calendar.style.top = `${rect.bottom + window.scrollY}px`;
//             calendar.style.left = `${rect.left}px`;
//
//             if (event.currentTarget.id === 'pickup-picker') {
//                 currentPicker = 'pickup';
//             } else if (event.currentTarget.id === 'dropoff-picker') {
//                 currentPicker = 'dropoff';
//             }
//             updateCalendar();
//         }
//     }
//
//     function hideCalendar(event) {
//         const calendar = document.querySelector('.calendar-container');
//         if (calendar.style.display === 'block' && !calendar.contains(event.target) &&
//             !event.target.closest('#pickup-picker') &&
//             !event.target.closest('#dropoff-picker') &&
//             !event.target.closest('#prev-button') &&
//             !event.target.closest('#next-button')) {
//             calendar.style.display = 'none';
//         }
//     }
//
//     // Update calendar in modal
//     function updateCalendarModal() {
//         calendarContainerModal.innerHTML = '';
//
//         function appendMonth(container, month, year) {
//             const monthYearDiv = document.createElement('div');
//             monthYearDiv.className = 'month-year';
//             monthYearDiv.textContent = `${months[month]} ${year}`;
//             container.appendChild(monthYearDiv);
//
//             appendWeekDays(container);
//             const days = getDaysInMonth(year, month);
//             appendDays(container, days, month, year);
//         }
//
//         function appendWeekDays(container) {
//             weekDays.forEach(day => {
//                 const cell = document.createElement('div');
//                 cell.className = 'day-cell weekday-header';
//                 cell.textContent = day;
//                 container.appendChild(cell);
//             });
//         }
//
//         function appendDays(container, days, month, year) {
//             const firstDay = new Date(year, month, 1).getDay();
//             const emptyCells = (firstDay + 6) % 7;
//
//             for (let i = 0; i < emptyCells; i++) {
//                 const emptyCell = document.createElement('div');
//                 emptyCell.className = 'day-cell';
//                 container.appendChild(emptyCell);
//             }
//
//             days.forEach(day => {
//                 const cell = document.createElement('div');
//                 cell.className = 'day-cell';
//                 cell.textContent = day;
//                 const date = new Date(year, month, day);
//
//                 if (date < today && date.toDateString() !== today.toDateString()) {
//                     cell.classList.add('past-date');
//                 } else {
//                     if (date.getDay() === 0 || date.getDay() === 6) {
//                         cell.classList.add('weekend');
//                     } else {
//                         cell.classList.add('weekday');
//                     }
//
//                     if (currentPicker === 'dropoff' && selectedPickupDate && date < selectedPickupDate) {
//                         cell.classList.add('disabled');
//                     } else {
//                         cell.addEventListener('click', () => selectDateInModal(date));
//                     }
//                 }
//
//                 if (date.toDateString() === today.toDateString()) {
//                     cell.classList.add('today');
//                 }
//
//                 if (selectedPickupDate && date.toDateString() === selectedPickupDate.toDateString()) {
//                     cell.classList.add('selected-pickup');
//                 }
//
//                 if (selectedDropoffDate && date.toDateString() === selectedDropoffDate.toDateString()) {
//                     cell.classList.add('selected-dropoff');
//                 }
//
//                 if (selectedPickupDate && selectedDropoffDate && date > selectedPickupDate && date < selectedDropoffDate) {
//                     cell.classList.add('in-range');
//                 }
//
//                 container.appendChild(cell);
//             });
//
//             const totalCells = emptyCells + days.length;
//             const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
//             for (let i = 0; i < remainingCells; i++) {
//                 const emptyCell = document.createElement('div');
//                 emptyCell.className = 'day-cell';
//                 container.appendChild(emptyCell);
//             }
//         }
//
//         const startMonth = today.getMonth();
//         const startYear = today.getFullYear();
//
//         for (let i = 0; i < 12; i++) {
//             const month = (startMonth + i) % 12;
//             const year = startYear + Math.floor((startMonth + i) / 12);
//             appendMonth(calendarContainerModal, month, year);
//         }
//     }
//
//     function selectDateInModal(date) {
//         if (currentPicker === 'pickup') {
//             selectedPickupDate = date;
//             if (selectedDropoffDate && selectedDropoffDate < selectedPickupDate) {
//                 selectedDropoffDate = null;
//             }
//         } else if (currentPicker === 'dropoff') {
//             selectedDropoffDate = date;
//         }
//         updateCalendarModal();
//         updateDateDisplays();
//     }
//
//     function handleContinueBtnClick() {
//         if (selectedPickupDate && selectedDropoffDate) {
//             dateModal.classList.add('hidden');
//         }
//     }
//
//     // Add month navigation functionality
//     function showPreviousMonth() {
//         currentMonth--;
//         if (currentMonth < 0) {
//             currentMonth = 11;
//             currentYear--;
//         }
//         updateCalendar();
//     }
//
//     function showNextMonth() {
//         currentMonth++;
//         if (currentMonth > 11) {
//             currentMonth = 0;
//             currentYear++;
//         }
//         updateCalendar();
//     }
//
//     // Initial setup
//     updateCalendar();
//     updateCalendarModal();
//
//     pickupPicker.addEventListener('click', showCalendar);
//     dropoffPicker.addEventListener('click', showCalendar);
//     document.addEventListener('click', hideCalendar);
//     closeModalBtn.addEventListener('click', () => dateModal.classList.add('hidden'));
//     continueBtn.addEventListener('click', handleContinueBtnClick);
//     prevButton.addEventListener('click', showPreviousMonth); // Add event listener for previous month
//     nextButton.addEventListener('click', showNextMonth); // Add event listener for next month
//
//     // Update continue button state
//     function updateContinueButton() {
//         continueBtn.style.opacity = (selectedPickupDate && selectedDropoffDate) ? '1' : '0.5';
//         continueBtn.disabled = !(selectedPickupDate && selectedDropoffDate);
//     }
// });






