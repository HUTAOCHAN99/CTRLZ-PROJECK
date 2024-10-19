import { useDestinationPanoramaUrl } from "@/firebase";
import { Viewer } from "@photo-sphere-viewer/core";
import { useEffect, useRef, useState } from "react";

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
        <div className="w-64 h-64 flex">
            <div className="w-full h-full" ref={containerRef} />
        </div>
    );
}

export function DestinationPanoramaViewer({ destinationId, panoramaId }) {
    const { url } = useDestinationPanoramaUrl(destinationId, panoramaId);

    if (url.loading) {
        return <p className="text-center">Memuat...</p>;
    }
    if (url.error) {
        return <p className="text-center">Gagal Memuat {url.error}</p>;
    }
    if (url.data == null) {
        return <p className="text-center">Error</p>;
    }

    return <PanoramaViewer panoramaUrl={url.data} />;
}

export function DestinationPanoramas({ id }) {
    const { refresh, state } = useDestinationsPanorama(id);
    const { isLoading, addPanorama } = useAddDestinationsPanorama(id);
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="flex justify-between">
                <h2 className="text-xl mb-4">Panorama</h2>
                <PanoramaDialog
                    title="Tambah Panorama"
                    submitText="Tambah"
                    onRefresh={refresh}
                    open={open}
                    setOpen={setOpen}
                    schema={panoramaSchema}
                    formExtra={{
                        defaultValues: {
                            name: "",
                        },
                    }}
                    isLoading={isLoading}
                    onSubmit={(value) => addPanorama(value)}
                >
                    <DialogTrigger asChild>
                        <Button>Tambah Panorama</Button>
                    </DialogTrigger>
                </PanoramaDialog>
            </div>

            {state.loading ? (
                <p className="text-center">Memuat...</p>
            ) : state.error ? (
                <p className="text-center">Gagal Memuat {state.error}</p>
            ) : state.data.length === 0 ? (
                <p className="text-center">Masih kosong</p>
            ) : (
                <ul className="grid grid-cols-4 gap-2">
                    {state.data.map((pano) => (
                        <li key={pano.id} className="w-full">
                            <DestinationPanoramaViewer
                                destinationId={id}
                                panoramaId={pano.id}
                                onRefresh={refresh}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
