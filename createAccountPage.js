const monthsInfo = {
    January: { monthNumber: 0, numberOfDays: 31 },
    February: { monthNumber: 1, numberOfDays: 28 },
    March: { monthNumber: 2, numberOfDays: 31 },
    April: { monthNumber: 3, numberOfDays: 30 },
    May: { monthNumber: 4, numberOfDays: 31 },
    June: { monthNumber: 5, numberOfDays: 30 },
    July: { monthNumber: 6, numberOfDays: 31 },
    August: { monthNumber: 7, numberOfDays: 31 },
    September: { monthNumber: 8, numberOfDays: 30 },
    October: { monthNumber: 9, numberOfDays: 31 },
    November: { monthNumber: 10, numberOfDays: 30 },
    December: { monthNumber: 11, numberOfDays: 31 },
}

/**
 * @author Hazem Sabry 
 * @gmail hazemsabry2002@gmail.com
 * Class representing a Card.
 * @constructor
 */
class Card {
    root;
    body;
    pageFlexDirection;
    inputs;
    selects;
    pageHeader;
    cardsContainer;
    cardContainers;
    backgroundColor;
    submitBtn;
    birthYearSelect;
    birthMonthSelect;
    birthDaySelect;
    birthDateSelectCard2;
    year;
    month;
    day;
    yearOfBirth;
    monthOfBirth;
    dayOfBirth;
    age;

    constructor() {
        this.root = document.documentElement;
        this.body = document.body;
        this.pageFlexDirection = getComputedStyle(this.body).getPropertyValue('--page-flex-direction');
        this.inputs = document.querySelectorAll("input");
        this.selects = document.querySelectorAll("select");
        this.pageHeader = document.getElementById("page-header");
        this.cardsContainer = document.getElementById(
            "cards-container"
        );
        this.cardContainers = document.querySelectorAll(
            ".card-container"
        );
        this.backgroundColor =
            getComputedStyle(this.root).getPropertyValue("--background-color");
        this.submitBtnCard1 = document.getElementById(
            "submit-btn-card1"
        );
        this.submitBtnCard2 = document.getElementById(
            "submit-btn-card2"
        );
        this.birthYearSelect = document.getElementById("birth-year");
        this.birthMonthSelect = document.getElementById("birth-month");
        this.birthDaySelect = document.getElementById("birth-day");
        this.birthDateSelectCard2 = document.getElementById("birth-date-card2");

        const date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.day = date.getDate();
    }

    /**
     * @author Hazem Sabry 
     * @gmail hazemsabry2002@gmail.com
     * Save the input value to session.
     */
    saveInputValueToSession() {
        this.inputs.forEach((input) => {
            input.addEventListener("blur", (e) => {
                sessionStorage.setItem(
                    `form input name=${e.target.name}`,
                    e.target.value
                );
            });
        });

        this.selects.forEach((select) => {
            select.addEventListener("blur", (e) => {
                sessionStorage.setItem(
                    `form select name=${e.target.name}`,
                    e.target.value
                );
            });
        });
    }

    /**
     * @author Hazem Sabry 
     * @gmail hazemsabry2002@gmail.com
     * Get the input value from session.
     */
    getInputValueFromSession() {
        this.inputs.forEach((input) => {
            input.value = sessionStorage.getItem(`form input name=${input.name}`);
        });

        this.selects.forEach((select) => {
            select.value = sessionStorage.getItem(`form select name=${select.name}`);
        });
    }

    /**
     * @author Hazem Sabry 
     * @gmail hazemsabry2002@gmail.com
     * Method to handle the resizing of the create account or login screen.
     * It adjusts the layout and styling of the page elements based on the screen size.
     */
    screenResize() {
        // If the screen width is greater than the maximum mobile screen width,
        // perform specific actions for desktop view
        if (screen.width > MAX_MOBILE_SCREEN_WIDTH) {
            this.cardsContainer.style.zIndex = "99999";
            this.cardContainers.forEach(
                (cardContainer) => {
                    cardContainer.style.zIndex = "99999";
                }
            );
        }
        // If the screen width is less than the maximum mobile screen width,
        // perform specific actions for mobile view
        else if (screen.width < MAX_MOBILE_SCREEN_WIDTH) {
            this.pageHeader.style.display = "block";

            this.cardContainers.forEach(
                (cardContainer) => {
                    const card = cardContainer.querySelector(".card");
                    card.style.boxShadow = "none";
                    cardContainer.style.backgroundColor =
                        this.backgroundColor;
                    cardContainer.style.alignItems = "flex-start";
                    cardContainer.style.paddingTop = "3rem";
                }
            );
        }
    }

    /**
     * @author Hazem Sabry 
     * @gmail hazemsabry2002@gmail.com
    * Method to handle the click event of the create account or login submit button.
    * It validates the input fields, scrolls to the next card if any field is invalid,
    * and prevents the form submission if any required field is empty or invalid.
    * It also checks if the password and sure password fields match.
    *
    * @returns {void}
    */
    btnCardSubmitForm() {
        this.submitBtnCard1.addEventListener("click", (e) => {
            e.preventDefault();
            if (!this.checkInputsIsValid(1)) return;
            this.calculateAgeMethod1();
            this.sendTheInformation(1);
        });

        this.submitBtnCard2.addEventListener("click", (e) => {
            e.preventDefault();
            if (!this.checkInputsIsValid(2)) return;
            this.calculateAgeMethod2();
            this.sendTheInformation(2);
        });
    }

