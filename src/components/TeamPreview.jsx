const teamMembers = [
  {
    id: 1,
    name: "Dr. Aditi Sharma",
    role: "Principal Investigator",
    img: "https://via.placeholder.com/200x200.png?text=Aditi",
  },
  {
    id: 2,
    name: "John Miller",
    role: "Postdoctoral Fellow",
    img: "https://via.placeholder.com/200x200.png?text=John",
  },
  {
    id: 3,
    name: "Sophia Zhang",
    role: "PhD Researcher",
    img: "https://via.placeholder.com/200x200.png?text=Sophia",
  },
  {
    id: 4,
    name: "Raj Patel",
    role: "MSc Student",
    img: "https://via.placeholder.com/200x200.png?text=Raj",
  },
];

export default function TeamPreview() {
  return (
    <section id="team" className="py-16 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-12">
        Meet Our Team
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-7xl mx-auto px-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-col items-center text-center group"
          >
            {/* Profile Image */}
            <div className="w-40 h-40 relative perspective">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover rounded-full shadow-lg idle-rotate"
              />
            </div>

            {/* Name + Role */}
            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              {member.name}
            </h3>
            <p className="text-sm text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
