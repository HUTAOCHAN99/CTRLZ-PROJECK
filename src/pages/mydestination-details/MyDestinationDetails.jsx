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
import { DestinationPanoramaViewer, PanoramaSkeleton } from "@/components/Panorama";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { RiMenu2Fill, RiMore2Fill } from "@remixicon/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import brokenImg from "@/img/Image_not_available.png"

function DestinationInformationSkeleton() {
  return (
    <div className="mb-8 p-4 border rounded-lg bg-white shadow-sm">
      <Skeleton className="text-xl font-semibold mb-4 w-full h-7" />
      <div className="mb-4">
        <Skeleton className="w-full h-6 font-bold" />
        <Skeleton className="w-full mt-2 h-6 mb-2" />
      </div>
      <div className="mb-4">
        <Skeleton className="w-full h-6 font-bold" />
        <Skeleton className="w-full mt-2 h-6 mb-2" />
      </div>
      <div className="mb-4">
        <Skeleton className="w-full h-6 font-bold" />
        <Skeleton className="w-full mt-2   h-6 mb-2" />
      </div>
    </div>
  );
}

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
        <p className="font-bold">Nama</p>
        <p className="mb-2">{value.name}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Kabupaten</p>
        <p className="mb-2">{value.kabupaten}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Deskripsi</p>
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

function DestinationImageSkeleton() {
  return (
    <div className="mb-8 p-4 border rounded-lg bg-white shadow-sm">
      <Skeleton className="text-xl font-semibold mb-4 w-full h-7" />
      <Skeleton className="w-[320px] h-48 mb-4" />

      <div className="space-y-4">
        <Skeleton className="w-10 h-4 mb-1" />
        <Skeleton className="w-full h-10 mb-1" />
        <Skeleton className="w-full h-10" />
      </div>
    </div>
  );
}

function DestinationImage({ id }) {
  const { url, refresh } = useDestinationImageUrl(id);
  const { isLoading, uploadDestinationImage } = useUploadDestinationImage(id);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { image: "" },
  });

  function onSubmit(value) {
    uploadDestinationImage(value.image).then(() => refresh());
  }

  return (
    <div className="mb-8 p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Gambar</h2>
      {url.loading ? (
        <Skeleton className="w-[320px] h-48 mb-4" />
      ) : url.error ? (
        <p className="text-center">Gagal Memuat {url.error}</p>
      ) : url.data == null ? (
        <img className="w-[320px] h-auto mb-4" src={brokenImg} />
      ) : (
        <img src={url.data} className="w-[320px] h-auto mb-4" alt="Destination" />
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
          <Button type="submit" className="w-full">
            Ganti
          </Button>
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

function DestinationPanoramasItemSkeleton({ }) {
  return (
    <li>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <Skeleton className="w-20 h-7" />

          <Skeleton className="w-10 h-10" />
        </CardHeader>
        <CardContent>
          <div className="">

          </div>

          <div className="flex justify-center">
            <PanoramaSkeleton />
          </div>
        </CardContent>
      </Card>

    </li>
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
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-semibold">{panorama.name}</CardTitle>

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
        </CardHeader>

        <CardContent className="flex justify-center">
          {showPano && (
            <DestinationPanoramaViewer
              destinationId={destinationId}
              panoramaId={panorama.id}
            />
          )}
        </CardContent>

        <CardFooter />
      </Card>
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
  // form tambah destinasi
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

function DestinationPanoramasSkeleton() {

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Skeleton className="w-20 h-7 text-xl mb-4" />

        <Skeleton className="w-40 h-10" />
      </div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DestinationPanoramasItemSkeleton />
        <DestinationPanoramasItemSkeleton />
        <DestinationPanoramasItemSkeleton />
      </ul>
    </div>
  );
}

function DestinationPanoramas({ id }) {
  const { refresh, state } = useDestinationsPanorama(id);
  const { isLoading, addPanorama } = useAddDestinationsPanorama(id);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between mb-4">
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
      {state.error ? (
        <p className="text-center">Gagal Memuat {error}</p>
      ) : !state.loading && state.data.length == 0 ? (
        <p className="text-center">Masih kosong</p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {state.loading && <>
            <DestinationPanoramasItemSkeleton />
            <DestinationPanoramasItemSkeleton />
            <DestinationPanoramasItemSkeleton />
          </>}
          {!state.loading && state.data.map((pano) => (
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
        {/* Grid layout untuk lg dan xl, dan satu kolom untuk md ke bawah */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Gunakan flex di dalam grid untuk memastikan tinggi kedua bagian sama */}
          <div className="flex flex-col lg:col-span-1 h-full">
            <DestinationInformation destination={destination} />
          </div>
          <div className="flex flex-col lg:col-span-1 h-full">
            <DestinationImage id={destination.id} />
          </div>
        </div>
        <DestinationPanoramas id={destination.id} />
      </div>
    </>
  );
}

function ContentSkeleton() {
  return <div className="space-y-8">
    {/* Grid layout untuk lg dan xl, dan satu kolom untuk md ke bawah */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Gunakan flex di dalam grid untuk memastikan tinggi kedua bagian sama */}
      <div className="flex flex-col lg:col-span-1 h-full">
        <DestinationInformationSkeleton />
      </div>
      <div className="flex flex-col lg:col-span-1 h-full">
        <DestinationImageSkeleton />
      </div>
    </div>
    <DestinationPanoramasSkeleton />
  </div>
}

function MyDestinationDetailsContentSkeleton() {
  return <div className="container mx-auto">
    <div className="flex justify-between items-center mb-2">
      <Skeleton className="text-2xl h-8 w-48" />
    </div>

    <ContentSkeleton />
  </div>
}

function MyDestinationDetailsContent({ id, data }) {
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

      <Content destination={data} />
    </div>
  );
}

export function MyDestinationDetails(props) {
  const params = useParams();
  const { loading, data, error } = useDestinationById(params.id);

  if (loading)
    return <MyDestinationDetailsContentSkeleton />;
  if (error) return <div className="mx-auto">
    <p className="text-center">Gagal Memuat {error}</p>
  </div>;

  return <MyDestinationDetailsContent id={params.id} data={data} />;
}
