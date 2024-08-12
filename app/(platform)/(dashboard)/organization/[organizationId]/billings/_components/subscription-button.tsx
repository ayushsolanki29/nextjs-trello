"use client";

import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useProModal } from "@/hooks/use-pro-modal";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface SubscriptionButtonProps {
  isPro: boolean;
}
const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const proModal = useProModal();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const handleBuyPro = () => {
    if (isPro) {
      execute({});
    } else {
      proModal.onOpen();
    }
  };
  return (
    <Button
      onClick={handleBuyPro}
      disabled={isLoading}
      className="md:w-auto w-full"
    >
      {isPro ? "Manage subscription" : "Upgrade to Pro"}&nbsp;&nbsp;
      {isPro && <ArrowRight size={14} />}
    </Button>
  );
};

export default SubscriptionButton;
