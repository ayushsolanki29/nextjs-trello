import { checkSubscription } from "@/lib/subscription";
import { Info } from "../_components/info";
import { Separator } from "@/components/ui/separator";
import SubscriptionButton from "./_components/subscription-button";
import Plans from "./_components/plans";

const BillingPage = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2" />
      
      <h2 className="text-xl flex gap-2 font-medium text-gray-700">
        Your Current Plan  <p className="text-sm text-gray-500">
        {isPro? "Pro" : "Free"} Plan
      </p>
      </h2>
      <br />
      <SubscriptionButton isPro={isPro} />
      <Plans isPro={isPro}/>
    </div>
  );
};

export default BillingPage;
