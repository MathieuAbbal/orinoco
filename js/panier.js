const addHtml = document.getElementById("content");//retourne un élément du DOM à partir de son identifiant content
const prixInHtml = document.getElementById("finalPrice");//retourne un élément du DOM à partir de son identifiant finalPrice
const basket = recuperationPanier();//constante qui à pour valeur la fonction de récueration de panier


if (basket.length > 0) {
    //on créer une boucle pour parcourir les éléments du tableau et générer le HTML 
    //on fait une interpolation de variable
    basket.forEach((objet) => {
        addHtml.innerHTML += `
            <div class="card">
                <div>
                    <img alt="${objet.name}" class="content__img" src="${objet.image}">
                </div>

                <div>
                    <a href="produit.html?id=${objet._id}"><h2 class="name">${objet.name}</h2></a>
                    <p class="text">Quantité : ${objet.quantite}</p>
                    <p class="text">Lentilles : ${objet.lens}</p>
                </div>

                <div class="price">
                    <p class="prixProduitPanier">Prix : <span>${objet.price*objet.quantite} €</span></p>   
                </div>

                <div>
                    <button class="btn-success" onclick="supprimeLocalStorage('${objet.lens}')">Supprimer</button>  
                </div>
            </div>
            `;
    });
} else {
    // HTML panier vide
    addHtml.innerHTML = `
        <div class="card empty">
            <img class="content__img" alt="photo de l'article" src="img/empty.png" />
            <p class="text__empty ">Votre panier est vide </p>
        </div>`;
}


//on génére le HTML dans le DOM
prixInHtml.innerHTML = calculPrixPanier() + " € ";




//Validation de formulaire
//on cible le bouton du formulaire et attache une fonction 


document.querySelector('#formulaire').addEventListener("click", function () {
    var valid = true;
    for (let input of document.querySelectorAll(".form input")) {

        valid &= input.reportValidity();
        if (!valid) {
            break;
        }
    }

});

/*************VALIDATION FORMULAIRE******************/

const lastname = document.getElementById('nom ');
const firstname = document.getElementById('prenom ');
const address = document.getElementById('adresse ');
const city = document.getElementById('ville ');
const mail = document.getElementById('email ');

const form = document.querySelector("#formulaire");



form.addEventListener("submit", (e) => {
    e.preventDefault()
    let data = recuperationPanier();
    if (basket == 0) {
       alert("Votre panier est vide")
    }
    else {
        // cameras en tant que tableau à envoyer en POST
        const products = [];

        data.forEach((camera) => {
            products.push(camera._id);
            console.table(products)
        });

        // utilisateur à envoyer en objet en POST
        let contact = {
            firstName: firstname.value,
            lastName: lastname.value,
            address: address.value,
            city: city.value,
            email: mail.value,
        };
        localStorage.setItem("contact", JSON.stringify(contact));
        // crée donnees comme objet contact + tableau products
        const donnees = { contact, products };

        // en-têtes pour la requête (dire qu'elle est POST et non GET)
        const options = {
            method: "POST",
            body: JSON.stringify(donnees),
            headers: {
                "Content-Type": "application/json",
            },
        };
        console.log(donnees)
        // la requête POST en elle-même
        fetch(" https://hebergementbackendorinoco.herokuapp.com/api/cameras/order", options)
            // reçoit les données du back
            .then(response => { // me renvoie un premiere prommesse
                if (response.ok) {
                    return response.json() // Si response ok, retourne un objet json
                } else {
                    Promise.reject(response.status); // sinon, me retroune la cause de l'echec
                };
            })

            // traitement pour l'obtention du numéro de commmande
            .then((dataPost) => {
                const orderId = dataPost.orderId;

                if (orderId == undefined) {
                    alert("Tous les champs doivent êtres remplis")
                } else {
                    window.location.href = `confirmation.html?ncomm=${orderId}`;
                }

            })

            .catch((error) => {
                alert(error);
            });
    }
});
