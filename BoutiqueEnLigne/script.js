let panier = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('produits.json')
        .then(response => response.json())
        .then(data => {
            const produitsContainer = document.getElementById('produits');
            data.forEach(produit => {
                const produitDiv = document.createElement('div');
                produitDiv.classList.add('produit');
                produitDiv.innerHTML = `
                    <h3>${produit.nom}</h3>
                    <p>${produit.description}</p>
                    <img src="images/${produit.image}" alt="${produit.nom}">
                    <div class="details">
                        <p class="prix">${produit.prix} €</p>
                        <button class="ajouter-panier" onclick="ajouterAuPanier(${produit.id})">Ajouter au panier</button>
                    </div>
                `;
            
                //produitDiv.querySelector('img').addEventListener('click', () => afficherDetailsProduit(produitDiv));
                produitsContainer.appendChild(produitDiv);
                //total += item.prix * item.quantite;
            });
           // document.getElementById('total').textContent = total.toFixed(2);
            
        });

        function afficherDetailsProduit(imageElement) {
            const produitElement = imageElement.parentElement;
            const details = produitElement.querySelector('.details');
            details.style.display = details.style.display === 'block' ? 'none' : 'block';
        }

        function afficherNbArticles() {
            const nbArticles = panier.reduce((acc, item) => acc + item.quantite, 0);
            document.getElementById('nb-articles').textContent = nbArticles;
        }
});

function afficherDetailsProduit(produitElement) {
    const details = produitElement.querySelector('.details');
    details.style.display = details.style.display === 'block' ? 'none' : 'block';
}

function ajouterAuPanier(idProduit, event) {
    event.stopPropagation()
    fetch('produits.json')
        .then(response => response.json())
        .then(data => {
            const produit = data.find(p => p.id === idProduit);
            const itemPanier = panier.find(item => item.id === idProduit);

            if (itemPanier) {
                itemPanier.quantite += 1;
            } else {
                panier.push({ ...produit, quantite: 1 });
            }
            afficherPanier();
            afficherNbArticles();
            afficherTotal();
        })
    //J'ai voulu rajouter un "Error" pour tester si jamais ça plante..
        .catch(error => console.error('Erreur lors du chargement des produits:', error));
}

function afficherPanier() {
    const contenuPanier = document.getElementById('contenu-panier');
    contenuPanier.innerHTML = '';
    let total = 0;

    panier.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <h4>${item.nom}</h4>
            <p>Quantité: ${item.quantite}</p>
            <p>Prix: ${(item.prix * item.quantite).toFixed(2)} €</p>
        `;
        contenuPanier.appendChild(itemDiv);
        total += item.prix * item.quantite;
    });

    document.getElementById('total').textContent = total.toFixed(2);
}

function afficherNbArticles() {
    const nbArticles = panier.reduce((acc, item) => acc + item.quantite, 0);
    document.getElementById('nb-articles').textContent = nbArticles;
}

document.getElementById('formulaire-commentaire').addEventListener('submit', function(event) {
    event.preventDefault();

    const nom = document.getElementById('nom-utilisateur').value;
    const commentaire = document.getElementById('commentaire').value;

    if (nom && commentaire) {
        ajouterCommentaire(nom, commentaire);
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});

function ajouterCommentaire(nom, commentaire) {
    const listeCommentaires = document.getElementById('liste-commentaires');
    const commentaireDiv = document.createElement('div');
    commentaireDiv.innerHTML = `
        <h4>${nom}</h4>
        <p>${commentaire}</p>
    `;
    listeCommentaires.appendChild(commentaireDiv);
}

document.getElementById('formulaire-confirmation').addEventListener('submit', function(event) {
    event.preventDefault();

    const nom = document.getElementById('nom').value;
    const adresse = document.getElementById('adresse').value;

    if (nom && adresse) {
        alert('Commande confirmée !');
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});
