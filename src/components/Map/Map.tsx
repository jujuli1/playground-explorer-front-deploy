/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import mapPin from '../../assets/mapPin.svg';

const customIcon = new L.Icon({
  iconUrl: mapPin,
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

type Item = {
  id: number;
  name: string;
  position: L.LatLngExpression;
  adress: string;
  zip_code: string;
  city: string;
  closure: boolean;
  zoning: boolean;
};

type Items = Item[];

type MapProps = {
  items: Items;
};

const Map: React.FC<MapProps> = ({ items }) => {
  const calculateBounds = (items: Item[]): L.LatLngBounds => {
    const latLngs = items.map((item) => L.latLng(item.position));
    return L.latLngBounds(latLngs);
  };

  const bounds = React.useMemo(() => calculateBounds(items), [items]);

  const SetViewToBounds: React.FC<{ bounds: L.LatLngBounds }> = React.memo(
    ({ bounds }) => {
      const map = useMap();
      React.useEffect(() => {
        if (bounds.isValid()) {
          map.invalidateSize();
          map.fitBounds(bounds);
        }
      }, [bounds, map]);

      return null;
    }
  );

  return (
    <div className="relative z-10 h-96 w-full overflow-hidden rounded-md stroke-primary shadow-2xl md:h-full">
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {items.map((item) => (
          <Marker key={item.id} position={item.position} icon={customIcon}>
            <Popup>
              <div className="popup-content">
                <h2 className="mb-1 font-bold">{item.name}</h2>{' '}
                <div className="text-sm">
                  <p className="my-0.5">{item.adress}</p>{' '}
                  <p className="my-0.5">
                    {item.zip_code} {item.city}
                  </p>
                  <p className="my-0.5">
                    {item.closure ? 'Sécurisé' : 'Non Sécurisé'}
                  </p>
                  <p className="my-0.5">
                    {item.zoning
                      ? 'Avec des zones par âge'
                      : 'Sans zone par âge'}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        <SetViewToBounds bounds={bounds} />
      </MapContainer>
    </div>
  );
};

export default Map;
