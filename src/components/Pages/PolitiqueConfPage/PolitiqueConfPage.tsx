import React from "react";

function PolitiqueDeConf() {
  return (
    <div className="flex flex-col bg-background">
      <div className="container flex w-screen flex-col gap-10 p-20">
        <h1 className="font-title text-4xl">Politique de Confidentialité</h1>
        <p>
          Ceci est un exemple de Politique de Confidentialité. Vous pouvez
          l&apos;adapter selon les besoins de votre site web.
        </p>

        <h2 className="text-xl font-bold">
          Collecte et utilisation des informations
        </h2>
        <p>
          Nous recueillons certaines informations personnelles lorsque vous
          utilisez ce site web. Ces informations peuvent inclure votre nom,
          votre adresse e-mail, votre adresse postale, etc. Nous utilisons ces
          informations pour [décrire la raison principale de la collecte des
          données, par exemple, fournir un service, améliorer le site, etc.].
        </p>

        <h2 className="text-xl font-bold">Cookies</h2>
        <p>
          Ce site web utilise des cookies pour améliorer l&apos;expérience de
          l&apos;utilisateur. En utilisant ce site, vous consentez à
          l&apos;utilisation de cookies conformément à notre politique en
          matière de cookies.
        </p>

        <h2 className="text-xl font-bold">Partage des informations</h2>
        <p>
          Nous ne vendons, n&apos;échangeons ni ne louons vos informations
          personnelles à des tiers. Nous pouvons partager vos informations avec
          des partenaires de confiance qui nous aident à exploiter notre site
          web ou à mener nos activités, tant que ces parties acceptent de garder
          ces informations confidentielles.
        </p>

        <h2 className="text-xl font-bold">Sécurité</h2>
        <p>
          Nous prenons des mesures de sécurité pour protéger vos informations
          personnelles contre tout accès non autorisé ou toute divulgation.
        </p>

        <h2 className="text-xl font-bold">
          Modifications de la politique de confidentialité
        </h2>
        <p>
          Nous nous réservons le droit de mettre à jour ou de modifier notre
          politique de confidentialité à tout moment. Nous vous encourageons à
          consulter cette page régulièrement pour prendre connaissance des
          éventuelles modifications.
        </p>

        <h2 className="text-xl font-bold">Contactez-nous</h2>
        <p>
          Si vous avez des questions concernant cette politique de
          confidentialité, vous pouvez nous contacter à l&apos;adresse suivante
          : [adresse e-mail de contact].
        </p>
      </div>
    </div>
  );
}

export default PolitiqueDeConf;
