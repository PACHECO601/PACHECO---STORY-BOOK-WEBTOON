
const signupForm = document.querySelector("#signupForm");
const formMessage = document.querySelector("#formMessage");
const googleSignup = document.querySelector("#googleSignup");

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;
    const terms = document.querySelector("#terms").checked;

    formMessage.textContent = "";

    if (!email) {
        formMessage.textContent = "Please enter your email address.";
        return;
    }

    if (password.length < 8) {
        formMessage.textContent = "Password must be at least 8 characters.";
        return;
    }

    if (password !== confirmPassword) {
        formMessage.textContent = "Passwords do not match.";
        return;
    }

    if (!terms) {
        formMessage.textContent = "Please agree to the terms first.";
        return;
    }

    formMessage.style.color = "#c4b5fd";
    formMessage.textContent =
        "Form validated! Connect an authentication service to create your account.";
});

googleSignup.addEventListener("click", function () {
    formMessage.style.color = "#fca5a5";
    formMessage.textContent =
        "Google sign-up is not connected yet.";
});
