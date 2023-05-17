import Header from "../components/header";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";

const Index = () => {
  return (
    <section className="w-full h-screen text-black-100 font-serif flex flex-col">
      <Header />
      <Sidebar />
      <Footer />
    </section>
  );
};

export default Index;
