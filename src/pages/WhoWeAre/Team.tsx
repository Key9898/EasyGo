const leaders = [
  {
    name: 'Wunna Aung',
    role: 'CEO / Founder',
    bio: 'Visionary leader passionate about connecting Southeast Asia through seamless and reliable cross-border transportation solutions.',
    imageUrl: '/WhoWeAre/team_ceo.png',
  },
]

const teamMembers = [
  {
    name: 'Kyaw Zin Htet',
    role: 'Head of Operations',
    bio: 'Oversees fleet logistics and safety protocols, ensuring every vehicle undergoes our rigorous 20-point inspection before it reaches you.',
    imageUrl: '/WhoWeAre/team_ops.png',
  },
  {
    name: 'Nattaporn Srisuk',
    role: 'Head of Customer Experience',
    bio: 'Leads our dedicated support team to provide round-the-clock assistance, ensuring exceptional service at every touchpoint of your journey.',
    imageUrl: '/WhoWeAre/team_cx.png',
  },
]

export default function Team() {
  return (
    <div className="border-2 border-slate-200 rounded-2xl p-8 sm:p-12 lg:p-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tight text-orange-600">
          Meet Our Leadership
        </h2>
        <p className="mt-2 text-lg text-slate-600">
          The passionate team driving EasyGo's vision forward
        </p>
      </div>

      {/* CEO/Founder - Featured Card */}
      <div className="mb-12">
        {leaders.map((leader) => (
          <div
            key={leader.name}
            className="bg-white rounded-2xl p-8 shadow-md border-2 border-orange-200 max-w-2xl mx-auto hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                alt={leader.name}
                src={leader.imageUrl}
                className="size-32 rounded-full object-cover border-4 border-orange-100"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-slate-900">{leader.name}</h3>
                <p className="text-lg font-semibold text-orange-600 mt-1">{leader.role}</p>
                <p className="text-lg text-slate-600 mt-2">{leader.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Other Team Members - Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="bg-white rounded-2xl p-6 shadow-sm border-2 border-slate-200 hover:shadow-md hover:border-orange-200 transition-all"
          >
            <div className="flex flex-col items-center text-center">
              <img
                alt={member.name}
                src={member.imageUrl}
                className="size-24 rounded-full object-cover border-4 border-slate-100 mb-4"
              />
              <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
              <p className="text-lg font-semibold text-orange-600 mt-1">{member.role}</p>
              <p className="text-lg text-slate-600 mt-2">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div >

  )
}
