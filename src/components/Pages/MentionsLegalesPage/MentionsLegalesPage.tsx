import React from 'react';

function MentionsLegales() {
  return (
    <div className="flex flex-col bg-background">
      <div className="container flex w-screen flex-col gap-10 p-20">
        <h1 className="font-title text-4xl">Mentions Légales</h1>
        <div>
          <h2 className="text-xl font-bold">Informations générales</h2>
          <p>Raison sociale : PlaygroundExplorer</p>
          <p>Forme juridique : Mini-Entreprise</p>
          <p>Adresse : [Adresse de l&apos;entreprise]</p>
          <p>Téléphone : [Numéro de téléphone de l&apos;entreprise]</p>
          <p>Email : [Adresse email de l&apos;entreprise]</p>
        </div>

        <div>
          <h2 className="text-xl font-bold">Responsable de la publication</h2>
          <p>Nom : [Nom du responsable]</p>
          <p>Adresse : [Adresse du responsable]</p>
          <p>Téléphone : [Numéro de téléphone du responsable]</p>
          <p>Email : [Adresse email du responsable]</p>
        </div>

        <div>
          <h2 className="text-xl font-bold">Hébergeur</h2>
          <p>Nom : [Nom de l&apos;hébergeur]</p>
          <p>Adresse : [Adresse de l&apos;hébergeur]</p>
          <p>Téléphone : [Numéro de téléphone de l&apos;hébergeur]</p>
          <p>Email : [Adresse email de l&apos;hébergeur]</p>
        </div>

        <div>
          <h2 className="text-xl font-bold">Droit applicable</h2>
          <p>Ce site est soumis au droit français.</p>
        </div>
      </div>
    </div>
  );
}

export default MentionsLegales;
