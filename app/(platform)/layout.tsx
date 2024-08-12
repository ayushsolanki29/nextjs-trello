import { ModalProviders } from "@/components/providers/model-providers";
import { QueryProvider } from "@/components/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
const PlatfromLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider afterSignOutUrl={"/"}>
      <QueryProvider>
        <Toaster />
        <ModalProviders />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};
export default PlatfromLayout;
