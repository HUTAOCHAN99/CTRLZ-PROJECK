import DestinationList from "@/components/DestinationList";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddDestination, useMyDestination } from "@/firebase";
import { useAuth } from "@/firebase/AuthContext";
import { cities } from "@/util";
import { DestinationInformationEditDialog } from "../../components/DestinationInformationEditDialog";
import { useNavigate } from "react-router-dom";

export function MyDestinationContent() {
    const { data, loading, error } = useMyDestination();
    const { isLoading, addDestination } = useAddDestination();
    const navigate = useNavigate();

    return <>
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl">Destinasi Milik Saya</h1>
                <DestinationInformationEditDialog
                    onSubmit={async (value) => addDestination(value).then((doc) => {
                        if (doc.success) {
                            navigate(`/mydestination/${doc.data.id}`);
                        }
                        return doc.success;
                    })}
                    isLoading={isLoading}
                    submitText="Buat"
                    values={{
                        name: "",
                        description: ""
                    }}
                    title="Destinasi Baru">
                    <DialogTrigger asChild>
                        <Button>Tambah</Button>
                    </DialogTrigger>
                </DestinationInformationEditDialog>

            </div>

            {loading ? <p className="text-center">Memuat...</p> :
                error ? <p className="text-center">Gagal Memuat {error}</p>
                    : data.length == 0 ? <p className="text-center mb-80">Masih kosong</p> : <DestinationList list={data} createLink={({ id }) => `/mydestination/${id}`} />}
        </div>
    </>
}

export function MyDestination() {
    const auth = useAuth();

    if (!auth) return;

    return <MyDestinationContent />
}