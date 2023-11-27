let oignon = { nom: 'oignon', etat: 'entier', prix: 4 };
let oeuf = { nom: 'oeuf', etat: 'entier', prix: 10 };
let epice = { nom: 'épice', etat: 'moulu', prix: 3 };
let fromage = { nom: 'fromage', etat: 'coupé', prix: 5 };

let maison = {
    nom: 'maison',
    personnes: [],
};

let epicerie = {
    nom: 'épicerie',
    personnes: [],
    paniers: [
        { type: 'panier', contenu: [] }
    ],
    ingredients: [oignon, oeuf, epice, fromage],
};

let bol = {
    contenu: [],

    mettreIngredient(ingredient) {
        console.log(`${personnage.nom} met ${ingredient.nom} dans le bol.`);
        this.contenu.push(ingredient);
    },

    viderDansPoele(poele) {
        console.log(`${personnage.nom} vide le contenu du bol dans la poêle.`);
        poele.contenu.push(...this.contenu);
        this.contenu = [];
    },

    melanger(nomMelange) {
        let newMelange = {
            nom: nomMelange,
            etat: 'pas cuit'
        };

        console.log("Nouveau mélange créé :", newMelange);
        this.contenu = [newMelange];
        console.log("Contenu du bol après mélange :", this.contenu);
    },
};

let poele = {
    contenu: [],

    cuireOmelette() {
        console.log("L'omelette cuit dans la poêle.");
        for (let ingredient of this.contenu) {
            if (ingredient.etat === 'pas cuit') {
                console.log(`${ingredient.nom} est en train de cuire.`);
                ingredient.etat = 'cuit';
            }
        }
    },
};

let personnage = {
    nom: "Adil",
    lieu: "",
    argent: 100,
    mainDroite: [],
    mainGauche: [],

    seDeplacer(nouveauLieu) {
        this.lieu = nouveauLieu;
        console.log(`${this.nom} est actuellement à la ${this.lieu.nom}`);
    },

    prendrePanier() {
        if (epicerie.paniers.length > 0) {
            let panierPris = epicerie.paniers.pop();
            this.mainDroite.push(panierPris);
            console.log(`${this.nom} a pris un ${panierPris.type}`);
        } else {
            console.log("Aucun panier disponible dans l'épicerie.");
        }
    },

    faireCourses() {
        if (this.mainDroite.length > 0) {
            for (let ingredient of epicerie.ingredients) {
                let copieIngredient =ingredient
                this.mainDroite[0].contenu.push(copieIngredient);
                console.log(`${this.nom} a pris ${copieIngredient.nom}`);
                this.payerArticle(copieIngredient);
            }
        } else {
            console.log("Aucun panier dans la main droite.");
        }
    },

    payerArticle(article) {
        if (this.argent >= article.prix) {
            this.argent -= article.prix;
            console.log(`${this.nom} a payé ${article.prix}€ pour ${article.nom}. Argent restant : ${this.argent}€`);
        } else {
            console.log(`${this.nom} n'a pas assez d'argent pour acheter ${article.nom}.`);
        }
    },

    couper(ingredient) {
        if (ingredient.etat === 'entier') {
            console.log(`${this.nom} coupe ${ingredient.nom}.`);
            ingredient.etat = 'coupé';
        } else {
            console.log(`${ingredient.nom} est déjà coupé.`);
        }
    },
};

personnage.seDeplacer(maison);
personnage.seDeplacer(epicerie);
personnage.prendrePanier();
personnage.faireCourses();

personnage.seDeplacer(maison);
for (let ingredient of epicerie.paniers) {
    bol.mettreIngredient(ingredient);
}

personnage.seDeplacer(epicerie);
epicerie.paniers.push(personnage.mainDroite.pop());
console.log(`${personnage.nom} a rapporté le panier à l'épicerie.`);

personnage.seDeplacer(maison);

for (let ingredient of bol.contenu) {
    personnage.couper(ingredient);
}

bol.melanger('omelette');
bol.viderDansPoele(poele);
poele.cuireOmelette();

console.log("Notre omelette est cuite !");
