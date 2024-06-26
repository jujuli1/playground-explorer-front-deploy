import React, { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import logError from './Logger';

interface PlaygroundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PlaygroundData {
  name: string;
  lattitude: number;
  longitude: number;
  adress: string;
  zip_code: string;
  city: string;
  closure: boolean;
  zoning: boolean;
  is_visible: boolean;
  features: number[]; // Fix: Specify the type of the array elements
  timetables: {
    weekdayHours: string;
    weekendHours: string;
    weekdayEnd: string; // Ajouter la propriété weekdayEnd
    weekendEnd: string; // Ajouter la propriété weekendEnd
  }[];
}

interface AgeType {
  id: number;
  name: string;
  checked: boolean;
}

interface AccessibilityType {
  id: number;
  name: string;
  checked: boolean;
}

interface FacilityType {
  id: number;
  name: string;
  checked: boolean;
}

interface GroundType {
  id: number;
  name: string;
  checked: boolean;
}
interface EquipmentType {
  id: number;
  name: string;
  checked: boolean;
}
interface StateType {
  id: number;
  name: string;
  checked: boolean;
}

interface Category {
  id: number;
  feature_id: number | null;
  categorie: string;
  createdat: string;
  updatedat: string;
  deletedat: string | null;
  features: Feature[];
}

interface Feature {
  id: number;
  feature: string;
  createdat: string;
  updatedat: string;
  deletedat: string | null;
  categorie_id: number;
}

const PlaygroundModal: React.FC<PlaygroundModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<number>(1);
  const [playgroundData, setPlaygroundData] = useState<PlaygroundData>({
    name: '',
    lattitude: 1.234,
    longitude: 1.234,
    adress: '',
    zip_code: '',
    city: '',
    closure: false,
    zoning: false,
    is_visible: false,
    features: [],
    timetables: [
      { weekdayHours: '', weekendHours: '', weekdayEnd: '', weekendEnd: '' }, // Initialisation des horaires vides
      { weekdayHours: '', weekendHours: '', weekdayEnd: '', weekendEnd: '' },
    ],
  });
  const [weekdayEnd, setWeekdayEnd] = useState<string>('');
  const [weekendEnd, setWeekendEnd] = useState<string>('');
  const [weekdaysHours, setWeekdaysHours] = useState<string>('');
  const [weekendHours, setWeekendHours] = useState<string>('');
  const [groundTypes, setGroundTypes] = useState<GroundType[]>([]);
  const [ageTypes, setAgeTypes] = useState<AgeType[]>([]);
  const [AccessibilityType, setAccessibilityType] = useState<
    AccessibilityType[]
  >([]);
  const [facilityTypes, setFacilityTypes] = useState<FacilityType[]>([]);
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [stateTypes, setStateTypes] = useState<StateType[]>([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [selectedGroundTypeIds, setSelectedGroundTypeIds] = useState<number[]>(
    []
  );
  const [selectedAgeTypeIds, setSelectedAgeTypeIds] = useState<number[]>([]);
  const [selectedAccessibilityTypeIds, setSelectedAccessibilityTypeIds] =
    useState<number[]>([]);
  const [selectedFacilityTypeIds, setSelectedFacilityTypeIds] = useState<
    number[]
  >([]);
  const [selectedEquipmentTypeIds, setSelectedEquipmentTypeIds] = useState<
    number[]
  >([]);
  const [selectedStateTypeIds, setSelectedStateTypeIds] = useState<number[]>(
    []
  );
  // Ajoutez des états similaires pour d'autres catégories si nécessaire

  useEffect(() => {
    const fetchGroundTypes = async () => {
      try {
        const response = await axios.get<Category[]>(
          'https://playground-explorer-back-api-2c0b9098656f.herokuapp.com/api/getCategories'
        );

        // Extraction des données pour la catégorie "sol"
        const groundCategory = response.data.find(
          (category) => category.categorie === 'sol'
        );
        if (groundCategory && groundCategory.features) {
          const groundTypesWithData: GroundType[] = groundCategory.features.map(
            (feature) => ({
              id: feature.id,
              name: feature.feature,
              checked: false,
            })
          );
          setGroundTypes(groundTypesWithData);
        }

        // Extraction des données pour la catégorie "age"
        const ageCategory = response.data.find(
          (category) => category.categorie === 'age'
        );
        if (ageCategory && ageCategory.features) {
          const ageTypesWithData: AgeType[] = ageCategory.features.map(
            (feature) => ({
              id: feature.id,
              name: feature.feature,
              checked: false,
            })
          );
          setAgeTypes(ageTypesWithData);
        }

        const accessibility = response.data.find(
          (category) => category.categorie === 'accessibilite'
        );
        if (accessibility && accessibility.features) {
          const AccessibilityTypesWithData: AccessibilityType[] =
            accessibility.features.map((feature) => ({
              id: feature.id,
              name: feature.feature,
              checked: false,
            }));
          setAccessibilityType(AccessibilityTypesWithData);
        }

        const facilityCategory = response.data.find(
          (category) => category.categorie === 'facilite'
        );
        if (facilityCategory && facilityCategory.features) {
          const facilityTypesWithData: FacilityType[] =
            facilityCategory.features.map((feature) => ({
              id: feature.id,
              name: feature.feature,
              checked: false,
            }));
          setFacilityTypes(facilityTypesWithData);
        }

        const equipmentCategory = response.data.find(
          (category) => category.categorie === 'equipement'
        );
        if (equipmentCategory && equipmentCategory.features) {
          const equipmentTypesWithData: GroundType[] =
            equipmentCategory.features.map((feature) => ({
              id: feature.id,
              name: feature.feature,
              checked: false,
            }));
          setEquipmentTypes(equipmentTypesWithData);
        }

        const stateCategory = response.data.find(
          (category) => category.categorie === 'etat'
        );
        if (stateCategory && stateCategory.features) {
          const stateTypesWithData: GroundType[] = stateCategory.features.map(
            (feature) => ({
              id: feature.id,
              name: feature.feature,
              checked: false,
            })
          );
          setStateTypes(stateTypesWithData);
        }

        // Répétez le processus pour d'autres catégories si nécessaire
      } catch (error) {
        console.error('Error fetching ground and age types:', error);
        // Gestion des erreurs
        logError(error);
      }
    };

    fetchGroundTypes();
  }, []);

  const handleGroundTypeCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    typeName: string
  ) => {
    const { checked } = e.target;
    setGroundTypes((prevTypes) =>
      prevTypes.map((type) =>
        type.name === typeName ? { ...type, checked } : type
      )
    );

    // Trouver l'objet type correspondant au nom
    const selectedType = groundTypes.find((type) => type.name === typeName);
    if (selectedType) {
      const typeId = selectedType.id;
      setSelectedGroundTypeIds((prevIds) =>
        checked ? [...prevIds, typeId] : prevIds.filter((id) => id !== typeId)
      );
    }
  };

  const handleAgeTypeCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    typeName: string
  ) => {
    const { checked } = e.target;
    setAgeTypes((prevTypes) =>
      prevTypes.map((type) =>
        type.name === typeName ? { ...type, checked } : type
      )
    );

    // Trouver l'objet type correspondant au nom
    const selectedType = ageTypes.find((type) => type.name === typeName);
    if (selectedType) {
      const typeId = selectedType.id;
      setSelectedAgeTypeIds((prevIds) =>
        checked ? [...prevIds, typeId] : prevIds.filter((id) => id !== typeId)
      );
    }
  };

  const handleAccessibilityTypeCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    typeName: string
  ) => {
    const { checked } = e.target;
    setAccessibilityType((prevTypes) =>
      prevTypes.map((type) =>
        type.name === typeName ? { ...type, checked } : type
      )
    );

    // Trouver l'objet type correspondant au nom
    const selectedType = AccessibilityType.find(
      (type) => type.name === typeName
    );
    if (selectedType) {
      const typeId = selectedType.id;
      setSelectedAccessibilityTypeIds((prevIds) =>
        checked ? [...prevIds, typeId] : prevIds.filter((id) => id !== typeId)
      );
    }
  };

  const handleFacilityTypeCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    typeName: string
  ) => {
    const { checked } = e.target;
    setFacilityTypes((prevTypes) =>
      prevTypes.map((type) =>
        type.name === typeName ? { ...type, checked } : type
      )
    );

    // Trouver l'objet type correspondant au nom
    const selectedType = facilityTypes.find((type) => type.name === typeName);
    if (selectedType) {
      const typeId = selectedType.id;
      setSelectedFacilityTypeIds((prevIds) =>
        checked ? [...prevIds, typeId] : prevIds.filter((id) => id !== typeId)
      );
    }
  };

  const handleEquipmentTypeCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    typeName: string
  ) => {
    const { checked } = e.target;
    setEquipmentTypes((prevTypes) =>
      prevTypes.map((type) =>
        type.name === typeName ? { ...type, checked } : type
      )
    );

    // Trouver l'objet type correspondant au nom
    const selectedType = equipmentTypes.find((type) => type.name === typeName);
    if (selectedType) {
      const typeId = selectedType.id;
      setSelectedEquipmentTypeIds((prevIds) =>
        checked ? [...prevIds, typeId] : prevIds.filter((id) => id !== typeId)
      );
    }
  };

  const handleStateTypeCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    typeName: string
  ) => {
    const { checked } = e.target;
    setStateTypes((prevTypes) =>
      prevTypes.map((type) =>
        type.name === typeName ? { ...type, checked } : type
      )
    );

    // Trouver l'objet type correspondant au nom
    const selectedType = stateTypes.find((type) => type.name === typeName);
    if (selectedType) {
      const typeId = selectedType.id;
      setSelectedStateTypeIds((prevIds) =>
        checked ? [...prevIds, typeId] : prevIds.filter((id) => id !== typeId)
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let token = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      // Vérifier si le token est présent
      if (!token && refreshToken) {
        // Utiliser le refreshToken pour obtenir un nouveau accessToken
        const refreshResponse = await axios.post(
          'https://playground-explorer-back-api-2c0b9098656f.herokuapp.com/refresh',
          { refreshToken },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );

        // Mettre à jour les tokens dans le localStorage
        localStorage.setItem('accessToken', refreshResponse.data.accessToken);
        token = refreshResponse.data.accessToken;
      } else if (!token && !refreshToken) {
        throw new Error('Token and Refresh token are missing.');
      }

      // Liste des ID des fonctionnalités sélectionnées pour chaque catégorie
      const selectedGroundTypes = selectedGroundTypeIds;
      const selectedAgeTypes = selectedAgeTypeIds;
      const selectedAccessibilityType = selectedAccessibilityTypeIds;
      const selectedFacilityType = selectedFacilityTypeIds;
      const selectedEquipmentType = selectedEquipmentTypeIds;
      const selectedStateType = selectedStateTypeIds;
      // Ajoutez le processus pour les autres catégories de fonctionnalités
      // Préparation des horaires conformément à la structure attendue par l'API
      const timetables = [
        {
          dayWeek: 'Weekday',
          openingTime: weekdaysHours.split(' - ')[0],
          closingTime: weekdayEnd, // Utilisez l'horaire de fin en semaine
        },
        {
          dayWeek: 'Weekend',
          openingTime: weekendHours.split(' - ')[0],
          closingTime: weekendEnd, // Utilisez l'horaire de fin le week-end
        },
      ];

      // Envoi des données du formulaire à l'API
      const res = await axios.post(
        'https://playground-explorer-back-api-2c0b9098656f.herokuapp.com/api/playgrounds',
        {
          name: playgroundData.name,
          lattitude: playgroundData.lattitude,
          longitude: playgroundData.longitude,
          adress: playgroundData.adress,
          zip_code: playgroundData.zip_code,
          city: playgroundData.city,
          closure: playgroundData.closure,
          zoning: playgroundData.zoning,
          is_visible: playgroundData.is_visible,
          features: [
            ...selectedGroundTypes,
            ...selectedAgeTypes,
            ...selectedAccessibilityType,
            ...selectedFacilityType,
            ...selectedEquipmentType,
            ...selectedStateType,
          ],
          timetables, // Ajout des horaires
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Vérifier si l'envoi du formulaire a réussi
      if (res.status === 201) {
        console.log('Form submitted successfully:', res.data);
        setIsFormSubmitted(true);
        setFormSuccess(true);
      } else {
        throw new Error('Failed to submit form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Gérer les erreurs ici
      setIsFormSubmitted(true);
      setFormSuccess(false);
    }
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    // Gérer les champs de texte
    if (type === 'text' || type === 'time') {
      setPlaygroundData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      // Mettre à jour les horaires en semaine et le week-end en fonction du champ modifié
      const updatedTimetables = [...playgroundData.timetables];
      if (name === 'weekdayStart' || name === 'weekdayEnd') {
        updatedTimetables[0][
          name === 'weekdayStart' ? 'weekdayHours' : 'weekdayEnd'
        ] = value;
      } else if (name === 'weekendStart' || name === 'weekendEnd') {
        updatedTimetables[1][
          name === 'weekendStart' ? 'weekendHours' : 'weekendEnd'
        ] = value;
      }

      setPlaygroundData((prevData) => ({
        ...prevData,
        timetables: updatedTimetables,
      }));

      // Mettre à jour les états correspondants
      if (name === 'weekdayStart') {
        setWeekdaysHours(value);
      } else if (name === 'weekdayEnd') {
        setWeekdayEnd(value);
      } else if (name === 'weekendStart') {
        setWeekendHours(value);
      } else if (name === 'weekendEnd') {
        setWeekendEnd(value);
      }
    }

    // Gérer les cases à cocher
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement; // Ajout de la vérification de type
      setPlaygroundData((prevData) => ({
        ...prevData,
        [name]: checkbox.checked,
      }));
    }
  };

  let titleText = '';
  if (step === 1) {
    titleText = "Ajout d'une aire de jeu";
  } else if (step === 2) {
    titleText = 'Informations complémentaires';
  } else {
    titleText = "Équipements de l'aire de jeu";
  }

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleCloseModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <form onSubmit={handleSubmit}>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {titleText}
                </Dialog.Title>

                <div className="my-4 flex items-center justify-center space-x-4">
                  {[1, 2, 3].map((num) => (
                    <div
                      key={num}
                      className={`h-2 w-12 rounded-full ${
                        step === num ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <div className="mt-2">
                  {step === 1 && (
                    <div>
                      <label
                        htmlFor="playgroundName"
                        className="block text-sm font-bold text-gray-700"
                      >
                        Nom de l&apos;aire
                      </label>
                      <input
                        type="text"
                        id="playgroundName"
                        name="name"
                        value={playgroundData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Entrez le nom de l'aire ou le nom de la rue la plus proche"
                      />
                      <div>
                        <label
                          htmlFor="weekdayHours"
                          className="block text-sm font-bold text-gray-700"
                        >
                          Horaires en semaine :
                        </label>
                        <input
                          type="time"
                          id="weekdayStart"
                          name="weekdayStart"
                          value={
                            playgroundData.timetables[0].weekdayHours.split(
                              ' - '
                            )[0]
                          }
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <input
                          type="time"
                          id="weekdayEnd"
                          name="weekdayEnd"
                          value={
                            playgroundData.timetables[0].weekdayHours.split(
                              ' - '
                            )[1]
                          }
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="weekendHours"
                          className="block text-sm font-bold text-gray-700"
                        >
                          Horaires le week-end :
                        </label>
                        <input
                          type="time"
                          id="weekendStart"
                          name="weekendStart"
                          value={
                            playgroundData.timetables[1].weekendHours.split(
                              ' - '
                            )[0]
                          }
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <input
                          type="time"
                          id="weekendEnd"
                          name="weekendEnd"
                          value={
                            playgroundData.timetables[1].weekendHours.split(
                              ' - '
                            )[1]
                          }
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="mt-4 inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
                      >
                        Suivant
                      </button>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-bold text-gray-700"
                      >
                        Adresse
                      </label>
                      <input
                        type="text"
                        id="adress"
                        name="adress"
                        value={playgroundData.adress}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />

                      <label
                        htmlFor="zip_code"
                        className="mt-4 block text-sm font-bold text-gray-700"
                      >
                        Code postal
                      </label>
                      <input
                        type="text"
                        id="zip_code"
                        name="zip_code"
                        value={playgroundData.zip_code}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />

                      <label
                        htmlFor="city"
                        className="mt-4 block text-sm font-bold text-gray-700"
                      >
                        Ville
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={playgroundData.city}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />

                      <div className="mt-4 space-y-2">
                        <label
                          htmlFor="isClosed"
                          className="block text-sm font-bold text-gray-700"
                        >
                          L&apos;aire est-elle clôturée ?
                        </label>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="closedYes"
                            name="closure"
                            checked={playgroundData.closure}
                            onChange={(e) =>
                              setPlaygroundData({
                                ...playgroundData,
                                closure: e.target.checked,
                              })
                            }
                            className="rounded text-green-600 focus:ring-green-500"
                          />
                          <label
                            htmlFor="closedYes"
                            className="ml-2 block text-sm text-gray-900"
                          >
                            Oui
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="closedNo"
                            name="closure"
                            checked={!playgroundData.closure}
                            onChange={(e) =>
                              setPlaygroundData({
                                ...playgroundData,
                                closure: !e.target.checked,
                              })
                            }
                            className="rounded text-red-600 focus:ring-red-500"
                          />
                          <label
                            htmlFor="closedNo"
                            className="ml-2 block text-sm text-gray-900"
                          >
                            Non
                          </label>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="mt-6 inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
                      >
                        Précédent
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="mt-6 inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
                      >
                        Suivant
                      </button>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      {isFormSubmitted && formSuccess && (
                        <p className="mt-4 text-green-600">
                          Le formulaire a été soumis avec succès !
                        </p>
                      )}
                      {/* Section des types d'âge */}
                      <p className="mt-8 text-lg font-medium text-gray-900">
                        Quel type d&apos;âge ?
                      </p>
                      <div className="mt-2 grid grid-cols-3 gap-4">
                        {ageTypes.map((type) => (
                          <label key={type.id} className="flex items-center">
                            <input
                              type="checkbox"
                              onChange={(e) => handleAgeTypeCheck(e, type.name)}
                              checked={type.checked}
                              className="mr-2"
                            />
                            <span>{type.name}</span>
                          </label>
                        ))}
                      </div>

                      {/* Section des accessibilite */}
                      <p className="mt-4 text-lg font-medium text-gray-900">
                        Quels sont les types d&apos;accessibilité ?
                      </p>
                      <div className="mt-2 grid grid-cols-3 gap-4">
                        {AccessibilityType.map((type) => (
                          <label key={type.id} className="flex items-center">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleAccessibilityTypeCheck(e, type.name)
                              }
                              checked={type.checked}
                              className="mr-2"
                            />
                            <span>{type.name}</span>
                          </label>
                        ))}
                      </div>
                      {/* Section des types de facilité */}
                      <p className="mt-4 text-lg font-medium text-gray-900">
                        Quel type de facilité ?
                      </p>
                      <div className="mt-2 grid grid-cols-3 gap-4">
                        {facilityTypes.map((type) => (
                          <label key={type.id} className="flex items-center">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleFacilityTypeCheck(e, type.name)
                              }
                              checked={type.checked}
                              className="mr-2"
                            />
                            <span>{type.name}</span>
                          </label>
                        ))}
                      </div>

                      {/* Section des types de sol */}
                      <p className="mt-4 text-lg font-medium text-gray-900">
                        Quel type de sol ?
                      </p>
                      <div className="mt-2 grid grid-cols-3 gap-4">
                        {groundTypes.map((type) => (
                          <label key={type.id} className="flex items-center">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleGroundTypeCheck(e, type.name)
                              }
                              checked={type.checked}
                              className="mr-2"
                            />
                            <span>{type.name}</span>
                          </label>
                        ))}
                      </div>
                      {/* Section des types d'équipement */}
                      <p className="mt-4 text-lg font-medium text-gray-900">
                        Quels équipements sont disponibles ?
                      </p>
                      <div className="mt-2 grid grid-cols-3 gap-4">
                        {equipmentTypes.map((type) => (
                          <label key={type.id} className="flex items-center">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleEquipmentTypeCheck(e, type.name)
                              }
                              checked={type.checked}
                              className="mr-2"
                            />
                            <span>{type.name}</span>
                          </label>
                        ))}
                      </div>
                      {/* Section des types d'état */}
                      <p className="mt-4 text-lg font-medium text-gray-900">
                        Quel est l&apos;état actuel ?
                      </p>
                      <div className="mt-2 grid grid-cols-3 gap-4">
                        {stateTypes.map((type) => (
                          <label key={type.id} className="flex items-center">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleStateTypeCheck(e, type.name)
                              }
                              checked={type.checked}
                              className="mr-2"
                            />
                            <span>{type.name}</span>
                          </label>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="mt-6 inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
                      >
                        Précédent
                      </button>
                      <button
                        type="submit"
                        className="mt-6 inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      >
                        Envoyer
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PlaygroundModal;
