import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import AgeVerificationWrapper from "components/AgeVerificationWrapper"
import Features from "components/features"
import IqosDeviceSection from "components/how-to-use"
import IcosDeviceShowcase from "components/icos-device-showcase"
import IllumaAd from "components/illuma-ad"
import IllumaProducts from "components/illuma-products"
import LiquorShowcase from "components/liquor-showcase"
import CustomerTestimonials from "components/testimonials"
import ZYNProductsShowcase from "components/zyn-products-showcase"

export default async function Home({
  params,
}: {
  params: { countryCode: string }
}) {
  const { countryCode } = params

  const region = await getRegion(countryCode)
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  return (
    <>
      <AgeVerificationWrapper>
        <Hero />
        <IllumaAd
          src="https://res.cloudinary.com/do9wvb32d/video/upload/v1775184129/iqos_iluma_ad_1_c8hd3h.mp4"
          poster="/images/video-thumbnail.jpg" // optional
        />

        <Features />
        {/* <IllumaProducts />  */}
        {collections && region ? (
          <div className="component-px py-8 ">
            <div className="flex flex-col items-center gap-2 text-center">
              <h2 className="text-base md:text-xl lg:text-3xl font-bold text-gray-900">
                The Collection
              </h2>
              <p className="text-sm md:text-base text-gray-400">
                Where fine spirits meet premium smoke.
              </p>
            </div>
            <ul className="flex flex-col gap-x-6">
              <FeaturedProducts region={region} />
            </ul>
          </div>
        ) : (
          <p>No collections or region found</p>
        )}
        <IcosDeviceShowcase />
        <ZYNProductsShowcase />
        <LiquorShowcase />
        <IqosDeviceSection />
        {/* <CustomerTestimonials />  */}
      </AgeVerificationWrapper>
    </>
  )
}
