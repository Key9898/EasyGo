import Stats from './Stats'

export default function AboutUs() {
    return (
        <div className="border-2 border-slate-200 rounded-2xl p-8 sm:p-12 lg:p-16 bg-white">
            <div className="max-w-4xl">
                <p className="text-base font-semibold text-orange-600">About EasyGo</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl hover:text-orange-600">
                    Your Trusted Partner in Seamless Mobility
                </h1>
                <p className="mt-4 text-xl leading-8 text-slate-700">
                    At EasyGo, we believe transportation should be effortless, safe, and reliable. We're committed to
                    delivering exceptional service that puts your journey first.
                </p>
            </div>

            <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
                {/* Mission Text */}
                <div className="lg:pr-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tight text-orange-600">Our Mission and Vision</h2>
                    <p className="mt-4 text-lg leading-relaxed text-slate-600">
                        EasyGo was founded on a simple principle: <span className="text-xl font-bold text-slate-900">every journey should be safe, comfortable, and hassle-free</span>.
                        We're not just a car rental service—we're your <span className="text-xl font-bold text-slate-800">mobility partner</span>, dedicated to making cross-border
                        travel seamless and stress-free.
                    </p>
                    <p className="mt-2 text-lg leading-relaxed text-slate-600">
                        From our <span className="text-xl font-bold text-slate-800">rigorous 20-point safety inspection</span> to our <span className="text-xl font-bold text-slate-800">transparent pricing</span> and <span className="text-xl font-bold text-slate-800">zero-hassle policies</span>, every
                        decision we make is guided by our commitment to your <span className="text-xl font-bold text-slate-900">safety and satisfaction</span>. We believe in building
                        trust through consistent quality and honest service.
                    </p>
                    <p className="mt-2 text-lg leading-relaxed text-slate-600">
                        Whether you're a daily commuter, a corporate client, or a family on vacation, <span className="text-xl font-bold text-orange-600">EasyGo</span> is here to ensure
                        your journey is smooth from start to finish.
                    </p>

                    {/* Stats Component */}
                    <Stats />
                </div>

                {/* Images Grid - Fixed for responsive */}
                <div className="pt-16 lg:row-span-2 max-lg:mt-16">
                    <div className="grid grid-cols-2 gap-4 lg:gap-8">
                        <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                            <img
                                alt="EasyGo team member"
                                src="/WhoWeAre/about_office.png"
                                loading="lazy"
                                className="block size-full object-cover"
                            />
                        </div>
                        <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-40">
                            <img
                                alt="EasyGo service"
                                src="/WhoWeAre/about_service.png"
                                loading="lazy"
                                className="block size-full object-cover"
                            />
                        </div>
                        <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                            <img
                                alt="EasyGo vehicles"
                                src="/WhoWeAre/about_fleet.png"
                                loading="lazy"
                                className="block size-full object-cover"
                            />
                        </div>
                        <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-40">
                            <img
                                alt="EasyGo customer satisfaction"
                                src="/WhoWeAre/about_customer.png"
                                loading="lazy"
                                className="block size-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div >

    )
}
