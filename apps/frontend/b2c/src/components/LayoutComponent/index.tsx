import Header from "./Header";
import Footer from "./Footer";

export function LayoutComponent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
