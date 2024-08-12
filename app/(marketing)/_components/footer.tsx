import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className=" bottom-0 w-full bg-slate-200 border-t">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Logo />
        </div>

        <div className="mt-4 md:mt-0 flex space-x-4">
          <Button size="sm" variant="ghost">
            Privacy Policy
          </Button>
          <Button size="sm" variant="ghost">
            Terms of Service
          </Button>
        </div>
      </div>
    
    </footer>
  );
};
