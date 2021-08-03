const addHtml = document.getElementById('content'); //récupère id=content

fetch(' https://hebergementbackendorinoco.herokuapp.com/api/cameras') //fetch de l'API
  .then(response => { // me renvoie une première prommesse
    if (response.ok) {
      return response.json() // Si response ok, retourne un objet json
    } else {
      Promise.reject(response.status); // sinon, me retroune la cause de l'echec
    };
  })
  .then(data => { // si response ok, renvoie d'une seconde promesse
    data.forEach(objet => { // boucle pour pour executer la fonction sur chaque éléments du tableau     
      let priceProd = objet.price / 100; //variable prix pour le diviser par 100
      //Insertion du HTML dans le DOM
      addHtml.innerHTML += `                
                  <div class="card">
                    <img alt="${objet.name}" class="content__img" src="${objet.imageUrl}">
                    <h2 class="name">${objet.name}</h2>
                    <h3 class="price">${priceProd} €</h3>
                    <a href="produit.html?id=${objet._id}" class="content__btn">Voir Plus</a>
                  </div>                
                `;
    });
    console.log(data)//affiche les données dans la console
  }).catch((error) => {
    console.log(error);
  });

  function onReady(callback) {
    var intervalId = window.setInterval(function() {
      if (document.getElementsByTagName('body')[0] !== undefined) {
        window.clearInterval(intervalId);
        callback.call(this);
      }
    }, 1000);
  }
  
  function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? 'block' : 'none';
  }
  
  onReady(function() {
    setVisible('.page', true);
    setVisible('#loading', false);
  });