    /**
     * @author Hazem Sabry
     * @gmail hazemsabry2002@gmail.com
     * Checks if the input fields are valid. If any field is invalid, scrolls to the next card and prevents the form submission.
     * @param {number} numberOfCard - The number of the card to be validated.
     * @returns {void}
     */
    checkInputsIsValid(numberOfCard) {
        const formInputs =
            this.cardContainers[numberOfCard - 1].querySelectorAll("[form-input]");
        for (let i = 0; i < formInputs.length; i++) {
            if (
                formInputs[i].value.trim() === "" ||
                (formInputs[i].getAttribute("type") === "gmail" &&
                    !formInputs[i].value.includes("@"))
            ) {
                formInputs[i].style.boxShadow = `0 2px 0 0  ${errorColor}`;
                return false;
            } else {
                formInputs[i].style.boxShadow = `0 1px 0 0  #000`;
                formInputs[i].addEventListener("focus", () => {
                    formInputs[i].style.boxShadow = `0 2px 0 0  ${btnColor}`;
                });
                formInputs[i].addEventListener("blur", () => {
                    formInputs[i].style.boxShadow = `0 1px 0 0  #000`;
                });
            }
        }
        return true;
    }

    /**
     * @author Hazem Sabry
     * @gmail hazemsabry2002@gmail.com
     * Generate date options for the birth year, month, and day select elements.
     * @returns {void}
     */
    generateDateOptions() {
        for (let i = this.year - 110; i <= this.year; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.innerText = i;
            this.birthYearSelect.appendChild(option);
        }

        let numberOfDaysAdded = 0;
        this.birthMonthSelect.addEventListener("change", () => {
            while (numberOfDaysAdded !== 0) {
                this.birthDaySelect.removeChild(this.birthDaySelect.lastChild);
                numberOfDaysAdded--;
            }

            const numberOfDaysOfChosenMonth = monthsInfo[this.birthMonthSelect.value].numberOfDays;
            for (let i = 29; i <= numberOfDaysOfChosenMonth; i++) {
                const option = document.createElement("option");
                option.value = i;
                option.innerText = i;
                this.birthDaySelect.appendChild(option);
                numberOfDaysAdded++;
            }
            console.log();
        });
    }

    getMonthBeforeNow(monthNumber) {
        for (const month in monthsInfo) {
            if (monthsInfo[month].monthNumber === monthNumber) {
                return monthsInfo[month];
            }
        }
    }

    calculateAgeMethod1() {
        const yearOfBirth = this.birthYearSelect.value;
        const monthOfBirth = this.birthMonthSelect.value;
        const dayOfBirth = this.birthDaySelect.value;

        const monthOfBirthNumber = monthsInfo[monthOfBirth].monthNumber;

        this.yearOfBirth = yearOfBirth;
        this.monthOfBirth = monthOfBirthNumber;
        this.dayOfBirth = dayOfBirth;

        this.calculateAge(yearOfBirth, monthOfBirthNumber, dayOfBirth);
    }

    calculateAgeMethod2() {
        const birthDate = new Date(this.birthDateSelectCard2.value);
        const yearOfBirth = birthDate.getFullYear();
        const monthOfBirth = birthDate.getMonth();
        const dayOfBirth = birthDate.getDate();

        this.yearOfBirth = yearOfBirth;
        this.monthOfBirth = monthOfBirth;
        this.dayOfBirth = dayOfBirth;

        this.calculateAge(yearOfBirth, monthOfBirth, dayOfBirth);
    }

    calculateAge(yearOfBirth, monthOfBirth, dayOfBirth) {
        const yearsOld = this.month > monthOfBirth ? (this.year - yearOfBirth) : (this.year - yearOfBirth - 1);
        const monthOld = this.day > dayOfBirth ? (this.month - monthOfBirth + 12) % 12 : (this.month - monthOfBirth + 12 - 1) % 12;

        let dayOld;
        if (this.day >= dayOfBirth) {
            dayOld = this.day - dayOfBirth;
        } else {
            const numberOfDaysForLastMonth = this.getMonthBeforeNow(this.month);
            dayOld = (this.day - dayOfBirth + numberOfDaysForLastMonth) % numberOfDaysForLastMonth;
        }

        this.age = `${yearsOld}-year, ${monthOld}-month, ${dayOld}-day`
    }

    sendTheInformation(cardNumber) {
        const cardContainer = this.cardContainers[cardNumber - 1];
        const fullName = cardContainer.querySelector("[name=\"full-name\"]").value;
        const gmail = cardContainer.querySelector("[name=\"gmail\"]").value;
        const phoneNumber = cardContainer.querySelector("[name=\"phone-number\"]").value;
        const gender = cardContainer.querySelector("[name=\"gender\"]").value;
        const country = cardContainer.querySelector("[name=\"country\"]").value;
        const city = cardContainer.querySelector("[name=\"city\"]").value;

        const birthData = `${this.yearOfBirth}-${this.monthOfBirth + 1}-${this.dayOfBirth}`;
        const location = `${city}, Egypt`;

        const info = {
            fullName,
            gmail,
            phoneNumber,
            birthData,
            age: this.age,
            gender, location
        }

        console.log(info);
    }

    setCard2DateSelectionLimit() {
        this.birthDateSelectCard2.max = new Date().toISOString().split("T")[0];
    }
}

const informationCard = new Card();

informationCard.screenResize();
informationCard.btnCardSubmitForm();
informationCard.saveInputValueToSession();
informationCard.getInputValueFromSession();
informationCard.generateDateOptions();
informationCard.setCard2DateSelectionLimit();
mobileGoBackBtnAction();