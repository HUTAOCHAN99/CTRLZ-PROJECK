import { useDestinationImageUrl, useDestinationById } from "@/firebase";
import imgNotAvailableUrl from "@/img/Image_not_available.png";
import imgLoading from "@/img/640px-Loading-red-spot.gif";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

function ImageSkeleton() {
  return <Skeleton className="w-full h-80" />
}

function DetailSkeleton() {
  return (
    <>
      <Skeleton className="h-10 font-bold text-center mb-4" />

      <div>
        <ImageSkeleton />
      </div>

      <Skeleton className="mx-8 mt-12 h-6" />
      <Skeleton className="mx-8 mt-2 h-6" />
      <Skeleton className="mx-8 mt-2 h-6" />
      <Skeleton className="mx-8 mt-2 h-6" />
      <Skeleton className="mx-8 mt-2 h-6" />
    </>
  )
}

function DetailContent({ id, data }) {
  const { url } = useDestinationImageUrl(id);
  return <>
    <h1 className="text-4xl font-bold text-center mb-4">{data.name}</h1>
    <div>
      {url.loading ? <ImageSkeleton /> :

        <img
          src={
            url.error
              ? imgNotAvailableUrl
              : url.data == null
                ? imgNotAvailableUrl
                : url.data
          }
          className="block mx-auto"
        />
      }

    </div>

    <p className="text-xl text-gray-600 text-justify p-8 mt-4">
      {data.description}
    </p>
  </>
}

export default function Detail({ id, onLoadingSuccess }) {
  const { loading, error, data } = useDestinationById(id);

  useEffect(() => {
    if (!loading && !error && data) {
      onLoadingSuccess();
    }
  }, [loading, error, data])

  return (
    <div className="detail-container mx-auto mt-8 p-4">
      {loading ? (
        <DetailSkeleton />
      ) : error ? (
        <p className="text-center">Error {error}</p>
      ) : (
        <DetailContent id={id} data={data} />
      )}
    </div>
  );
}
