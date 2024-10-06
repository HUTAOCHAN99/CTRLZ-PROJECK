import { DestinationInformationEditDialog } from "@/components/DestinationInformationEditDialog";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { useDestinationById, useEditDestination } from "@/firebase"
import { useState } from "react";
import { useParams } from "react-router-dom";

function DestinationInformation({ destination }) {
    const [value, setValue] = useState({
        name: destination.name,
        kabupaten: destination.kabupaten,
        description: destination.description
    })
    const { isLoading, editDestination } = useEditDestination();

    return <div>
        <h2 className="text-xl mb-4">Informasi Utama</h2>
        <p>Nama</p>
        <p className="mb-2">{value.name}</p>
        <p>Kabupaten</p>
        <p className="mb-2">{value.kabupaten}</p>
        <p>Deskripsi</p>
        <p className="mb-2">{value.description}</p>
        <DestinationInformationEditDialog values={value} submitText="Ubah" title="Ubah Informasi" isLoading={isLoading}
            onSubmit={(value) => editDestination({
                id: destination.id,
                data: value
            }).then((res) => {
                setValue(value);
                return res.success;
            })} >
            <DialogTrigger asChild>
                <Button>
                    Ubah Informasi
                </Button>
            </DialogTrigger>
        </DestinationInformationEditDialog>
    </div>
}

function Content({ destination }) {
    return <>
        <DestinationInformation destination={destination} />
    </>
}

function MyDestinationDetailsContent({ id }) {
    const { loading, data, error } = useDestinationById(id);

    return <div className="container mx-auto">
        <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl">Properti Destinasi</h1>
        </div>

        {loading ? <p className="text-center">Memuat...</p> :
            error ? <p className="text-center">Gagal Memuat {error}</p>
                : data.length == 0 ? <p className="text-center mb-80">Masih kosong</p> : <Content destination={data} />}
    </div>
}

export function MyDestinationDetails(props) {
    const params = useParams();
    return <MyDestinationDetailsContent id={params.id} />
}