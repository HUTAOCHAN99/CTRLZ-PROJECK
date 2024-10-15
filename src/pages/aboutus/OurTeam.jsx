import { useState, useRef } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import teamLogo from "@/img/logo_team.jpg";
import member1 from "@/img/m-1.jpg";
import member2 from "@/img/m-2.jpg";
import member3 from "@/img/m-3.jpg";
import "/src/pages/aboutus/OutTeam.css";
export default function OurTeam() {
  const [isExpanded, setIsExpanded] = useState(false);
  const meetOurTeamRef = useRef(null);

  const handleButtonClick = () => {
    setIsExpanded((prev) => {
      const newExpandedState = !prev;

      if (newExpandedState) {
        setTimeout(() => {
          meetOurTeamRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 500);
      } else {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 500);
      }
      return newExpandedState;
    });
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gray-100 mt-16 relative ${
        isExpanded ? "pt-32 pb-32" : "pt-16 pb-16"
      }`}
    >
      {/* Bagian About Us */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl">
        <div className="w-full md:w-[40%] text-center mb-8 md:mb-0">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About Us</h2>
          <div className="flex items-center justify-center">
            <img
              src={teamLogo}
              alt="Team Logo"
              className="w-xl rounded-xl shadow-lg"
              style={{
                boxShadow:
                  "inset 5px 5px 10px rgba(0, 0, 0, 0.3), inset -5px -5px 10px rgba(255, 255, 255, 0.3)",
              }}
            />
          </div>
        </div>
        <div className="w-full md:w-[40%] text-left">
          <blockquote className="text-gray-800 italic border-l-4 border-gray-300 pl-4 my-6">
            CTRLZ adalah tim yang menggambarkan konsep melihat ke belakang untuk
            mengevaluasi kesalahan yang telah dibuat, sejalan dengan fungsi
            tombol keyboard Ctrl + Z. Terkadang, melihat ke belakang tidak
            selalu merupakan hal yang negatif, karena dengan merenungkan masa
            lalu, kita dapat memperbaiki kesalahan dan belajar dari pengalaman
            tersebut.
          </blockquote>
        </div>
      </div>

      <button
        onClick={handleButtonClick}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-gray-800 text-3xl hover:text-gray-600 transition duration-300 flex items-center"
      >
        <i className={`fas fa-chevron-${isExpanded ? "up" : "down"} mr-2`}></i>
        {isExpanded ? "Tutup Tim" : "Lihat Tim"}
      </button>

      <div
        className={`w-full max-w-8xl mt-8 transition-opacity duration-500 ease-in-out ${
          isExpanded ? "open" : "close"
        }`}
      >
        <h3
          ref={meetOurTeamRef}
          className="text-3xl font-semibold text-gray-800 mb-6 text-center"
        >
          Meet Our Team
        </h3>
        {isExpanded && (
          <div className="flex flex-col space-y-4">
            {/* {Zhofir} */}
            <div className="member w-full h-full flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-4">
              <div className="w-full md:w-1/2 flex items-center justify-center mb-4 md:mb-0">
                <img
                  src={member1}
                  alt="Member 1"
                  className="w-full h-3/4 object-cover rounded-md"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center">
                <h4 className="text-xl font-bold text-gray-800">
                  Ahmad Zhofir Amanullah Nayif
                </h4>
                <p className="text-gray-600">
                  Universitas Pembangunan Nasional "Veteran" Yogyakarta
                </p>
                <p className="text-gray-600">Ketua Tim</p>
                <p className="text-gray-600">Front End Developer</p>
                <h4 className="text-center justify-center font-bold mt-3">
                  Contact me
                </h4>

                <div className="mt-2 flex justify-center space-x-4 bg-slate-600 rounded-lg p-4">
                  <a
                    href=" https://www.instagram.com/ahmad_zhofir_a_nayif/profilecard/?igsh=MWU3aWc2ejRoenBueA==
"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-300"
                  >
                    <i className="fab fa-instagram fa-2x"></i>
                  </a>
                  <a
                    href="https://www.facebook.com/ahmad.z.an.75457?mibextid=ZbWKwL
"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-300"
                  >
                    <i className="fab fa-facebook fa-2x"></i>
                  </a>
                  
                  <a
                    href="https://github.com/HUTAOCHAN99
"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-300"
                  >
                    <i className="fab fa-github fa-2x"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ahmad-zhofir-amanullah-nayif-56130a285?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app "
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-300"
                  >
                    <i className="fab fa-linkedin fa-2x"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* {Levi} */}
            <div className="member w-full h-full flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-4">
              <div className="w-full md:w-1/2 flex items-center justify-center mb-4 md:mb-0">
                <img
                  src={member2}
                  alt="Member 2"
                  className="w-full h-3/4 object-cover rounded-md"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center">
                <h4 className="text-xl font-bold text-gray-800">
                  Levi Rizki Saputra
                </h4>
                <p className="text-gray-600">
                  Universitas Pembangunan Nasional "Veteran" Yogyakarta
                </p>
                <p className="text-gray-600">Anggota Tim</p>
                <p className="text-gray-600">Full Stack Developer</p>
                <h4 className="text-center justify-center font-bold mt-3">
                  Contact me
                </h4>

                <div className="mt-2 flex justify-center space-x-4 bg-slate-600 rounded-lg p-4">
                  <a
                    href="https://www.instagram.com/levirs565?igsh=MXR0c2c2N2MzajEybQ==
"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-300"
                  >
                    <i className="fab fa-instagram fa-2x"></i>
                  </a>
                  
                  <a
                    href="https://github.com/levirs565 "
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-300"
                  >
                    <i className="fab fa-github fa-2x"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/levirs565?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app
"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-300"
                  >
                    <i className="fab fa-linkedin fa-2x"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Hafid */}
            <div className="member w-full h-full flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-4">
              <div className="w-full md:w-1/2 flex items-center justify-center mb-4 md:mb-0">
                <img
                  src={member3}
                  alt="Member 3"
                  className="w-full h-3/4 object-cover rounded-md"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center">
                <h4 className="text-xl font-bold text-gray-800">
                  Hafid Dwi Saputra
                </h4>
                <p className="text-gray-600">
                  Universitas Pembangunan Nasional "Veteran" Yogyakarta
                </p>
                <p className="text-gray-600">Anggota Tim</p>
                <p className="text-gray-600">Front end Developer</p>
                <h4 className="text-center justify-center font-bold mt-3">
                  Contact me
                </h4>

                <div className="mt-2 flex justify-center space-x-4 bg-slate-600 rounded-lg p-4">
                  <a
                    href="https://www.instagram.com/hadstra?igsh=MXJxcDVsMzQ4YWo1cQ%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-300"
                  >
                    <i className="fab fa-instagram fa-2x"></i>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=100014185997586&mibextid=ZbWKwL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-300"
                  >
                    <i className="fab fa-facebook fa-2x"></i>
                  </a>
                  {/* Mau gk sertakan yt? */}
                  <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-300"
                  >
                    <i className="fab fa-youtube fa-2x"></i>
                  </a>
                  <a
                    href="https://github.com/hafid89"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-300"
                  >
                    <i className="fab fa-github fa-2x"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
