import React from 'react';
import { Button } from '../components/ui/button';

function SohamPage() {
  const member = {
    name: 'Soham',
    img: '/soham new pic.jpg',
    email: 'sohamkalsi29@gmail.com',
    contact: '+91-9876543201',
    linkedin: 'https://linkedin.com/in/sohamkalsi',
    github: 'https://github.com/sohamkalsi',
    description: (
      <>
        <p className="mb-4">
          Soham is a versatile developer with deep expertise in full-stack development and data pipeline architecture. At InvoiceAI, he has played a pivotal role in connecting AI-driven components with intuitive and responsive frontend interfaces. His work ensures seamless user experiences while maintaining robust backend integration.
        </p>
        <p>
          He excels at building scalable applications and has contributed to performance optimization, API development, and real-time data synchronization. Soham is also the go-to person for quick prototyping and debugging, often bridging the gap between design thinking and engineering execution. His dedication and problem-solving mindset make him a key driver of innovation in the team.
        </p>
      </>
    )
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans px-6 py-10">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl shadow-2xl border" style={{ border: '4px solid rgba(0, 213, 190, 1)' }}>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src={member.img}
            alt={member.name}
            className="w-40 h-40 rounded-full object-cover shadow-lg"
            style={{ border: '4px solid rgba(0, 213, 190, 1)' }}
          />
          <div className="text-left">
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'rgba(0, 213, 190, 1)' }}>{member.name}</h1>
            <p className="text-gray-300 mb-1"><strong>Email:</strong> {member.email}</p>
            <p className="text-gray-300 mb-1"><strong>Contact:</strong> {member.contact}</p>
            <p className="text-gray-300 mb-1">
              <strong>LinkedIn:</strong>{' '}
              <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                {member.linkedin}
              </a>
            </p>
            <p className="text-gray-300 mb-4">
              <strong>GitHub:</strong>{' '}
              <a href={member.github} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                {member.github}
              </a>
            </p>
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-emerald-400/50 transition duration-300 transform hover:scale-105">
              Contact Now
            </Button>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-2">About</h2>
          <div className="text-gray-300 leading-relaxed">
            {member.description}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SohamPage;
