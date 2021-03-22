
localStorage.removeItem('basket');
const addNumero = document.getElementById('numCom');
const params = new URLSearchParams(window.location.search);

//récupère le numéro de commande
const numCommande = params.get('ncomm');

addNumero.innerHTML = numCommande;
