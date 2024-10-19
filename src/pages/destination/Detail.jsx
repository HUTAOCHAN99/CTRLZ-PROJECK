import { useDestinationImageUrl, useDestinationById } from "@/firebase";
import imgNotAvailableUrl from "@/img/Image_not_available.png";
import imgLoading from "@/img/640px-Loading-red-spot.gif";

export default function Detail({ id }) {
  const { loading, error, data } = useDestinationById(id);
  const { url } = useDestinationImageUrl(id);
  return (
    <div className="detail-container mx-auto mt-8 p-4">
      {loading ? (
        <p className="text-center">Memuat...</p>
      ) : error ? (
        <p className="text-center">Error {error}</p>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center mb-4">{data.name}</h1>

          {/* Rekomendasi dan Rating */}
          {/* <div className="flex items-center justify-center mt-2">
        <span className="text-red-500 mr-2">● Recommended</span>
        <span className="text-yellow-500">★ 4.8 (5,430)</span>
        <span className="ml-4 text-gray-500">#2 dari 50 tempat paling banyak dikunjungi di Yogyakarta</span>
      </div> */}

          <div>
            <img
              src={
                url.loading
                  ? imgLoading
                  : url.error
                  ? imgNotAvailableUrl
                  : url.data == null
                  ? imgNotAvailableUrl
                  : url.data
              }
              className="block mx-auto"
            />
          </div>

          <p className="text-xl text-gray-600 text-justify p-8 mt-4">
            {data.description}
          </p>

          {/* Navigasi di bawah gambar */}
          {/* <div className="detail-navigation mt-4 flex justify-around text-gray-500">
            <a href="#intro" className="hover:text-black">
              Intro
            </a>
            <a href="#hours" className="hover:text-black">
              Jam & Biaya
            </a>
            <a href="#Vtour" className="hover:text-black">
              VTour
            </a>
          </div> */}

          {/* Deskripsi */}
          {/* <div className="detail-description mt-4 text-gray-700">
            <p>
              Candi Prambanan (Rara Jonggrang) adalah candi Hindu terbesar di
              Indonesia, terletak di Jawa Tengah, dekat
              <a href="#yogyakarta" className="text-blue-500">
                {" "}
                Yogyakarta
              </a>
              . Kompleks candi ini merupakan Situs Warisan Dunia UNESCO dan
              menampilkan ukiran yang menggambarkan kisah-kisah dari epik Hindu
              seperti Ramayana.
            </p>
          </div> */}
        </>
      )}
    </div>
  );
}
