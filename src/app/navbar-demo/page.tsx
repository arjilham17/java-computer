import { Navbar1Demo } from "@/components/blocks/demo";

export default function NavbarDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar1Demo />
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Navbar 1 Integrated Successfully</h1>
        <p className="text-muted-foreground">This is a demonstration of the integrated Shadcnblocks Navbar.</p>
      </div>
    </div>
  );
}
