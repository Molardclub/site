document.addEventListener('DOMContentLoaded', function() {
    console.log("Le document est prêt.");
});


let visitCount = localStorage.getItem("visitCount");

if (visitCount === null) {
    visitCount = 1; // Première visite
} else {
    visitCount = parseInt(visitCount) + 1; // Augmenter le compteur
}

// Mettre à jour le stockage local
localStorage.setItem("visitCount", visitCount);

// Afficher le nombre de visites
document.getElementById("visitCount").textContent = visitCount;