import { DealersPage } from "@/components/poseidon/dealers-page";
import { dealerDirectory, dealerProvinces } from "@/lib/dealer-directory";

export default function Dealers() {
  return <DealersPage dealers={dealerDirectory} provinces={dealerProvinces} />;
}
