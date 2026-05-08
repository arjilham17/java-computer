import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </ClerkProvider>
  );
}
