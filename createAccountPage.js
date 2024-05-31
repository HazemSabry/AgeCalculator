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
                return true;
            }
        }
    }

    /**
     * @author Hazem Sabry
     * @gmail hazemsabry2002@gmail.com
     * Generate date options for the birth year, month, and day select elements.
     * @returns {void}
     */
    generateDateOptions() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        for (let i = year - 110; i <= year; i++) {
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
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const yearOfBirth = this.birthYearSelect.value;
        const monthOfBirth = this.birthMonthSelect.value;
        const dayOfBirth = this.birthDaySelect.value;

        const monthOfBirthNumber = monthsInfo[monthOfBirth].monthNumber;

        const yearsOld = month > monthOfBirthNumber ? (year - yearOfBirth) : (year - yearOfBirth - 1);
        const monthOld = day > dayOfBirth ? (month - monthOfBirthNumber + 12) % 12 : (month - monthOfBirthNumber + 12 - 1) % 12;

        let dayOld;
        if (day >= dayOfBirth) {
            dayOld = day - dayOfBirth;
        } else {
            const numberOfDaysForLastMonth = this.getMonthBeforeNow(month);
            dayOld = (day - dayOfBirth + numberOfDaysForLastMonth) % numberOfDaysForLastMonth;
        }

        this.age = `${yearsOld}-year, ${monthOld}-month, ${dayOld}-day`

    }

    sendTheInformation(cardNumber) {
        const cardContainer = this.cardContainers[cardNumber - 1];
        const fullName = cardContainer.querySelector("[name=\"full-name\"]").value;
        const gmail = cardContainer.querySelector("[name=\"gmail\"]").value;
        const phoneNumber = cardContainer.querySelector("[name=\"phone-number\"]").value;
        const birthYear = cardContainer.querySelector("[name=\"birth-year\"]").value;
        const birthMonth = cardContainer.querySelector("[name=\"birth-month\"]").value;
        const birthDay = cardContainer.querySelector("[name=\"birth-day\"]").value;
        const gender = cardContainer.querySelector("[name=\"gender\"]").value;
        const country = cardContainer.querySelector("[name=\"country\"]").value;
        const city = cardContainer.querySelector("[name=\"city\"]").value;

        const birthData = `${birthMonth} ${birthDay}, ${birthYear}`;
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
}

const informationCard = new Card();

informationCard.screenResize();
informationCard.btnCardSubmitForm();
informationCard.saveInputValueToSession();
informationCard.getInputValueFromSession();
informationCard.generateDateOptions();
mobileGoBackBtnAction();