/* eslint-disable import/no-absolute-path */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '@iconify/react';
import Spinner from '../../Spinner/Spinner';
import ModalAvis from './NoticeModal';
import Map from '../../Map/Map';
import defaultImg from '../../../assets/pictures/defaultImg.webp';
import FavoriteBtn from '../../Buttons/FavoriteBtn';
import {
  Playground,
  Picture,
  Feature,
  Timetable,
  Notice,
} from '../../../@types/playground';

const PlaygroundDetails = () => {
  // states for the playground details
  const [itemData, setItemData] = useState<Playground | null>(null);
  const [timetables, setTimetables] = useState<Timetable[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [playgroundData, setPlaygroundData] = useState<Playground | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(pictures[0]?.url || defaultImg);
  const [errorNoResult, setErrorNoResult] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [visibleNotice, setVisibleNotice] = useState(3);

  // get the id from the url
  const { id } = useParams<{ id: string }>();

  // fetch the playground details
  useEffect(() => {
    const fetchPlaygroundDetails = async () => {
      try {
        // fetch the playground details from the API using the id
        const response = await axios.get(
          `https://playground-explorer-back-api-2c0b9098656f.herokuapp.com/api/playgrounds/${id}`
        );
        setItemData(response.data);
        setTimetables(response.data.timetables || []);
        setFeatures(response.data.features || []);
        setPictures(response.data.pictures || []);
        setNotices(response.data.notice || []);
        setImgSrc(response.data.pictures[0]?.url || defaultImg);
        const { data } = response;
        setPlaygroundData({
          ...data,
          position: [parseFloat(data.lattitude), parseFloat(data.longitude)],
        });
        // eslint-disable-next-line @typescript-eslint/no-shadow
      } catch (error) {
        setErrorNoResult(true);
        throw new Error('Erreur : les données ne sont pas disponibles');
      } finally {
        setLoading(false);
      }
    };
    // call the fetchPlaygroundDetails function
    fetchPlaygroundDetails();
  }, [id]);

  if (loading) return <Spinner />;
  if (errorNoResult)
    return <div>Erreur : les données ne sont pas disponibles</div>;
  if (!playgroundData)
    return <div>Aucune donnée de terrain de jeux disponible</div>; // Handling no data case

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLoadMore = () => {
    setVisibleNotice((prev) => prev + 3);
  };

  return (
    <div className=" mx-8 my-10 flex flex-col gap-y-10 text-text">
      {loading && <Spinner />}

      <section className="flex justify-between">
        <div className="title flex flex-col justify-between gap-2">
          <h1 className="font-title text-3xl font-semibold md:text-left">
            {itemData?.name}
          </h1>
          <span className="text-xl md:text-left">{itemData?.city}</span>
        </div>
        {itemData && <FavoriteBtn playgroundId={itemData.id} />}
      </section>
      <div className=" gap-x-10 md:flex md:flex-row">
        <div className="flex flex-col gap-y-10 md:w-1/2">
          <section
            id="pictures"
            className="h-72 rounded-md bg-cover bg-no-repeat shadow-xl md:h-96 md:w-full md:bg-center"
            style={{ backgroundImage: `url(${defaultImg})` }}
          />
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <Icon
                className="size-7 text-accent drop-shadow-lg"
                aria-hidden="true"
                icon="icon-park-outline:local"
              />
              <Link
                className="md:text-left"
                to={`https://www.google.com/maps/place/${itemData?.lattitude},${itemData?.longitude}`}
                target="_blank"
              >
                <div className="flex gap-5">
                  <div className="flex flex-col items-end">
                    <p className="md:text-left">Adresse:</p>
                    <Link
                      to={`https://www.google.com/maps/place/${itemData?.lattitude},${itemData?.longitude}`}
                      target="_blank"
                    >
                      <Icon
                        className="h-6 w-6 rounded-full bg-primary p-1 text-white transition-all duration-300 ease-in-out hover:bg-secondary hover:shadow-xl"
                        aria-hidden="true"
                        icon="ep:arrow-right-bold"
                      />
                    </Link>
                  </div>
                  <div>
                    <p>{itemData?.adress.toLowerCase()},</p>
                    <p>
                      {itemData?.zip_code} {itemData?.city}
                    </p>
                  </div>{' '}
                </div>
              </Link>
            </div>
            <div className="flex gap-4">
              <Icon
                className="size-7 text-accent drop-shadow-lg"
                aria-hidden="true"
                icon="bx:bxs-time-five"
              />
              <p className="md:text-left">Horaires:</p>
              <ul>
                {timetables.map((timetable) => (
                  <li key={timetable.id}>
                    {timetable.day_week} {timetable.opening_time}{' '}
                    {timetable.closing_time}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="features text-text">
            <h2 className="text-xl font-semibold md:text-left">Equipements</h2>
            <ul className="my-4 grid grid-cols-3 gap-x-2 gap-y-4  md:text-left">
              {features.map((feature) => (
                <li key={feature.id}>{feature.feature}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:w-1/2">
          <div className="mx-auto flex w-full flex-col">
            <div className="flex h-full w-full flex-col md:h-[40rem]">
              <Map items={[playgroundData]} />
            </div>
          </div>

          <div id="notices" className="mt-10 flex flex-col gap-4">
            <h2 className="text-xl font-semibold md:text-left">
              Avis des utilisateurs sur {itemData?.name}
            </h2>
            {notices.length > 0 ? (
              notices.slice(0, visibleNotice).map((notice) => (
                <div key={notice.id} className="avis text-text md:mb-4 md:flex">
                  <div className="border-gray flex w-full rounded-md shadow-xl">
                    <img
                      src={imgSrc}
                      onError={() => setImgSrc(defaultImg)}
                      className="w-1/3 rounded-l-md"
                      alt={itemData?.name}
                    />
                    <aside className="relative ml-2 w-full gap-2 py-1 pr-2">
                      <h3 className="text-xl font-semibold text-text">
                        {itemData?.name}
                      </h3>
                      <p className="h-20 w-full">{notice.comment}</p>
                      <p className="text-right">
                        le{' '}
                        {/*
                          Setting the date in french format using the toLocaleString method with the 'fr-FR' locale
                        */}
                        {notice.createdat
                          ? `${new Date(notice.createdat).getDate()} ${new Date(notice.createdat).toLocaleString('fr-FR', { month: 'long' })} ${new Date(notice.createdat).getFullYear()}`
                          : 'date inconnue'}
                      </p>
                    </aside>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-left">
                Aucun avis disponible pour le moment, sois le premier à en
                ajouter !
              </p>
            )}
            {/* Load more button */}
            {notices.length === 0 ? null : (
              <button
                className="flex justify-center"
                type="button"
                onClick={handleLoadMore}
                aria-label="Voir plus"
              >
                <Icon
                  className="size-11 rotate-180 text-secondary"
                  aria-hidden="true"
                  icon="line-md:upload-outline-loop"
                />
              </button>
            )}
            <button
              className="flex h-12 w-60 items-center justify-center rounded-full bg-primary p-6 text-white shadow-md transition-all duration-300 ease-in-out hover:bg-secondary hover:shadow-xl"
              type="button"
              onClick={openModal}
            >
              Ajouter un avis
            </button>
            {modalOpen && <ModalAvis closeModal={closeModal} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundDetails;
