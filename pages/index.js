import Head from 'next/head'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Largecard from '../components/LargeCard'
import Mediumcard from '../components/MediumCard'
import Smallcard from '../components/SmallCard'

export default function Home({ exploreData, cardData }) {
  return (
    <div className="">
      <Head>
        <title>Rollian AirBnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* HEADER */}
      <Header />
      {/* BANNER */}
      <Banner />
      {/* CONTENT */}
      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>
            Explore nearby
          </h2>
          {/* pull some data from server */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {exploreData?.map((e, i) => {
            return <Smallcard key={i} img={e.img} location={e.location} distance={e.distance} />
          })}
          </div>
        </section>
        <section>
          <h2 className='text-4xl font-semibold py-8'>
            Live anywhere
          </h2>
          <div className='flex space-x-4 overflow-scroll scrollbar-hide'>
          {cardData?.map((c, i) => {
            return <Mediumcard key={i} img={c.img} title={c.title} />
          })}
          </div>
        </section>
        <Largecard
          img='https://links.papareact.com/4cj'
          title='The Greatest Outdoors'
          description='The Wishlists crated by Airbnb.'
          buttonText='Get inspired'
        />
      </main>
      {/* FOOTER */}
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp").then((res) => res.json())
  const cardData = await fetch("https://links.papareact.com/zp1").then((res) => res.json())
  return {
    props: {
      exploreData,
      cardData
    }
  }
}
