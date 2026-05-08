import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="border-4 border-foreground p-2 bg-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <SignIn 
          appearance={{
            layout: {
              helpPageUrl: "https://clerk.com",
              logoPlacement: "inside",
              shimmer: true
            },
            elements: {
              formButtonPrimary: "bg-foreground hover:bg-secondary text-sm font-bold uppercase tracking-widest rounded-none border-none",
              card: "rounded-none shadow-none border-none",
              headerTitle: "font-heading uppercase text-xl",
              headerSubtitle: "text-xs font-bold uppercase tracking-widest",
              socialButtonsBlockButton: "rounded-none border-2 border-foreground hover:bg-muted transition-colors",
              formFieldInput: "rounded-none border-2 border-border focus:border-foreground transition-colors",
              footerActionLink: "text-secondary font-bold hover:underline"
            }
          }}
          localization={{
            signIn: {
              start: {
                title: "Masuk ke Java Computer",
                subtitle: "Selamat datang kembali! Silakan masuk."
              }
            }
          }}
        />
      </div>
    </div>
  );
}
