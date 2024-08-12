import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";
import { FormPopover } from "@/components/form/form-popover";

function Navbar() {
  return (
    <nav className="fixed z-50 top-0 px-4  w-full h-14 border-b shadow-sm bg-white flex items-center ">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <FormPopover align="start" slide="bottom" sideOffset={18}>
          <Button
            variant={"primary"}
            className="rounded-sm hidden md:block h-auto py-1.5 px-2"
            size={"sm"}
          >
            Create
          </Button>
        </FormPopover>
          <FormPopover align="start" slide="bottom" sideOffset={18}>
        <Button variant={"primary"} className="rounded-sm bloack md:hidden">
            <Plus className="h-4 w-4" />
        </Button>
          </FormPopover>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={"/organization/:id"}
          afterLeaveOrganizationUrl="/organization/:id"
          afterSelectOrganizationUrl={"/organization/:id"}
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
}

export default Navbar;
