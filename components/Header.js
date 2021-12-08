import Image from 'next/image'
import { GlobeAltIcon, MenuIcon, SearchIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range'
import { useRouter } from 'next/dist/client/router';

const Header = ({placeholder}) => {
    const [searchInput, setSearchInput] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const router = useRouter()
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    }
    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }
    const resetInput = () => {
        setSearchInput('')
    }

    const search = () => {
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                numberOfGuests
            }
        })
    }
    return (<header className='flex flex-col sticky top-0 z-50 bg-white shadow-md p-5 md:px-10'>
        <div className='grid grid-cols-3'>
            {/* LEFT SECTION */}
            <div onClick={() => router.push('/')} className='relative flex items-center h-10 cursor-pointer my-auto'>
                <Image
                    src='https://links.papareact.com/qd3'
                    layout='fill'
                    objectFit='contain'
                    objectPosition='left'
                />
            </div>
            {/* MIDDLE SECTION */}
            <div className='flex items-center border-2 rounded-full py-2 md:shadow-sm'>
                <input placeholder={placeholder || 'Start your search'} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type='text' className='flex-grow w-full pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400' />
                <SearchIcon className='hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2' />
            </div>
            {/* RIGHT SECTION */}
            <div className='flex space-x-4 items-center justify-end text-gray-500'>
                <p className='hidden md:inline'>
                    Become a host
                </p>
                <GlobeAltIcon className='h-6' />
                <div className='flex items-center space-x-2 border-2 p-2 rounded-full'>
                    <MenuIcon className='h-6' />
                    <UserCircleIcon className='h-6' />
                </div>
            </div>
        </div>
        {
            searchInput && <div className='flex flex-col mx-auto col-span-3 w-full'>
                <DateRangePicker
                    ranges={[selectionRange]}
                    minDate={new Date()}
                    rangeColors={['#FD5B61']}
                    onChange={handleSelect}
                />
                <div className='flex items-center border-b mb-4'>
                    <h2 className='text-2xl font-semibold flex-grow'>
                        Number of Guests
                    </h2>
                    <UsersIcon className='h-5' />
                    <input value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} min={1} type='number' className='w-12 pl-2 outline-none text-lg text-red-400' />
                </div>
                <div className='flex'>
                    <button onClick={resetInput} className='flex-grow text-gray-500'>Cancel</button>
                    <button onClick={search} className='flex-grow text-red-400'>Search</button>
                </div>
            </div>
        }
    </header>
    )
}

export default Header
