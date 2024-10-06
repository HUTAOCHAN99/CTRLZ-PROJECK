import { useState } from "react";
import Detail from "./Detail";
import { useParams } from "react-router-dom";
import { useDestinationsPanorama } from "@/firebase";
import { DestinationPanoramaViewer } from "@/components/Panorama";

function DestinationPanoramasItem({ destinationId, panorama }) {
  return (
    <div>
      <h3>{panorama.name}</h3>
      <DestinationPanoramaViewer destinationId={destinationId} panoramaId={panorama.id}/>
    </div>
  );
}

function DestionationPanoramas({ id }) {
  const { state } = useDestinationsPanorama(id);

  return (
    <div className="container">
      <h2>Panorama</h2>

      {state.loading ? (
        <p className="text-center">Memuat...</p>
      ) : state.error ? (
        <p className="text-center">Error {state.error}</p>
      ) : state.data.length == 0 ? (
        <p className="text-center">Panorama masih kosong</p>
      ) : (
        <div>
          {state.data.map((pano) => (
            <DestinationPanoramasItem
              key={pano.id}
              destinationId={id}
              panorama={pano}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Destination() {
  const { id } = useParams();

  return (
    <>
      <Detail id={id} />
      <DestionationPanoramas id={id}/>
    </>
  );
}
