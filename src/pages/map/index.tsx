import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { MapContainer } from "../../components/MapContainer/MapContainer";

export type CoordsType = {
  lat: number;
  lng: number;
};

export default function Map() {
  const [latLng, setLatLng] = useState<CoordsType | null>(null);
  const [zoom, setZoom] = useState(12);
  const { query } = useRouter();

  useEffect(() => {
    if (query.lat && query.lng) {
      setLatLng({
        lat: parseFloat(query.lat as string),
        lng: parseFloat(query.lng as string),
      });
    }
    if (query.zoom) {
      setZoom(parseInt(query.zoom as string, 10));
    }
  }, [query]);

  return (
    <div>
      <div>
        {latLng?.lat}
        {latLng?.lng}
        {zoom}
      </div>
      <MapContainer coords={latLng} zoom={zoom} forceTriggerQuery />
    </div>
  );
}
