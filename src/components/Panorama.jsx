import { useDestinationPanoramaUrl } from "@/firebase";
import { Viewer } from "@photo-sphere-viewer/core"
import { useEffect, useRef } from "react";

function PanoramaViewer({ panoramaUrl }) {
    const containerRef = useRef();

    useEffect(() => {
        if (containerRef.current == null) return;

        const viewer = new Viewer({
            container: containerRef.current,
            panorama: panoramaUrl
        });

        return () => {
            viewer.destroy();
        }
    }, [panoramaUrl]);

    return <div>
        <div className="w-96 h-96 m-auto" ref={containerRef} />
    </div>
}

export function DestinationPanoramaViewer({ destinationId, panoramaId }) {
    const { url, refresh } = useDestinationPanoramaUrl(destinationId, panoramaId);
    return url.loading ? <p className="text-center">Memuat...</p> :
        url.error ? <p className="text-center">Gagal Memuat {error}</p> : 
        url.data == null ? <p className="text-center">Error {error}</p> :  <PanoramaViewer panoramaUrl={url.data}/>;
}