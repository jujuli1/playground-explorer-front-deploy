import React, { useEffect } from 'react';
import Card from '../Card/Card';
import Message from '../Message/Message';
import Map from '../Map/Map';
import 'leaflet.locatecontrol';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import { Playground } from '../../@types/playground';

type PlaygroundsResultsProps = {
  items: Playground[];
  total_count: number | undefined | null;
};

function PlaygroundsResults({ items, total_count }: PlaygroundsResultsProps) {
  useEffect(() => {});
  // Create an array of objects with the id, name and position of each item. This array will be used to display the markers on the map.
  const objtArrayOfPosition = items.map((item) => {
    return {
      id: item.id,
      name: item.name,
      position: [parseFloat(item.lattitude), parseFloat(item.longitude)] as [
        number,
        number,
      ],
      adress: item.adress,
      zip_code: item.zip_code,
      city: item.city,
      closure: item.closure,
      zoning: item.zoning,
    };
  });
  return (
    <div
      className={`z-0 flex w-full flex-col-reverse pt-8 md:flex-row-reverse ${items.length === 0 ? 'hidden' : ''}`}
    >
      <div className="flex flex-col md:h-[50rem] md:w-1/2 md:justify-center">
        {/* Display the map with the items' positions */}
        <Map items={objtArrayOfPosition} />
      </div>
      <div className="flex flex-col py-2 md:w-1/2 md:py-12">
        {/* Display the number of items */}
        <Message total_count={total_count} />
        <div className="flex flex-wrap justify-center gap-8 bg-background py-8 text-text md:justify-center">
          {/* Display the cards of items */}
          {items.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlaygroundsResults;
