import React from "react";
export default function Caption() {
  return (
    <div className="p-10">
      <p className="p-2 text-justify">
        Yogyakarta adalah salah satu kota di Indonesia yang terkenal dengan
        kekayaan budaya dan sejarahnya. Sebagai ibu kota Daerah Istimewa
        Yogyakarta, kota ini juga menjadi pusat pendidikan dan seni di
        Indonesia. Yogyakarta sering disebut sebagai "Kota Pelajar" karena
        keberadaan banyak universitas dan lembaga pendidikan yang berkualitas.
      </p>

      <p className="p-2 text-justify">
        Sebelum dikenal sebagai Yogyakarta, daerah ini merupakan bagian dari
        Kerajaan Mataram yang memiliki sejarah panjang sejak abad ke-16. Pada
        tahun 1755, setelah terjadinya Perjanjian Giyanti, Yogyakarta resmi
        menjadi pusat kerajaan dan budaya Jawa, di mana Sultan Hamengkubuwono I
        menjadi sultan pertama.
      </p>

      <p className="p-2 text-justify">
        Yogyakarta memiliki banyak tempat wisata yang menarik, seperti Candi
        Ratu Boko dan Candi Prambanan yang merupakan warisan dunia UNESCO, serta
        Kraton Yogyakarta yang merupakan kediaman resmi sultan. Selain itu, kota
        ini juga dikenal dengan kerajinan batik, seni pertunjukan, dan kuliner
        khasnya seperti gudeg dan bakpia.
      </p>

      <p className="p-2 text-justify">
        Meskipun Yogyakarta adalah kota yang padat, banyak ruang terbuka hijau
        dan taman yang bisa dinikmati oleh pengunjung. Kehidupan malam yang
        vibrant juga ditawarkan dengan berbagai kafe, restoran, dan tempat
        hiburan yang menyajikan musik dan seni. Yogyakarta menjadi destinasi
        yang menarik bagi wisatawan yang ingin merasakan budaya dan keindahan
        alam Indonesia.
      </p>
      <div className="video-container mx-auto my-8 flex justify-center">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/kiHSKWIUP40?autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
