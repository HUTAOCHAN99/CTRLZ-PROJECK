import { useDestinationPanoramaUrl } from "@/firebase";
import { Viewer } from "@photo-sphere-viewer/core";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "./ui/skeleton";

function PanoramaViewer({ panoramaUrl }) {
    const containerRef = useRef();

    useEffect(() => {
        if (containerRef.current == null) return;

        const viewer = new Viewer({
            container: containerRef.current,
            panorama: panoramaUrl,
        });

        return () => {
            viewer.destroy();
        };
    }, [panoramaUrl]);

    return (
        <div className="w-64 h-64 lg:w-72 lg:h-72 flex">
            <div className="w-full h-full" ref={containerRef} />
        </div>
    );
}

export function PanoramaSkeleton() {
    return <Skeleton className="w-64 h-64 lg:w-72 lg:h-72"/>;
}

export function DestinationPanoramaViewer({ destinationId, panoramaId }) {
    const { url } = useDestinationPanoramaUrl(destinationId, panoramaId);

    if (url.loading) {
        return <PanoramaSkeleton/>
    }
    if (url.error) {
        return <p className="text-center">Gagal Memuat {url.error}</p>;
    }
    if (url.data == null) {
        return <p className="text-center">Error</p>;
    }

    return <PanoramaViewer panoramaUrl={url.data} />;
}