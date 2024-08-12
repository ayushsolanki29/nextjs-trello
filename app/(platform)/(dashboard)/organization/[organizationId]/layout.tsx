import { auth } from "@clerk/nextjs/server";
import { OrgControll } from "./_components/org-controll";
import { title } from "process";
import { startCase } from "lodash";

export async function generateMetadata() {
  const { orgSlug } = auth();
  return {
    title: startCase(orgSlug || "organazation"),
  };
}

const OrganizationIDLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControll />

      {children}
    </>
  );
};
export default OrganizationIDLayout;
