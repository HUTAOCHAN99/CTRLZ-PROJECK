import { DestinationInformationEditDialog } from "@/components/DestinationInformationEditDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAddDestinationsPanorama,
  useDeleteDestination,
  useDeleteDestionationPanorama,
  useDestinationById,
  useDestinationImageUrl,
  useDestinationPanoramaUrl,
  useDestinationsPanorama,
  useEditDestination,
  useEditDestinationsPanorama,
  useUploadDestinationImage,
} from "@/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { DestinationPanoramaViewer } from "@/components/Panorama";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { RiMenu2Fill, RiMore2Fill } from "@remixicon/react";

function DestinationInformation({ destination }) {
  const [value, setValue] = useState({
    name: destination.name,
    kabupaten: destination.kabupaten,
    description: destination.description,
  });
  const { isLoading, editDestination } = useEditDestination();

  return (
    <div className="mb-8 p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Informasi Utama</h2>
      <div className="mb-4">
        <p>Nama</p>
        <p className="mb-2">{value.name}</p>
      </div>
      <div className="mb-4">
        <p>Kabupaten</p>
        <p className="mb-2">{value.kabupaten}</p>
      </div>
      <div className="mb-4">
        <p>Deskripsi</p>
        <p className="mb-2">{value.description}</p>
      </div>
      <DestinationInformationEditDialog
        values={value}
        submitText="Ubah"
        title="Ubah Informasi"
        isLoading={isLoading}
        onSubmit={(value) =>
          editDestination({
            id: destination.id,
            data: value,
          }).then((res) => {
            setValue(value);
            return res.success;
          })
        }
      >
        <DialogTrigger asChild>
          <Button>Ubah Informasi</Button>
        </DialogTrigger>
      </DestinationInformationEditDialog>
    </div>
  );
}

const MAX_UPLOAD_SIZE = 1024 * 1024 * 2;
const schema = z.object({
  image: z
    .instanceof(File, { message: "Tidak boleh kosong" })
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 2MB"),
});

function DestinationImage({ id }) {
    const { url, refresh } = useDestinationImageUrl(id);
    const { isLoading, uploadDestinationImage } = useUploadDestinationImage(id);
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: { image: "" }
    });

    function onSubmit(value) {
        uploadDestinationImage(value.image).then(() => refresh());
    }

    return (
        <div className="mb-8 p-4 border rounded-lg bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Gambar</h2>
            {url.loading ? (
                <p className="text-center">Memuat...</p>
            ) : url.error ? (
                <p className="text-center">Gagal Memuat {url.error}</p>
            ) : url.data == null ? (
                <p className="text-center">Masih kosong</p>
            ) : (
                <img src={url.data} className="w-full h-auto mb-4" alt="Destination" />
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        ref={field.ref}
                                        disabled={field.disabled}
                                        name={field.name}
                                        onBlur={field.onBlur}
                                        onChange={(e) => field.onChange(e.target.files?.[0])}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Ganti</Button>
                </form>
            </Form>
        </div>
    );
}

const MAX_PANORAMA_UPLOAD_SIZE = 1024 * 1024 * 10;
const panoramaSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Minimal 5 karakter" })
    .max(50, { message: "Maksimal 50 karakter" }),
  image: z
    .instanceof(File, { message: "Tidak boleh kosong" })
    .refine((file) => {
      return !file || file.size <= MAX_PANORAMA_UPLOAD_SIZE;
    }, "File size must be less than 2MB"),
});
const panoramaEditSchema = panoramaSchema.partial({
  image: true,
});

function DestinationDeletePanoDialog({
  destinationId,
  panoramaId,
  open,
  setOpen,
  onRefresh,
}) {
  const { isLoading, deletePanorama } = useDeleteDestionationPanorama(
    destinationId,
    panoramaId
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Panorama</DialogTitle>
        </DialogHeader>
        <p>Apakah anda ingin menghapus panorama?</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" disabled={isLoading}>
              Batal
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={() => {
              deletePanorama().then((value) => {
                if (value.success) {
                  setOpen(false);
                  onRefresh();
                }
              });
            }}
          >
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DestinationPanoramasItem({ destinationId, panorama, onRefresh }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { isLoading, editPanorama } = useEditDestinationsPanorama(
    destinationId,
    panorama.id
  );
  const [showPano, setShowPano] = useState(true);

  return (
    <li>
      <div className="flex justify-between items-center">
        <h2>{panorama.name}</h2>

        <DestinationDeletePanoDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          destinationId={destinationId}
          panoramaId={panorama.id}
          onRefresh={onRefresh}
        />
        <PanoramaDialog
          open={editOpen}
          setOpen={setEditOpen}
          formExtra={{ defaultValues: { name: panorama.name } }}
          isLoading={isLoading}
          onRefresh={() => {
            setTimeout(() => {
              setShowPano(false);
              setTimeout(() => {
                setShowPano(true);
              }, 100);
            }, 100);
          }}
          title="Edit Panorama"
          submitText="Edit"
          onSubmit={(value) => editPanorama(value)}
          schema={panoramaEditSchema}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <RiMore2Fill />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => setTimeout(() => setEditOpen(true), 50)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTimeout(() => setDeleteOpen(true), 50)}
            >
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {showPano && (
        <DestinationPanoramaViewer
          destinationId={destinationId}
          panoramaId={panorama.id}
        />
      )}
    </li>
  );
}

function PanoramaDialog({
  children,
  open,
  setOpen,
  schema,
  title,
  submitText,
  onSubmit,
  onRefresh,
  formExtra,
  isLoading,
}) {
  const form = useForm({
    resolver: zodResolver(schema),
    ...formExtra,
  });
  function handleSubmit(value) {
    onSubmit(value).then((res) => {
      if (res.success) {
        setOpen(false);
        onRefresh();
      }
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        ref={field.ref}
                        disabled={field.disabled}
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="destructive" disabled={isLoading}>
                  Batal
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {submitText}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function DestinationPanoramas({ id }) {
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
        <p className="text-center">Gagal Memuat {error}</p>
      ) : state.data.length == 0 ? (
        <p className="text-center">Masih kosong</p>
      ) : (
        <ul>
          {state.data.map((pano) => (
            <DestinationPanoramasItem
              destinationId={id}
              panorama={pano}
              key={pano.id}
              onRefresh={refresh}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function Content({ destination }) {
  return (
    <>
      <div className="space-y-8">
        <DestinationInformation destination={destination} />
        <DestinationImage id={destination.id} />
        <DestinationPanoramas id={destination.id} />
      </div>
    </>
  );
}

function MyDestinationDetailsContent({ id }) {
  const { loading, data, error } = useDestinationById(id);
  const { isLoading: isDeleteLoading, deleteDestination } =
    useDeleteDestination(id);
  const navigate = useNavigate();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <div className="container mx-auto">
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
            <Button
              disabled={isDeleteLoading}
              variant="destructive"
              onClick={() => {
                deleteDestination().then((res) => {
                  if (res.success) {
                    navigate("/mydestination");
                  }
                });
              }}
            >
              Hapus
            </Button>
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
            <DropdownMenuItem
              onClick={() => setTimeout(() => setDeleteDialogOpen(true), 50)}
            >
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {loading ? (
        <p className="text-center">Memuat...</p>
      ) : error ? (
        <p className="text-center">Gagal Memuat {error}</p>
      ) : data.length == 0 ? (
        <p className="text-center mb-80">Masih kosong</p>
      ) : (
        <Content destination={data} />
      )}
    </div>
  );
}

export function MyDestinationDetails(props) {
  const params = useParams();
  return <MyDestinationDetailsContent id={params.id} />;
}
