import { ChartBarIcon, HeartIcon } from '@heroicons/react/24/outline'

export default function WhyJoinUs() {
    return (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-orange-600 mb-6">Why start your journey with EasyGo?</h2>
                <p className="text-lg text-slate-600 mb-8">
                    We are not just a car rental company; we are a technology-driven mobility service.
                    We value innovation, customer obsession, and treating every team member like family.
                </p>

                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="flex-none pt-1">
                            <div className="rounded-lg bg-orange-100 p-2">
                                <HeartIcon className="size-6 text-orange-600" />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 text-lg">Family Culture</h3>
                            <p className="text-slate-600 mt-1">
                                We foster a supportive, inclusive environment where your voice is heard and your well-being is prioritized.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-none pt-1">
                            <div className="rounded-lg bg-blue-100 p-2">
                                <ChartBarIcon className="size-6 text-blue-600" />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 text-lg">Growth & Development</h3>
                            <p className="text-slate-600 mt-1">
                                Regular training workshops, clear career paths, and opportunities to lead new initiatives.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl lg:h-[500px]">
                <img
                    src="/Careers/career_culture.png"
                    alt="Team meeting"
                    className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white p-4">
                    <p className="text-lg">"The best place to work is where you can be yourself."</p>
                    <p className="font-bold mt-2">- EasyGo Philosophy</p>
                </div>
            </div>
        </div>

    )
}
