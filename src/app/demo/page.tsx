import { ThemeToggle } from "@/components/ui/curtain-theme-toggle";

export default function DemoPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[400px] gap-4 p-20 bg-background text-foreground">
       <h1 className="font-heading text-4xl uppercase mb-4">Curtain Theme Toggle Demo</h1>
       <p className="text-sm opacity-60 mb-8">Click the button below to see the curtain animation.</p>
       
       <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-black/5 dark:border-white/10 flex flex-col items-center gap-4">
          <ThemeToggle variant="icon" defaultTheme="light" duration={600} />
          <p className="text-xs font-bold uppercase tracking-widest mt-2">Toggle Icon</p>
       </div>

       <div className="mt-20 w-full max-w-4xl border-2 border-foreground overflow-hidden">
          <ThemeToggle variant="appbar" appBarProps={{
            appName: "Java Computer",
            userName: "Admin User",
            onSearch: (q) => console.log(q)
          }}>
            <div className="p-10 text-center">
               <h2 className="text-2xl font-bold mb-4">AppBar Variant</h2>
               <p>This layout includes a full navigation bar with search and user profile.</p>
            </div>
          </ThemeToggle>
       </div>
    </div>
  );
}
