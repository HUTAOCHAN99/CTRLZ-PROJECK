import { useContext, useEffect, useMemo, useState } from "react";
import Detail from "./Detail";
import { useParams } from "react-router-dom";
import {
  incrementDestinationVisitCount,
  useDestinationsPanorama,
  useDestinationUserRating,
  useSubmitRating,
} from "@/firebase";
import { DestinationPanoramaViewer } from "@/components/Panorama";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rating } from "@smastrom/react-rating";
import { Button } from "@/components/ui/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/firebase/AuthContext";

// Komponen Item Panorama
function DestinationPanoramasItem({ destinationId, panorama }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-center text-lg font-semibold mt-8 mb-4">{panorama.name}</h3>
      <DestinationPanoramaViewer destinationId={destinationId} panoramaId={panorama.id} />
    </div>
  );
}

// Komponen Menampilkan Daftar Panorama
function DestinationPanoramas({ id }) {
  const { state } = useDestinationsPanorama(id);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Panorama</h2>

      {state.loading ? (
        <p className="text-center">Memuat...</p>
      ) : state.error ? (
        <p className="text-center">Error: {state.error}</p>
      ) : state.data.length === 0 ? (
        <p className="text-center">Panorama masih kosong</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

// Skema validasi rating
const ratingSchema = z.object({
  rating: z.number().min(1, { message: "Harus diisi" }).max(5),
});

// Komponen Rating Ketika Logged In
function DestinationRatingLogged({ id }) {
  const { state: { loading, error, data }, refresh } = useDestinationUserRating(id);
  const { isLoading, runAction } = useSubmitRating(id);
  const form = useForm({
    resolver: zodResolver(ratingSchema),
    defaultValues: {
      rating: null,
    },
  });
  const hasRating = useMemo(() => data && data.rating, [data]);

  useEffect(() => {
    if (hasRating) form.setValue("rating", data.rating);
  }, [data, hasRating]);

  if (loading) return null;

  function onSubmit(val) {
    runAction(val).then((res) => {
      if (res.success) refresh();
    });
  }

  return (
    <Form {...form}>
      <form className="container max-w-96 mt-8" onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Berikan Rating Anda</CardTitle>
            <CardDescription>
              {hasRating ? "Anda sudah memberikan rating" : "Anda belum memberikan rating"}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Rating
                      ref={field.ref}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button disabled={isLoading} type="submit" className="w-full">
              {hasRating ? "Ubah Rating" : "Kirim Rating"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

// Komponen Rating Ketika Tidak Logged In
function DestinationNotLoggedIn() {
  return (
    <div className="container max-w-96 mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Berikan Rating Anda</CardTitle>
          <CardDescription>Anda belum bisa memberikan rating</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Login untuk memberikan rating</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Komponen Rating Utama
function DestinationRating({ id }) {
  const auth = useAuth();

  return auth ? <DestinationRatingLogged id={id} /> : <DestinationNotLoggedIn />;
}

// Komponen Utama Destination
export function Destination() {
  const { id } = useParams();
  const [showRating, setShowRating] = useState(false);

  useEffect(() => {
    incrementDestinationVisitCount(id);
  }, [id]);

  return (
    <>
      <Detail onLoadingSuccess={() => setShowRating(true)} id={id} />
      <DestinationPanoramas id={id} />
      {showRating &&
        <DestinationRating id={id} />}
    </>
  );
}
