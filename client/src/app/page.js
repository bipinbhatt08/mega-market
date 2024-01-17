'use client'
import NavBar from "@/components/navBar/page"
import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
export default function Home() {
  return (
    <>
      <Layout>
        <Section heading="Latest Listing" subHeading="Explore all the recently listed properties">
          <h1>Welcome to the site</h1>
          </Section>
      </Layout>
    </>
  )
}
