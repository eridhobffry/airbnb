import { format } from "date-fns"
import { useRouter } from "next/dist/client/router"
import Footer from "../components/Footer"
import Header from "../components/Header"
import InfoCard from "../components/InfoCard"

const search = ({ searchResults }) => {
    const router = useRouter()
    const { location, startDate, endDate, numberOfGuests } = router.query
    const formattedStartDate = format(new Date(startDate), "dd MM yy")
    const formattedEndDate = format(new Date(endDate), "dd MM yy")
    const range = `${formattedStartDate} - ${formattedEndDate}`
    return <div>
        <Header placeholder={`${location} | ${range} | ${numberOfGuests} guests`} />
        <main className='flex'>
            <section className='flex-grow pt-6 px-14'>
                <p className='text-xs'>
                    300+ stays of {numberOfGuests} number of guests
                </p>
                <h1 className='text-3xl font-semibold mb-6'>
                    Stays in {location}
                </h1>
                <div className='hidden lg:inline-flex mb-6 space-x-2 text-gray-800 whitespace-nowrap'>
                    <p className='button'>Cancellation flexibility</p>
                    <p className='button'>Types of places</p>
                    <p className='button'>Rooms and beds</p>
                    <p className='button'>Prices</p>
                    <p className='button'>More filters</p>
                </div>
                <div className='flex flex-col'>
                {
                    searchResults?.map((s, i) => {
                        return <InfoCard key={i} {...s} />
                    })
                }
                </div>
            </section>
        </main>
        <Footer />
    </div>
}

export default search


export async function getServerSideProps() {
    const searchResults = await fetch("https://links.papareact.com/isz").then((res) => res.json())

    return {
        props: {
            searchResults,
        }
    }
}