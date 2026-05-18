import Header from "./components/Header";
import Hero from "./components/Hero";
import S2Identity from "./components/S2Identity";
import S3Pain from "./components/S3Pain";
import S4Wound from "./components/S4Wound";
import S5Solution from "./components/S5Solution";
import S6Proof from "./components/S6Proof";
import S7Bridge from "./components/S7Bridge";
import S8Future from "./components/S8Future";
import S9FAQ from "./components/S9FAQ";
import S10Plans from "./components/S10Plans";
import Footer from "./components/Footer";

// page composition entry
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <S2Identity />
        <S3Pain />
        <S4Wound />
        <S5Solution />
        <S6Proof />
        <S7Bridge />
        <S8Future />
        <S9FAQ />
        <S10Plans />
      </main>
      <Footer />
    </>
  );
}
