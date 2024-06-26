import React from 'react';
import BtnPrimary from '../../Buttons/PrimaryBtn';

function Contact() {
  return (
    <div>
      <div className="min-h-screen w-full bg-[#F8FCFB] px-2 py-2 pt-12 md:px-8 lg:px-20">
        <h1 className="pb-6 font-title text-4xl font-semibold text-text">
          Nous contacter
        </h1>
        <p className=" mb-6 text-left text-gray-600">
          Vous avez trouvé une nouvelle aire de jeux ou souhaitez signaler une
          erreur sur notre site ? N&apos;hésitez pas à nous contacter. Nous
          sommes également ouverts à vos suggestions pour améliorer notre
          annuaire et aider les familles à trouver les meilleurs espaces pour
          s&apos;amuser en ville.
        </p>
        <form className="flex max-w-lg flex-col">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-left font-bold text-gray-700"
            >
              Adresse e-mail<span className="text-red-500">*</span>{' '}
            </label>
            <input
              type="email"
              id="email"
              placeholder="exemple@exemple.fr"
              className="input-none mb-2 w-full rounded-md border-2 border-gray-300 py-0.5 pl-2 shadow focus:border-slate-500 focus:text-text focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="mb-2 block text-left font-bold text-gray-700"
            >
              Objet<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Toboggan du Square Elmik situé dans le 18e arrondissment de Paris "
              className="input-none mb-2 w-full rounded-md border-2 border-gray-300 py-0.5 pl-2 shadow focus:border-slate-500 focus:text-text focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="mb-2 block text-left font-bold text-gray-700"
            >
              Message<span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              placeholder="Bonjour, le toboggan n'a plus de rampe."
              className="input-none mb-2 h-56 w-full rounded-md border-2 border-gray-300 py-0.5 pl-2 shadow focus:border-slate-500 focus:text-text focus:outline-none"
              required
            />
          </div>
          <div className="mt-4 flex justify-center">
            <BtnPrimary
              color="primary"
              hoverColor="bg-secondary hover:bg-secondary-600"
              type="submit"
              text="Envoyer"
              onClick={() => {
                console.log('Message envoyé');
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
