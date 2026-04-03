import React from "react"

// Terms & Conditions Page Component
export default function TermsAndConditions() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-center border-b pb-4">
        Terms & Conditions
      </h1>

      <div className="space-y-6 leading-relaxed text-justify">
        <p>
          Welcome to <strong>Liqnic</strong>. By accessing our website and purchasing our products,
          you agree to be bound by the following terms and conditions. Please read them carefully.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Age Verification &amp; Legal Compliance</h2>
          <p>
            By using this website, you represent and warrant that you are at least 18 years of age
            (for e-cigarette and alcohol/whiskey), the legal smoking and drinking age as defined by
            the Government of Nepal.
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>
              <strong>Verification:</strong> We employ a strict age-verification process. You may be
              required to present a valid Government issued ID (Citizenship, Passport, or License)
              upon delivery. Failure to provide ID will result in a cancelled order without a refund
              of delivery fees.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. Products and Pricing</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>
              <strong>Inventory:</strong> We make every effort to display the colors and images of
              our products accurately. However, we cannot guarantee that your monitor's display will
              be exact.
            </li>
            <li>
              <strong>Pricing:</strong> All prices are listed in Nepalese Rupees (NPR) and are
              inclusive of applicable taxes unless stated otherwise. We reserve the right to change
              prices without prior notice.
            </li>
            <li>
              <strong>Prohibitions:</strong> Products are for personal use only. Reselling products
              purchased from this site without a valid wholesale license is strictly prohibited.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">3. No Refund and No Exchange Policy</h2>
          <p>
            Due to the consumable and sensitive nature of our products (tobacco, hardware, and
            spirits), we maintain a <strong>Strict No Refund and No Exchange Policy</strong>.
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>
              <strong>Final Sale:</strong> All purchases are final. Once a product has been
              dispatched or the seal has been broken, we cannot accept returns for hygiene and
              safety reasons.
            </li>
            <li>
              <strong>Exceptions:</strong> The only exception to this rule is if you receive an
              item that is physically damaged upon arrival or if the wrong product was sent. In such
              cases, you must notify us within 2 hours of delivery with photographic evidence.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Shipping and Delivery</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>
              <strong>Locations:</strong> We deliver all over Nepal.
            </li>
            <li>
              <strong>Timelines:</strong> While we aim for prompt delivery, we are not responsible
              for delays caused by roadblocks, strikes (bandhs), or extreme weather conditions.
            </li>
            <li>
              <strong>Delivery Fees:</strong> Shipping costs are calculated at checkout and are
              non-refundable.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">5. Order Cancellations</h2>
          <p>
            Orders can be canceled within 12 hours of placement if they haven't been processed or
            shipped.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Delivery Conditions</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>
              <strong>Proof of Identity:</strong> Goods will only be handed over to the person who
              placed the order and can prove their age.
            </li>
            <li>
              <strong>Refusal of Service:</strong> We reserve the right to refuse service to
              anyone, at any time, especially in cases where the customer appears intoxicated or
              underage at the point of delivery.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            7. Accuracy of Billing and Account Information
          </h2>
          <p>
            You agree to provide current, complete, and accurate purchase and account information
            for all purchases made on our website. We are not responsible for delivery failures due
            to incorrect addresses or contact numbers provided by the customer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">8. Health Warning and Liability</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>
              <strong>Health Risk:</strong> Consumption of alcohol and tobacco/nicotine products is
              injurious to health. By purchasing, you acknowledge the risks associated with these
              products.
            </li>
            <li>
              <strong>Limitation of Liability:</strong> Liqnic shall not be held liable for any
              health complications, accidents, or misuse resulting from the consumption or operation
              of products sold on this site.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">9. Prohibited Uses</h2>
          <p>You are prohibited from using the site or its content:</p>
          <ol className="list-decimal ml-6 mt-2 space-y-1">
            <li>For any unlawful purpose.</li>
            <li>To solicit others to perform or participate in any unlawful acts.</li>
            <li>To violate any international or local Nepalese regulations, rules, or laws.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">10. Compliance with Nepalese Law</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>
              <strong>Taxation:</strong> All prices listed are inclusive of applicable VAT and
              Excise duties as mandated by the Government of Nepal.
            </li>
            <li>
              <strong>Prohibited Sales:</strong> We do not ship to areas where the sale of alcohol
              or nicotine products is restricted by local municipality bylaws.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">11. Changes to Terms and Conditions</h2>
          <p>
            We reserve the right to update, change, or replace any part of these Terms and
            Conditions at our sole discretion.
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>
              <strong>Responsibility:</strong> It is your responsibility to check this page
              periodically for changes.
            </li>
            <li>
              <strong>Immediate Effect:</strong> Amendments will take effect immediately upon
              posting to the website.
            </li>
            <li>
              <strong>Acceptance:</strong> Your continued use of or access to the website following
              the posting of any changes constitutes acceptance of those changes. This is
              particularly relevant as local laws in Nepal regarding Excise Duty and Tobacco Control
              frequently evolve.
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}