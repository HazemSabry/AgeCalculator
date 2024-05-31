const root = document.documentElement;
const html = document.documentElement;
const errorColor = getComputedStyle(root).getPropertyValue("--error-color");
const btnColor = getComputedStyle(root).getPropertyValue(
    "--next-btn-background-color"
);
const MAX_MOBILE_SCREEN_WIDTH = 950;
const language = html.getAttribute("lang");

function initialize() {
    const screenHightScale = screen.height / 1050;
    const screenWidthScale = screen.width / 1680;
    const screenScale =
        screenWidthScale > screenHightScale ? screenWidthScale : screenHightScale;
    root.style.setProperty("--screen-scale", screenScale);

    if (screen.width < MAX_MOBILE_SCREEN_WIDTH) {
        html.style.fontSize = "16px";
    }
}

/**
 * @author Hazem Sabry 
 * @gmail hazemsabry2002@gmail.com
 * mobileGoBackBtnAction - This function adds a click event listener to the mobileGoBackBtn element.
 * If the screen width is less than MAX_MOBILE_SCREEN_WIDTH, clicking the button will navigate back in the browser history.
 */
function mobileGoBackBtnAction() {
    if (screen.width < MAX_MOBILE_SCREEN_WIDTH) {
        const mobileGoBackBtn = document.getElementById("mobile-go-back-btn");
        mobileGoBackBtn.addEventListener("click", () => {
            window.history.back();
        });
    }
}



initialize();
