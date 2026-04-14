export default function ReturnPolicy() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 font-sans">
      <div className="border-b border-gray-300 pb-4 mb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-1">
          Return Policy — Liqnic
        </p>
        <p className="text-xs text-gray-400">
          Operated by Khirkhirya Enterprises Pvt. Ltd. · Applies to all
          purchases made on this site
        </p>
      </div>

      <p className="text-xs leading-relaxed text-gray-600 mb-6">
        This policy outlines the conditions under which returns, replacements,
        and cancellations are accepted for purchases made on Liqnic, operated by
        Khirkhirya Enterprises Pvt. Ltd.
      </p>

      {[
        {
          title: "1. Return",
          content: (
            <>
              <p>
                A <strong>return</strong> is defined as the action of giving
                back an item purchased from Liqnic. Returns may be accepted
                under the following circumstances:
              </p>
              <ul className="list-disc ml-4 mt-1 space-y-1">
                <li>The item received was defective.</li>
                <li>
                  The item was damaged during the shipping or delivery process.
                </li>
                <li>The wrong item was delivered.</li>
                <li>An item was missing from the order.</li>
              </ul>
              <p className="mt-2">
                <strong>Please note:</strong>
              </p>
              <ul className="list-disc ml-4 mt-1 space-y-1">
                <li>
                  Khirkhirya Enterprises Pvt. Ltd. may accept returns at its
                  sole discretion, irrespective of this policy.
                </li>
                <li>
                  If a return request is declined, the Buyer may file a dispute
                  under the Buyer Protection Program.
                </li>
                <li>
                  Buyers are encouraged to review the listing carefully before
                  purchasing. Orders placed for the wrong item will not be
                  eligible for return or refund.
                </li>
                <li>
                  Return requests must be raised within{" "}
                  <strong>48 hours</strong> of payment realization.
                </li>
                <li>
                  On certain promotional or special sales, separate policies may
                  apply as specified by Khirkhirya Enterprises Pvt. Ltd.
                </li>
              </ul>
              <p className="mt-2">
                If a return is accepted, the Buyer must return the product in
                its original condition. The refund will then be credited to the
                Buyer's account.
              </p>
            </>
          ),
        },
        {
          title: "2. Replacement",
          content: (
            <>
              <p>
                A <strong>replacement</strong> is the process of exchanging a
                delivered item for another. A Buyer may request a replacement if
                the item was damaged in shipping, defective, incorrect, or if
                items were missing.
              </p>
              <p className="mt-2">
                <strong>Please note:</strong>
              </p>
              <ul className="list-disc ml-4 mt-1 space-y-1">
                <li>
                  Khirkhirya Enterprises Pvt. Ltd. may accept replacements at
                  its sole discretion, irrespective of this policy.
                </li>
                <li>
                  If a replacement request is declined, the Buyer may file a
                  dispute under the Buyer Protection Program.
                </li>
                <li>
                  Replacement requests must be raised within{" "}
                  <strong>48 hours</strong> of delivery.
                </li>
              </ul>
              <p className="mt-2">
                Once a replacement request is raised, the following process
                applies:
              </p>
              <ol className="list-decimal ml-4 mt-1 space-y-1">
                <li>
                  The Buyer will be asked to provide a reason for the return
                  (e.g. damaged in shipping, defective item, missing item, wrong
                  item sent, price discrepancy).
                </li>
                <li>
                  Khirkhirya Enterprises Pvt. Ltd. will review the request and
                  provide either approval or rejection.
                </li>
                <li>
                  If approved, the Buyer must return the original product before
                  the replacement is dispatched.
                </li>
                <li>
                  If rejected, the Buyer may raise a dispute by writing to{" "}
                  <strong>info@liqnic.com</strong>.
                </li>
                <li>
                  The original invoice must be presented at the time of return
                  or replacement.
                </li>
              </ol>
              <p className="mt-2">
                If the requested replacement product is unavailable, Khirkhirya
                Enterprises Pvt. Ltd. may offer a refund in lieu of replacement,
                which the Buyer shall be obligated to accept.
              </p>
            </>
          ),
        },
        {
          title: "3. Cancellation",
          content: (
            <p>
              If you wish to cancel an order, please contact our customer care
              at least <strong>1 hour before</strong> the scheduled delivery
              time.
            </p>
          ),
        },
      ].map(({ title, content }) => (
        <div key={title} className="mb-5">
          <p className="text-xs font-medium uppercase tracking-widest text-gray-600 border-b border-gray-200 pb-1 mb-2">
            {title}
          </p>
          <div className="text-xs leading-relaxed text-gray-600 space-y-1">
            {content}
          </div>
        </div>
      ))}

      <div className="border-t border-gray-200 mt-6 pt-4">
        <p className="text-xs text-gray-400">
          For return or replacement queries, contact us within the stipulated
          timeframe. · Khirkhirya Enterprises Pvt. Ltd. reserves all rights
          under applicable law.
        </p>
      </div>
    </div>
  )
}
