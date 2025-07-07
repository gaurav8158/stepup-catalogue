// components/TermsAndConditionsAlert.jsx
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,

  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";

export default function BuyTermsAndConditionsAlert() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="text-blue-600 underline text-sm hover:text-blue-800 ml-1"
        >
          View T&C
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-[90vh]">
        <AlertDialogHeader className="text-left">
          <AlertDialogCancel className="absolute top-3 right-3">
            <X />
          </AlertDialogCancel>
          <AlertDialogTitle>Terms & Conditions</AlertDialogTitle>
          <AlertDialogDescription className="max-h-[72vh] overflow-y-auto space-y-4 text-sm leading-relaxed">
            <p>
              <strong>Introduction</strong>
              <br />
              These terms and conditions (“Buyer Terms”) govern the purchase of
              items of used school uniforms (“Items”) on the electronic platform
              (the “Platform”) operated by Vibrant Venture LLC-FZ (trading under
              the brand name of Step<sup>up</sup>). By agreeing to purchase a
              used uniform (the “Item”), you agree to be bound by these Buyer
              Terms and any other relevant rules or guidelines established by
              Step<sup>up</sup>.
            </p>

            <p>
              <strong>1. Product Condition</strong>
              <br />
              All Items sold on the Platform are pre-owned and may show signs of
              wear. The product descriptions and images provided will outline
              the condition of the Items. Please inspect the photographs
              carefully before purchase.
            </p>

            <p>
              <strong>2. Sizing and Fit</strong>
              <br />
              It is the responsibility of the buyer to check the sizing
              information provided. We encourage you to review all the details
              carefully. We cannot guarantee the fit of the Item, and we are not
              responsible for Items that do not fit once purchased.
            </p>

            <p>
              <strong>3. Price and Payment</strong>
              <br />
              All prices listed for the Item on the Platform are final. Payments
              must be made in full at the time of purchase, in advance of the
              delivery of the Item. The Platform shall specify the accepted
              payment methods from time to time.
            </p>

            <p>
              <strong>4. Shipping and Delivery</strong>
              <br />
              Once the payment has been received, we will process and ship the
              Item. We aim to ship the Item within two (2) working days of
              receiving the payment, but delivery times may vary depending on
              the Buyer’s location.
            </p>

            <p>
              <strong>5. Returns and Refunds</strong>
              <br />
              As these items are pre-used and sold on “as is” basis, returns and
              exchanges are not accepted.
            </p>

            <p>
              <strong>6. No Warranty</strong>
              <br />
              The Items are sold as-is, without any warranties, either express
              or implied. We do not guarantee the longevity or durability of the
              Items.
            </p>

            <p>
              <strong>7. Hygiene and Cleaning</strong>
              <br />
              It is recommended that all Items be professionally cleaned before
              use. We do not take responsibility for any cleaning or sanitising
              of Items prior to sale.
            </p>

            <p>
              <strong>8. No Liability</strong>
              <br />
              Step<sup>up</sup> disclaims, to the maximum extent permissible by
              law, any liability to the Buyer or any other party as a result of
              the use of and/or the purchase of any Item on the Platform.
            </p>

            <p>
              <strong>9. Governing Law</strong>
              <br />
              The Buyer Terms shall be interpreted in accordance with the
              provisions of the laws of the United Arab Emirates. The courts in
              Dubai shall have the jurisdiction over any disputes arising from
              the use of the Platform.
            </p>

            <p>
              <strong>10. Modifications to Buyer Terms</strong>
              <br />
              Step<sup>up</sup> reserves the right to modify these Buyer Terms
              at any time. The Buyers shall be notified about the changes and,
              by continuing to access or utilise the Platform, the Buyer is
              deemed to have agreed to the updated Buyer Terms.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter> */}
      </AlertDialogContent>
    </AlertDialog>
  );
}
