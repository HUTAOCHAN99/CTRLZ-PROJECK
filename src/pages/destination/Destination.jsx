import { useContext, useEffect, useMemo, useState } from "react";
import Detail from "./Detail";
import { useParams } from "react-router-dom";
import { incrementDestinationVisitCount, useDestinationsPanorama, useDestinationUserRating, useSubmitRating } from "@/firebase";
import { DestinationPanoramaViewer } from "@/components/Panorama";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Rating } from "@smastrom/react-rating"
import { Button } from "@/components/ui/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/firebase/AuthContext";

function DestinationPanoramasItem({ destinationId, panorama }) {
  return (
    <div>
      <h3 className="text-center text-lg font-semibold mt-8 mb-4">{panorama.name}</h3>
      <DestinationPanoramaViewer destinationId={destinationId} panoramaId={panorama.id} />
    </div>
  );
}

function DestionationPanoramas({ id }) {
  const { state } = useDestinationsPanorama(id);

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold text-center">Panorama</h2>

      {state.loading ? (
        <p className="text-center">Memuat...</p>
      ) : state.error ? (
        <p className="text-center">Error {state.error}</p>
      ) : state.data.length == 0 ? (
        <p className="text-center">Panorama masih kosong</p>
      ) : (
        <div>
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

const ratingSchema = z.object({
  rating: z.number({ message: "Harus diisi" }).min(1, { message: "Harus diisi" }).max(5)
})

function DestinationRatingLogged({ id }) {
  const { state: {loading, error, data}, refresh } = useDestinationUserRating(id);
  const { isLoading, runAction } = useSubmitRating(id);
  const form = useForm({
    resolver: zodResolver(ratingSchema),
    defaultValues: {
      rating: null
    }
  })
  const hasRating = useMemo(() => data && data.rating, [data]);

  useEffect(() => {
    if (hasRating) form.setValue("rating", data.rating);
  }, [data, hasRating])


  if (loading) return null;

  function onSubmit(val) {
    runAction(val).then((res) => {
      if (res.success) refresh();
    })
  }

  return <Form {...form}>
    <form className="container max-w-96 mt-8" onSubmit={form.handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Berikan Rating Anda</CardTitle>
          <CardDescription>{hasRating ? "Anda sudah memberikan rating" : "Anda belum memberikan rating"}</CardDescription>
        </CardHeader>
        <CardContent className="px-8">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Rating ref={field.ref} isDisabled={field.disabled} value={field.value} isRequired onChange={field.onChange} onBlur={field.onBlur}></Rating>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </CardContent>
        <CardFooter>
          <Button disabled={isLoading} type="submit" className="w-full">{hasRating ? "Ubah Rating" : "Kirim Rating"}</Button>
        </CardFooter>
      </Card>
    </form>
  </Form>
}

function DestinationNotLoggedIn() {
  return <div className="container max-w-96 mt-8"><Card>
    <CardHeader>
      <CardTitle>Berikan Rating Anda</CardTitle>
      <CardDescription>Anda belum bisa memberikan rating</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Login untuk memberikan rating</p>
    </CardContent>
  </Card>
  </div>
}

function DestinationRating({ id }) {
  const auth = useAuth();

  if (auth) return <DestinationRatingLogged id={id} />
  return <DestinationNotLoggedIn/>;
}

export function Destination() {
  const { id } = useParams();

  useEffect(() => {
    incrementDestinationVisitCount(id);
  }, [])

  return (
    <>
      <Detail id={id} />
      <DestionationPanoramas id={id} />
      <DestinationRating id={id} />
    </>
  );
}
