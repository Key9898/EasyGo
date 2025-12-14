import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { useEffect } from 'react'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

L.Marker.prototype.options.icon = DefaultIcon

interface Location {
  key: string
  position: [number, number]
  name: string
  addressLines: string[]
  zIndexOffset: number
}

const locations: Location[] = [
  {
    key: 'head-office',
    position: [13.7569, 100.5659], // G Tower Grand Rama 9
    name: 'HEAD OFFICE (RAMA 9)',
    addressLines: [
      'Level 30, G Tower Grand Rama 9,',
      '9 Rama IX Road, Huai Khwang, Bangkok 10310.',
      '(MRT Phra Ram 9 - Exit 3)',
    ],
    zIndexOffset: 1000,
  },
  {
    key: 'fleet-center',
    position: [13.8083, 100.5589], // 123 Vibhavadi Rangsit Rd
    name: 'FLEET CENTER (VIBHAVADI)',
    addressLines: [
      '123 Vibhavadi Rangsit Rd, Soi 20,',
      'Chatuchak, Bangkok 10900.',
      '(Near Suntowers / 5 mins from Ladprao Intersection)',
    ],
    zIndexOffset: 0,
  },
]

function MapBounds() {
  const map = useMap()

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations.map((l) => l.position))
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [map])

  return null
}

interface MapSectionProps {
  className?: string
}

export default function MapSection({
  className = 'relative h-[400px] w-full rounded-xl z-0',
}: MapSectionProps) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-3xl lg:text-4xl font-bold text-orange-600">
          Get in touch
        </h3>
        <p className="mt-2 text-lg text-slate-700">
          We are ready to assist with bookings, inquiries, and partnership
          opportunities. You can contact us by filling out the form, or check
          the map guide to visit our head office and fleet center in person.
        </p>
      </div>
      <div
        className={`isolate overflow-hidden shadow-lg border border-slate-200 ${className}`}
      >
        <MapContainer
          center={[13.7826, 100.5624]} // Midpoint roughly, handled by MapBounds
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
          <TileLayer
            url={'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'}
            maxZoom={20}
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            attribution={'&copy; Google Maps'}
          />
          <MapBounds />
          {locations.map((loc) => (
            <Marker
              key={loc.key}
              position={loc.position}
              zIndexOffset={loc.zIndexOffset}
              eventHandlers={{
                mouseover: (e) => {
                  e.target.openPopup()
                },
              }}
            >
              <Popup>
                <div className="font-sans text-sm text-slate-800">
                  <div className="font-bold mb-1">📍 {loc.name}</div>
                  {loc.addressLines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
