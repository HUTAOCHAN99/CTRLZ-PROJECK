import DestinationList from "@/components/DestinationList";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMyDestination } from "@/firebase";
import { useAuth } from "@/firebase/AuthContext";
import { cities } from "@/util";
import { NewDestination } from "./NewDestination";

export function MyDestinationContent() {
    const { data, loading, error } = useMyDestination();

    return <>
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl">Destinasi Milik Saya</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Tambah</Button>
                    </DialogTrigger>
                    <NewDestination/>
                </Dialog>

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