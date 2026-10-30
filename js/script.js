const pageLoader = document.querySelector(".page-loader");

window.addEventListener("load", () => {
    setTimeout(() => {
        pageLoader.classList.add("hide");
    }, 600);
});


const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});


document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });
});


const planModal = document.getElementById("planModal");
const closePlan = document.getElementById("closePlan");
const selectedPlan = document.getElementById("selectedPlan");
const selectedPlanName = document.getElementById("selectedPlanName");
const selectedPlanPrice = document.getElementById("selectedPlanPrice");

const planPrices = {
    "Grátis": "R$ 0",
    "Plus": "R$ 14,90/mês",
    "Festa": "R$ 19,90/mês"
};

document.querySelectorAll(".plan-button").forEach(button => {

    button.addEventListener("click", () => {

        const plan = button.dataset.plan;

        selectedPlan.textContent = plan;
        selectedPlanName.textContent =
            plan === "Grátis"
                ? "Drunk Lock Grátis"
                : `Drunk Lock ${plan}`;

        selectedPlanPrice.textContent = planPrices[plan];

        planModal.classList.add("active");
        document.body.classList.add("modal-open");
    });

});


closePlan.addEventListener("click", () => {
    planModal.classList.remove("active");
    document.body.classList.remove("modal-open");
});


planModal.addEventListener("click", event => {

    if (event.target === planModal) {
        planModal.classList.remove("active");
        document.body.classList.remove("modal-open");
    }

});


document.getElementById("continuePlan").addEventListener("click", () => {

    planModal.classList.remove("active");
    document.body.classList.remove("modal-open");

    if (selectedPlan.textContent === "Grátis") {
        showToast("Plano gratuito selecionado!");
        return;
    }

    showToast("Redirecionando para o checkout...");
});


const downloadModal = document.getElementById("downloadModal");
const downloadButton = document.getElementById("downloadButton");
const heroDownload = document.getElementById("heroDownload");
const navDownload = document.getElementById("navDownload");
const closeDownload = document.getElementById("closeDownload");
const downloadProgress = document.getElementById("downloadProgress");
const downloadStatus = document.getElementById("downloadStatus");

function startDownload() {

    downloadModal.classList.add("active");
    document.body.classList.add("modal-open");

    downloadProgress.style.width = "0%";
    downloadStatus.textContent = "Iniciando...";

    let progress = 0;

    const interval = setInterval(() => {

        progress += Math.floor(Math.random() * 12) + 5;

        if (progress >= 100) {
            progress = 100;
        }

        downloadProgress.style.width = `${progress}%`;

        if (progress < 30) {
            downloadStatus.textContent = "Preparando arquivo...";
        } else if (progress < 60) {
            downloadStatus.textContent = "Baixando Drunk Lock...";
        } else if (progress < 90) {
            downloadStatus.textContent = "Verificando arquivo...";
        } else if (progress < 100) {
            downloadStatus.textContent = "Finalizando...";
        } else {
            downloadStatus.textContent = "Download concluído!";
            clearInterval(interval);

            setTimeout(() => {
                showToast("Download demonstrativo concluído!");
            }, 500);
        }

    }, 250);
}


downloadButton.addEventListener("click", startDownload);
heroDownload.addEventListener("click", startDownload);
navDownload.addEventListener("click", startDownload);


closeDownload.addEventListener("click", () => {
    downloadModal.classList.remove("active");
    document.body.classList.remove("modal-open");
});


downloadModal.addEventListener("click", event => {

    if (event.target === downloadModal) {
        downloadModal.classList.remove("active");
        document.body.classList.remove("modal-open");
    }

});


const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        faqItems.forEach(otherItem => {

            otherItem.classList.remove("active");

            const otherAnswer =
                otherItem.querySelector(".faq-answer");

            otherAnswer.style.maxHeight = null;

        });

        if (!isActive) {

            item.classList.add("active");

            answer.style.maxHeight =
                `${answer.scrollHeight}px`;

        }

    });

});


const billingOptions = document.querySelectorAll(".billing-option");
const monthlyPrice = document.querySelector(".price-monthly");
const yearlyPrice = document.querySelector(".price-yearly");

billingOptions.forEach(option => {

    option.addEventListener("click", () => {

        billingOptions.forEach(item => {
            item.classList.remove("active");
        });

        option.classList.add("active");

        const period = option.dataset.period;

        if (period === "yearly") {
            monthlyPrice.style.display = "none";
            yearlyPrice.style.display = "block";
        } else {
            monthlyPrice.style.display = "block";
            yearlyPrice.style.display = "none";
        }

    });

});


const partyButton = document.getElementById("partyButton");

partyButton.addEventListener("click", () => {

    document.getElementById("planModal").classList.add("active");

    document.body.classList.add("modal-open");

    selectedPlan.textContent = "Festa";
    selectedPlanName.textContent = "Drunk Lock Festa";
    selectedPlanPrice.textContent = "R$ 19,90/mês";

});


const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", event => {

        const targetId = anchor.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            const headerHeight = 75;

            const position =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });

        }

    });

});


function showToast(message) {

    const toast = document.getElementById("toast");
    const toastMessage = toast.querySelector("p");

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);

}


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        document.querySelectorAll(".modal-overlay.active").forEach(modal => {
            modal.classList.remove("active");
        });

        document.body.classList.remove("modal-open");
    }

});


document.querySelectorAll(".answer-buttons button").forEach(button => {

    button.addEventListener("click", () => {

        const answer = button.textContent;

        if (answer === "48") {

            button.style.borderColor = "#00e676";
            button.style.background = "rgba(0,230,118,0.1)";

            showToast("Resposta correta! ✓");

        } else {

            button.style.borderColor = "#ff5c5c";
            button.style.background = "rgba(255,92,92,0.08)";

            showToast("Resposta incorreta.");

            setTimeout(() => {
                button.style.borderColor = "";
                button.style.background = "";
            }, 700);

        }

    });

});