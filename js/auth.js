const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const forgotPassword = document.getElementById("forgotPassword");

if (loginForm) {
    loginForm.addEventListener("submit", event => {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value;

        if (!email) {
            showToast("Preencha seu e-mail.");
            return;
        }

        showToast("Login realizado com sucesso!");

        setTimeout(() => {
            window.location.href = "perfil.html";
        }, 900);
    });
}

if (registerForm) {
    registerForm.addEventListener("submit", event => {
        event.preventDefault();

        const name = document.getElementById("registerName").value;

        if (!name) {
            showToast("Preencha seu nome.");
            return;
        }

        showToast(`Conta criada! Bem-vindo, ${name}.`);
    });
}

if (forgotPassword) {
    forgotPassword.addEventListener("click", event => {
        event.preventDefault();
        showToast("A recuperação de senha estará disponível na versão final.");
    });
}

function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMessage = toast.querySelector("p");

    toastMessage.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}

window.addEventListener("load", () => {
    const header = document.querySelector(".header");

    if (header) {
        setTimeout(() => {
            header.classList.add("scrolled");
        }, 0);
    }
});
