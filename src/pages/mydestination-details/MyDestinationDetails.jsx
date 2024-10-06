import { DestinationInformationEditDialog } from "@/components/DestinationInformationEditDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddDestinationsPanorama, useDeleteDestination, useDestinationById, useDestinationImageUrl, useDestinationPanoramaUrl, useDestinationsPanorama, useEditDestination, useUploadDestinationImage } from "@/firebase"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { DestinationPanoramaViewer } from "@/components/Panorama";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { RiMenu2Fill, RiMore2Fill } from "@remixicon/react";

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

const MAX_UPLOAD_SIZE = 1024 * 1024 * 2;
const schema = z.object({
    image: z.instanceof(File, { message: "Tidak boleh kosong" }).refine((file) => {
        return !file || file.size <= MAX_UPLOAD_SIZE;
    }, 'File size must be less than 2MB')
})

function DestinationImage({ id }) {
    const { url, refresh } = useDestinationImageUrl(id);
    const { isLoading, uploadDestinationImage } = useUploadDestinationImage(id);
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            image: ""
        }
    })

    function onSubmit(value) {
        uploadDestinationImage(value.image).then(() => {
            refresh();
        })
    }

    return <div>
        <h2 className="text-xl mb-4">Gambar</h2>
        {url.loading ? <p className="text-center">Memuat...</p> :
            url.error ? <p className="text-center">Gagal Memuat {error}</p>
                : url.data == null ? <p className="text-center">Masih kosong</p> : <img src={url.data} />}

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input type="file" accept="image/*" ref={field.ref} disabled={field.disabled} name={field.name} onBlur={field.onBlur} onChange={(e) => field.onChange(e.target.files?.[0])} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <Button type="submit">Ganti</Button>
            </form>
        </Form>
    </div>
}

const MAX_PANORAMA_UPLOAD_SIZE = 1024 * 1024 * 10;
const panoramaSchema = z.object({
    name: z.string().min(5, { message: "Minimal 5 karakter" }).max(50, { message: "Maksimal 50 karakter" }),
    image: z.instanceof(File, { message: "Tidak boleh kosong" }).refine((file) => {
        return !file || file.size <= MAX_PANORAMA_UPLOAD_SIZE;
    }, 'File size must be less than 2MB')
})

function DestinationPanoramas({ id }) {
    const { refresh, state } = useDestinationsPanorama(id);
    const { isLoading, addPanorama } = useAddDestinationsPanorama(id);
    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(panoramaSchema),
        defaultValues: {
            name: ""
        }
    })

    function onSubmit(value) {
        addPanorama(value).then((res) => {
            if (res.success) {
                setOpen(false);
                refresh();
            }
        })
    }

    return <div>
        <div className="flex justify-between">
            <h2 className="text-xl mb-4">Gambar</h2>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>Tambah Panorama</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tambah Panorama</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField control={form.control}
                                name="name"
                                render={({ field }) =>
                                    <FormItem>
                                        <FormLabel>Nama</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                } />

                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Image</FormLabel>
                                            <FormControl>
                                                <Input type="file" accept="image/*" ref={field.ref} disabled={field.disabled} name={field.name} onBlur={field.onBlur} onChange={(e) => field.onChange(e.target.files?.[0])} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />

                            <DialogFooter >
                                <DialogClose asChild>
                                    <Button variant="destructive" disabled={isLoading}>
                                        Batal
                                    </Button>
                                </DialogClose>
                                <Button type="submit" disabled={isLoading}>
                                    Tambah
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
        {state.loading ? <p className="text-center">Memuat...</p> :
            state.error ? <p className="text-center">Gagal Memuat {error}</p>
                : state.data.length == 0 ? <p className="text-center">Masih kosong</p> : <ul>
                    {state.data.map((pano) => <li key={pano.id}><DestinationPanoramaViewer destinationId={id} panoramaId={pano.id} /></li>)}
                </ul>}
    </div>

}

function Content({ destination }) {
    return <>
        <div className="space-y-8">
            <DestinationInformation destination={destination} />
            <DestinationImage id={destination.id} />
            <DestinationPanoramas id={destination.id} />
        </div>
    </>
}

function MyDestinationDetailsContent({ id }) {
    const { loading, data, error } = useDestinationById(id);
    const { isLoading: isDeleteLoading, deleteDestination } = useDeleteDestination(id);
    const navigate = useNavigate();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    return <div className="container mx-auto">
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus</DialogTitle>
                </DialogHeader>
                <p>Apakah anda yakin untuk menghapus?</p>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Batal</Button>
                    </DialogClose>
                    <Button disabled={isDeleteLoading} variant="destructive" onClick={() => {
                        deleteDestination().then((res) => {
                            if (res.success) {
                                navigate("/mydestination");
                            }
                        })
                    }}>Hapus</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl">Properti Destinasi</h1>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <RiMore2Fill />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTimeout(() => setDeleteDialogOpen(true), 50)}>Hapus</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
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