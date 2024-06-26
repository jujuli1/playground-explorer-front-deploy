import React from 'react';

function SiteMap() {
  return (
    <div className="flex flex-col bg-background">
      <div className="container flex w-screen flex-col gap-10 p-20">
        <h1 className="font-title text-4xl">Plan du site</h1>
        <ol>
          <li>
            <h2 className="text-xl font-bold">Accueil</h2>
            <ul>
              <li>Présentation du site</li>
              <li>Lien vers les pages principales</li>
              <li>Formulaire de recherche d&apos;une aire</li>
              <li>Liste des aires de jeux correspondantes à la recherche</li>
              <li>Maps des aires de jeux</li>
              <li>Ajout d&apos;une aire de jeux</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-bold">Aire de jeux</h2>
            <ul>
              <li>Présentation de l&apos;aire de jeux</li>
              <li>Ajout de l&apos;aire aux favoris</li>
              <li>
                Ouverture de l&apos;itinéraire pour se rendre à l&apos;aire
              </li>
              <li>Commentaires des utilisateurs</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-bold">Connexion</h2>
            <ul>
              <li>Connexion à l&apos;espace personnel</li>
              <li>Création d&apos;un compte</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-bold">Espace personnel</h2>
            <ul>
              <li>Informations personnelles</li>
              <li>Aires de jeux favorites</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-bold">Contact</h2>
            <ul>
              <li>Informations de contact</li>
              <li>Formulaire de contact</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-bold">Mentions légales</h2>
            <ul>
              <li>Informations légales</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-bold">
              Conditions générales d&apos;utilisation
            </h2>
            <ul>
              <li>Conditions d&apos;utilisation du site</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-bold">Politique de confidentialité</h2>
            <ul>
              <li>Politique de confidentialité du site</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-bold">Plan du site</h2>
            <ul>
              <li>Page actuelle</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default SiteMap;
