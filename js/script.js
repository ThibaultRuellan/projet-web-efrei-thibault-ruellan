document.addEventListener("DOMContentLoaded", function () {

    const boutonMenu = document.getElementById("menu-bouton");
    const menu = document.getElementById("menu");

    if (boutonMenu && menu) {
        boutonMenu.addEventListener("click", function () {
            menu.classList.toggle("ouvert");

            if (menu.classList.contains("ouvert")) {
                boutonMenu.textContent = "✕";
                boutonMenu.setAttribute("aria-label", "Fermer le menu");
            } else {
                boutonMenu.textContent = "☰";
                boutonMenu.setAttribute("aria-label", "Ouvrir le menu");
            }
        });

        const liensMenu = menu.querySelectorAll("a");

        liensMenu.forEach(function (lien) {
            lien.addEventListener("click", function () {
                menu.classList.remove("ouvert");
                boutonMenu.textContent = "☰";
                boutonMenu.setAttribute("aria-label", "Ouvrir le menu");
            });
        });
    }

    const pageActuelle = window.location.pathname.split("/").pop();
    const liensNavigation = document.querySelectorAll(".menu a");

    liensNavigation.forEach(function (lien) {
        lien.classList.remove("actif");

        const pageLien = lien.getAttribute("href");

        if (pageLien === pageActuelle || (pageActuelle === "" && pageLien === "index.html")) {
            lien.classList.add("actif");
        }
    });

    const header = document.querySelector(".header");

    if (header) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 20) {
                header.classList.add("header-scroll");
            } else {
                header.classList.remove("header-scroll");
            }
        });
    }

    const boutonsFiltre = document.querySelectorAll(".filtre");
    const projets = document.querySelectorAll(".projet");

    boutonsFiltre.forEach(function (bouton) {
        bouton.addEventListener("click", function () {
            const categorie = bouton.getAttribute("data-filtre");

            boutonsFiltre.forEach(function (btn) {
                btn.classList.remove("actif-filtre");
            });

            bouton.classList.add("actif-filtre");

            projets.forEach(function (projet) {
                const categorieProjet = projet.getAttribute("data-categorie");

                if (categorie === "tous" || categorie === categorieProjet) {
                    projet.classList.remove("masque");
                } else {
                    projet.classList.add("masque");
                }
            });
        });
    });

    const questions = document.querySelectorAll(".question");

    questions.forEach(function (question) {
        const bouton = question.querySelector(".question-bouton");

        if (bouton) {
            bouton.addEventListener("click", function () {
                question.classList.toggle("ouverte");
            });
        }
    });

    const formulaire = document.getElementById("formulaire-contact");

    if (formulaire) {
        formulaire.addEventListener("submit", function (event) {
            event.preventDefault();

            const nom = document.getElementById("nom");
            const email = document.getElementById("email");
            const sujet = document.getElementById("sujet");
            const message = document.getElementById("message");
            const confirmation = document.getElementById("confirmation");

            let formulaireValide = true;

            nettoyerErreurs();

            if (nom.value.trim() === "") {
                afficherErreur("nom", "Veuillez saisir votre nom.");
                formulaireValide = false;
            }

            if (email.value.trim() === "") {
                afficherErreur("email", "Veuillez saisir votre adresse email.");
                formulaireValide = false;
            } else if (!emailValide(email.value.trim())) {
                afficherErreur("email", "Veuillez saisir une adresse email valide.");
                formulaireValide = false;
            }

            if (sujet.value === "") {
                afficherErreur("sujet", "Veuillez choisir un sujet.");
                formulaireValide = false;
            }

            if (message.value.trim() === "") {
                afficherErreur("message", "Veuillez écrire un message.");
                formulaireValide = false;
            } else if (message.value.trim().length < 10) {
                afficherErreur("message", "Le message doit contenir au moins 10 caractères.");
                formulaireValide = false;
            }

            if (formulaireValide) {
                confirmation.textContent = "Votre message a bien été vérifié. Le formulaire est prêt à être envoyé.";
                formulaire.reset();
            }
        });
    }

    function afficherErreur(champId, texteErreur) {
        const champ = document.getElementById(champId);
        const erreur = document.getElementById("erreur-" + champId);

        if (champ && erreur) {
            champ.parentElement.classList.add("erreur");
            erreur.textContent = texteErreur;
        }
    }

    function nettoyerErreurs() {
        const messagesErreur = document.querySelectorAll(".message-erreur");
        const champs = document.querySelectorAll(".champ");
        const confirmation = document.getElementById("confirmation");

        messagesErreur.forEach(function (message) {
            message.textContent = "";
        });

        champs.forEach(function (champ) {
            champ.classList.remove("erreur");
        });

        if (confirmation) {
            confirmation.textContent = "";
        }
    }

    function emailValide(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});