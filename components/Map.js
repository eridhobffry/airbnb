import { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import * as geolib from 'geolib'

const Map = ({ searchResults }) => {

    const [selectedLocation, setSelectedLocation] = useState({})

    const coordinates = searchResults.map(i => {
        return {
            longitude: i.long,
            latitude: i.lat
        }
    })

    const center = geolib.getCenter(coordinates)

    const [viewport, setViewport] = useState({
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    });
    return <ReactMapGL
        {...viewport}
        mapStyle='mapbox://styles/eridhobffry/ckwxhnzoo8pq915o3ni5s0eoe'
        mapboxApiAccessToken={process.env.mapbox_key}
        onViewportChange={(viewport) => setViewport(viewport)}
        width='100%'
        height='100%'
    >
        {searchResults.map((s, i) => (
            <div key={i}>
                <Marker
                    longitude={s.long}
                    latitude={s.lat}
                    offsetLeft={-20}
                    offsetTop={-10}
                >
                    <p role='img' aria-label='push-pin' onClick={() => setSelectedLocation(s)} className='text-2xl cursor-pointer animate-bounce'>
                        😁
                    </p>
                </Marker>
                {selectedLocation.long === s.long && <Popup closeOnClick={true} onClose={() => setSelectedLocation({})} latitude={s.lat} longitude={s.long}>
                    {s.title}
                </Popup>}
            </div>
        ))}
    </ReactMapGL>
}

export default Map
