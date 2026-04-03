// Privacy Policy Page Component
export default function PrivacyPolicy() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-center border-b pb-4">
        Privacy Policy
      </h1>

      <div className="space-y-6 leading-relaxed">
        <p>
          This Privacy Policy describes how your personal information is
          collected, used, and shared when you visit or make a purchase from{" "}
          <strong>Liqnic</strong>.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            1. Personal Information We Collect
          </h2>
          <p>
            When you make a purchase or attempt to make a purchase through the
            site, we collect certain information from you, including:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>
              <strong>Identity Data:</strong> Name, date of birth, and copies of
              Government issued IDs (for age verification only).
            </li>
            <li>
              <strong>Contact Data:</strong> Billing address, delivery address,
              email address, and phone number.
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, browser type, and
              cookies to improve your shopping experience.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            2. How We Use Your Information
          </h2>
          <p>We use the Order Information generally to:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>
              Fulfill any orders placed through the Site (including processing
              payment and arranging for shipping).
            </li>
            <li>
              Verify your age to comply with Nepalese laws regarding the sale of
              restricted goods.
            </li>
            <li>
              Communicate with you regarding order status or promotional offers
              (if opted-in).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            3. Data Sharing &amp; Security
          </h2>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>
              <strong>Third Parties:</strong> We share your Personal Information
              with third parties only to help us use your Personal Information
              as described above (e.g., our delivery partners and payment
              gateways like eSewa/Khalti).
            </li>
            <li>
              <strong>Legal Compliance:</strong> We may share your information
              to comply with applicable laws and regulations in Nepal, or to
              respond to a subpoena or lawful request for information we
              receive.
            </li>
            <li>
              <strong>Security:</strong> We implement industry-standard
              encryption to protect your data. However, no method of
              transmission over the internet is 100% secure.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Data Retention</h2>
          <p>
            When you place an order through the site, we will maintain your
            Order Information for our records unless and until you ask us to
            delete this information, subject to our legal obligations to keep
            records of restricted sales.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            5. Consent &amp; Electronic Acceptance
          </h2>
          <p>
            By clicking <strong>"Checkout,"</strong> <strong>"I Agree,"</strong>{" "}
            or by completing a purchase, you acknowledge that you have read,
            understood, and agreed to be bound by these Terms and Conditions and
            the Privacy Policy in their entirety.
          </p>
        </section>
      </div>
    </div>
  )
}
