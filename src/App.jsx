import Header from "./Header"; // Mengimpor Header dari file terpisah
import "./App.css";
import Title from "./Title";
import Content from "./Content";

export default function App() {
  return (
    <>
      <Header />  {/* Menggunakan komponen Header */}
      <Title/>
      <Content/>
    </>
  );
}
