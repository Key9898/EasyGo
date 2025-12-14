import type { ReactNode } from 'react'

export interface GuideCategory {
    id: string
    title: string
    description: string
    icon: 'key' | 'gas' | 'map' | 'shield'
    color: string
}

export interface GuideArticle {
    id: string
    category: string
    title: string
    summary: string
    image: string
    content: ReactNode // New field for modal content
}

export const guideCategories: GuideCategory[] = [
    {
        id: 'rental-101',
        title: 'Rental Basics',
        description: 'Required documents, deposit policies, and insurance coverage explained.',
        icon: 'key',
        color: 'orange'
    },
    {
        id: 'travel-inspiration',
        title: 'Travel Tips',
        description: 'Scenic drives, city cafe guides, and weekend nature escapes.',
        icon: 'map',
        color: 'green'
    },
    {
        id: 'safety-rules',
        title: 'Safety & Rules',
        description: 'Traffic regulations, parking rules, and 24/7 emergency contacts.',
        icon: 'shield',
        color: 'purple'
    },
    {
        id: 'vehicle-usage',
        title: 'Tech & Fuel',
        description: 'Fuel types, dashboard symbols, and Bluetooth connectivity guides.',
        icon: 'gas',
        color: 'blue'
    }
]

export const guideArticles: GuideArticle[] = [
    // Rental Basics
    {
        id: 'first-time-renter',
        category: 'rental-101',
        title: 'First Time Renter Tips',
        summary: 'Learn about local traffic regulations, required documents, and what to expect when picking up your car in Thailand.',
        image: '/Guide/first_time_renter_tips.png',
        content: `
            <div class="space-y-4">
                <p>Renting a car in Thailand is a great way to explore the country at your own pace. Here are some essential tips for first-timers:</p>
                <ul class="list-disc pl-5 space-y-2">
                    <li><strong>Drive on the Left:</strong> Thailand follows left-hand traffic rules (like the UK, Japan, Australia). The driver sits on the right side of the car.</li>
                    <li><strong>Use GPS:</strong> Google Maps and Waze work perfectly in Thailand. We recommend bringing a phone mount or renting a car with Apple CarPlay/Android Auto.</li>
                    <li><strong>Tollways:</strong> Bangkok has many tollways (Expressways). Have cash (40-100 THB) ready, or ask for an Easy Pass if available.</li>
                    <li><strong>Fuel Stations:</strong> Most stations are full-service (attendants pump for you). Just open the window and say "Full tank, 91/95/E20".</li>
                </ul>
            </div>
        `
    },
    {
        id: 'documents-checklist',
        category: 'rental-101',
        title: 'Documents Checklist',
        summary: 'Passport, Driving License (or IDP), and a valid Credit Card. Make sure you have these ready for a smooth pickup.',
        image: '/Guide/documents_checklist.png',
        content: `
            <div class="space-y-4">
                <p>To pick up your EasyGo rental, please ensure you have the following original documents:</p>
                <h4 class="font-bold text-slate-900">For Thai Nationals:</h4>
                <ul class="list-disc pl-5 space-y-1">
                    <li>Valid Thai National ID Card</li>
                    <li>Valid Thai Driving License</li>
                    <li>Credit Card for Security Deposit (Name must match the driver)</li>
                </ul>
                <h4 class="font-bold text-slate-900 mt-4">For International Visitors:</h4>
                <ul class="list-disc pl-5 space-y-1">
                    <li>Valid Passport</li>
                    <li>Valid Home Country Driving License (in English) OR International Driving Permit (IDP)</li>
                    <li>Credit Card for Security Deposit (Name must match the main driver)</li>
                </ul>
                <p class="text-sm text-slate-500 mt-4">*Note: We do not accept cash deposits or debit cards for the security deposit.</p>
            </div>
        `
    },
    {
        id: 'deposit-insurance',
        category: 'rental-101',
        title: 'Deposit & Insurance',
        summary: 'Understand our security deposit policy and comprehensive First-Class Insurance coverage for your peace of mind.',
        image: '/Guide/deposit_and_insurance.png',
        content: `
            <div class="space-y-4">
                <h4 class="font-bold text-slate-900">Security Deposit</h4>
                <p>A standard pre-authorization hold is placed on your credit card upon pickup. This is NOT a charge and is released automatically 5-7 days after the car is returned safely.</p>
                <ul class="list-disc pl-5 space-y-1">
                    <li>Eco/Compact Cars: 5,000 THB</li>
                    <li>Sedan/SUV: 10,000 THB</li>
                    <li>Luxury/Vans: 20,000 THB</li>
                </ul>
                <h4 class="font-bold text-slate-900 mt-4">Insurance Coverage</h4>
                <p>All EasyGo rentals come with Basic Insurance (CDW with excess). You can upgrade to:</p>
                <ul class="list-disc pl-5 space-y-1">
                    <li><strong>SCDW (No Excess):</strong> Covers all damage to the rental vehicle with 0 deductible.</li>
                    <li><strong>PA (Personal Accident):</strong> Covers medical costs for driver and passengers.</li>
                    <li><strong>TP (Theft Protection):</strong> Covers vehicle theft loss.</li>
                </ul>
            </div>
        `
    },

    // Travel Tips
    {
        id: 'bangkok-hua-hin',
        category: 'travel-inspiration',
        title: 'Bangkok to Hua Hin',
        summary: 'A 3-hour scenic drive to the royal seaside town. Perfect for families. Recommended stops: Maeklong Railway Market.',
        image: '/Guide/bangkok_to_hua_hin.png',
        content: `
            <div class="space-y-4">
                <p><strong>Distance:</strong> ~200 km (3 hours) | <strong>Best Vehicle:</strong> SUV or Sedan</p>
                <p>Hua Hin offers a relaxed beach vibe with great night markets and seafood. It's a straight drive down Route 35 and Route 4.</p>
                <h4 class="font-bold text-slate-900">Suggested Itinerary:</h4>
                <ol class="list-decimal pl-5 space-y-2">
                    <li><strong>Stop 1:</strong> Maeklong Railway Market (The famous market on train tracks).</li>
                    <li><strong>Stop 2:</strong> Damnoen Saduak Floating Market (Morning is best).</li>
                    <li><strong>Lunch:</strong> Seafood at Cha-Am beach.</li>
                    <li><strong>Arrival:</strong> Check-in at Hua Hin. Visit Cicada Market in the evening.</li>
                </ol>
            </div>
        `
    },
    {
        id: 'cafe-hopping',
        category: 'travel-inspiration',
        title: 'Bangkok Cafe Hopping',
        summary: 'Navigate the narrow alleys of Ari and Thonglor to find hidden gems. Best explored with a compact car.',
        image: '/Guide/bangkok_cafe_hopping.png',
        content: `
            <div class="space-y-4">
                <p>Bangkok's cafe scene is world-class. Focus on these hip neighborhoods:</p>
                <h4 class="font-bold text-slate-900">1. Ari (Phahon Yothin 7)</h4>
                <p>Narrow pleasant streets with tons of greenery. Great for brunch and specialty coffee. Recommended Car: Hatchback or Compact.</p>
                <h4 class="font-bold text-slate-900">2. Thonglor (Sukhumvit 55)</h4>
                <p>Upscale, trendy spots. Parking can be tight, so look for "Valet Parking" signs or park at nearby community malls (like The Commons).</p>
                <h4 class="font-bold text-slate-900">3. Talat Noi</h4>
                <p>Old town charm by the river. Park at River City and walk to classic Chinese-style cafes.</p>
            </div>
        `
    },
    {
        id: 'kanchanaburi-trip',
        category: 'travel-inspiration',
        title: 'Kanchanaburi Nature Trip',
        summary: 'Visit the Bridge over the River Kwai and Erawan Waterfalls. A perfect weekend escape for nature lovers.',
        image: '/Guide/kanchanaburi_nature_trip.png',
        content: `
            <div class="space-y-4">
                <p><strong>Distance:</strong> ~130 km (2.5 hours) | <strong>Best Vehicle:</strong> Pickup or SUV</p>
                <p>Escape the concrete jungle into history and nature.</p>
                <h4 class="font-bold text-slate-900">Must-Visit Spots:</h4>
                <ul class="list-disc pl-5 space-y-2">
                    <li><strong>Bridge over the River Kwai:</strong> Historic WWII landmark.</li>
                    <li><strong>Erawan Waterfalls:</strong> 7-tiered beautiful blue waterfall. Bring swimwear!</li>
                    <li><strong>Hellfire Pass:</strong> Moving museum and walking trail.</li>
                </ul>
                <p class="text-sm mt-2"><em>Pro Tip: Leave Bangkok early (6-7 AM) to avoid traffic.</em></p>
            </div>
        `
    },

    // Safety & Rules
    {
        id: 'traffic-rules',
        category: 'safety-rules',
        title: 'Traffic Rules Guide',
        summary: 'Drive on the left. Speed limits: 50 km/h (city), 90 km/h (highway). Motorbikes are everywhere—stay alert!',
        image: '/Guide/traffic_rules_guide.png',
        content: `
            <div class="space-y-4">
                <h4 class="font-bold text-slate-900">Basic Rules</h4>
                <ul class="list-disc pl-5 space-y-1">
                    <li><strong>Left Side Driving:</strong> Always keep left. Overtake on the right.</li>
                    <li><strong>Seatbelts:</strong> Mandatory for ALL passengers (front and rear).</li>
                    <li><strong>Drink Driving:</strong> Strictly prohibited. Zero tolerance is safer, legal limit is 0.05%.</li>
                </ul>
                <h4 class="font-bold text-slate-900 mt-4">Speed Limits</h4>
                <ul class="list-disc pl-5 space-y-1">
                    <li>Built-up areas (City): 50-60 km/h</li>
                    <li>Highways: 90 km/h</li>
                    <li>Motorways/Expressways: 110-120 km/h (Watch for signs!)</li>
                </ul>
                <h4 class="font-bold text-slate-900 mt-4">Be Careful Of:</h4>
                <p>Motorbikes maneuvering between lanes ("filtering"). Always check your mirrors twice before changing lanes.</p>
            </div>
        `
    },
    {
        id: 'emergency-procedures',
        category: 'safety-rules',
        title: 'Emergency Contacts',
        summary: '24/7 Roadside Assistance: 02-123-4567. Police: 191. Ambulance: 1669. Keep these numbers handy.',
        image: '/Guide/emergency_contacts.png',
        content: `
            <div class="space-y-4">
                <h4 class="font-bold text-slate-900 text-lg">Save These Numbers</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <p class="text-xs text-slate-500 uppercase font-bold">EasyGo 24/7 Support</p>
                        <p class="text-xl font-bold text-orange-600">02-123-4567</p>
                    </div>
                    <div class="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <p class="text-xs text-slate-500 uppercase font-bold">Tourist Police (English)</p>
                        <p class="text-xl font-bold text-blue-600">1155</p>
                    </div>
                    <div class="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <p class="text-xs text-slate-500 uppercase font-bold">Emergency/Ambulance</p>
                        <p class="text-xl font-bold text-red-600">1669</p>
                    </div>
                    <div class="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <p class="text-xs text-slate-500 uppercase font-bold">General Police</p>
                        <p class="text-xl font-bold text-slate-900">191</p>
                    </div>
                </div>
                <h4 class="font-bold text-slate-900 mt-4">In Case of Accident:</h4>
                <ol class="list-decimal pl-5 space-y-1">
                    <li>Ensure everyone is safe. Move to a safe spot if possible.</li>
                    <li>Call EasyGo Support immediately.</li>
                    <li>Do not negotiate with other parties; wait for insurance/police.</li>
                    <li>Take photos of the scene and damage.</li>
                </ol>
            </div>
        `
    },
    {
        id: 'parking-tips',
        category: 'safety-rules',
        title: 'Parking in Bangkok',
        summary: 'Avoid Red-White curbs (No Parking). Blue-White is allowed on odd/even days. Mall parking is usually the safest bet.',
        image: '/Guide/parking_in_bangkok.png',
        content: `
            <div class="space-y-4">
                <p>Parking can be tricky. Here is the color code:</p>
                <ul class="list-disc pl-5 space-y-2">
                    <li><span class="text-red-600 font-bold">Red & White Curb:</span> <strong>NO PARKING</strong> at any time. Strictly enforced.</li>
                    <li><span class="text-yellow-600 font-bold">Yellow & White Curb:</span> Loading Zone or Bus Stop. No Parking.</li>
                    <li><span class="text-blue-600 font-bold">Blue & White Curb:</span> Allowed on certain days (Odd/Even dates). Check nearby signs carefully!</li>
                </ul>
                <p><strong>Recommendation:</strong> Use paid parking lots in shopping malls or office buildings. It is safer and cooler for the car.</p>
            </div>
        `
    },

    // Tech & Fuel
    {
        id: 'bluetooth-carplay',
        category: 'vehicle-usage',
        title: 'Bluetooth & CarPlay',
        summary: 'Stay connected. Learn how to pair your phone with our modern infotainment systems for music and navigation.',
        image: '/Guide/bluetooth_and_carPlay.png',
        content: `
            <div class="space-y-4">
                <p>Most of our fleet (2022+ models) comes with Apple CarPlay and Android Auto.</p>
                <h4 class="font-bold text-slate-900">Wired Connection (Most Reliable)</h4>
                <ol class="list-decimal pl-5 space-y-1">
                    <li>Plug your USB cable into the port marked with a phone/USB symbol (usually near the gear stick or dashboard).</li>
                    <li>Unlock your phone. Allow permissions if prompted.</li>
                    <li>The car screen should automatically switch to CarPlay/Android Auto.</li>
                </ol>
                <h4 class="font-bold text-slate-900 mt-4">Wireless Bluetooth</h4>
                <ol class="list-decimal pl-5 space-y-1">
                    <li>Go to 'Settings' on the car screen > 'Bluetooth' > 'Add Device'.</li>
                    <li>On your phone, scan for devices and select the Car Name.</li>
                    <li>Confirm the pairing code on both screens.</li>
                </ol>
            </div>
        `
    },
    {
        id: 'fuel-types',
        category: 'vehicle-usage',
        title: 'Fuel Types Explained',
        summary: 'Gasohol 91, 95, or E20? Know exactly what to pump to keep your rental running smoothly and efficiently.',
        image: '/Guide/fuel_types_explained.png',
        content: `
            <div class="space-y-4">
                <p>Always check the sticker inside the fuel door cap. It will list the allowed fuel types.</p>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr class="bg-slate-100 border-b border-slate-200">
                                <th class="p-3 font-bold">Fuel Name</th>
                                <th class="p-3 font-bold">Color Code</th>
                                <th class="p-3 font-bold">Compatibility</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-slate-100">
                                <td class="p-3">Gasohol 95</td>
                                <td class="p-3 text-orange-600 font-bold">Orange</td>
                                <td class="p-3">Best performance. Works with almost all gasoline cars.</td>
                            </tr>
                            <tr class="border-b border-slate-100">
                                <td class="p-3">Gasohol 91</td>
                                <td class="p-3 text-green-600 font-bold">Green</td>
                                <td class="p-3">Standard option. Slightly cheaper. Check compatibility.</td>
                            </tr>
                            <tr class="border-b border-slate-100">
                                <td class="p-3">E20</td>
                                <td class="p-3 text-teal-600 font-bold">Light Green</td>
                                <td class="p-3">Eco-friendly. Most new cars (2010+) support this. Cheapest option.</td>
                            </tr>
                            <tr>
                                <td class="p-3">Diesel</td>
                                <td class="p-3 text-blue-600 font-bold">Blue/Grey</td>
                                <td class="p-3">ONLY for Pickup Trucks, Vans, and Fortuner/Everest/Pajero. NEVER put in a sedan!</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `
    },
    {
        id: 'dash-lights',
        category: 'vehicle-usage',
        title: 'Dashboard Lights',
        summary: 'Quick reference guide for common dashboard warning lights. Know when to continue and when to call support.',
        image: '/Guide/dashboard_lights.png',
        content: `
            <div class="space-y-4">
                <p><strong>Red Light = Stop immediately / Danger</strong></p>
                <ul class="list-disc pl-5 space-y-1">
                    <li><strong>Battery:</strong> Charging system failure.</li>
                    <li><strong>Oil Can:</strong> Low oil pressure. Engine damage risk.</li>
                    <li><strong>Thermometer:</strong> Engine overheating. Pull over safely and turn off engine.</li>
                </ul>
                <p class="mt-4"><strong>Yellow/Orange Light = Warning / Check Soon</strong></p>
                <ul class="list-disc pl-5 space-y-1">
                    <li><strong>Check Engine:</strong> Engine issue. Drive cautiously to our center.</li>
                    <li><strong>Tire Pressure (!):</strong> Low tire air. Refill at nearest station.</li>
                    <li><strong>Fuel Pump:</strong> Low fuel. Refill soon.</li>
                </ul>
            </div>
        `
    }
]
