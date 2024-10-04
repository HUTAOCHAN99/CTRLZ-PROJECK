import Header from "./Header"; // Mengimpor Header dari file terpisah
import "./App.css";
import Title from "./Title";
import Content from "./Content";
import Destination from "./Destination_Box";
import Destination_Box from "./Destination_Box";
import Footer from "./Footer";

export default function App() {
  return (
    <>
      <Header /> {/* Menggunakan komponen Header */}
      <Title />
      <Content />
      <Destination>
        <Destination_Box/>
      </Destination>
      <Footer/>
    </>
  );
}
