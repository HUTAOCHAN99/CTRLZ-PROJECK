import { RiTimeLine, RiCalendarScheduleLine, RiCoupon3Line } from "@remixicon/react"

export default function DInformation() {
  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        Jam Buka dan Biaya - Candi Prambanan
      </h2>

      {/* Bagian Jam Buka */}
      <div className="mb-4">
        <div className="flex items-center text-lg font-semibold mb-2">
          <RiTimeLine className="mr-2 text-xl" />
          <span>Jam Buka</span>
        </div>
        <p>Kompleks Utama: 06:00 hingga 17:00</p>
        <p>Area Candi: Selalu buka</p>
      </div>

      <hr className="border-t my-4" />

      {/* Bagian Hari Tutup */}
      <div className="mb-4">
        <div className="flex items-center text-lg font-semibold mb-2">
          <RiCalendarScheduleLine className="mr-2 text-xl"/>
          <span>Hari Tutup</span>
        </div>
        <p>Tidak ada hari tutup</p>
      </div>

      <hr className="border-t my-4" />

      {/* Bagian Biaya Masuk */}
      <div className="mb-4">
        <div className="flex items-center text-lg font-semibold mb-2">
          <RiCoupon3Line className="mr-3 text-xl"/>
          <span>Biaya Masuk</span>
        </div>
        <p>IDR 50.000 (WNI) / IDR 350.000 (WNA)</p>
      </div>
    </div>
  );
}
