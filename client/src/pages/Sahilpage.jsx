import React from 'react';
import { Button } from '../components/ui/button';

function SahilPage() {
  const member = {
    name: 'Sahil',
    img: '/Sahil pic.jpeg',
    email: 'sahilbhardwaj2903@gmail.com',
    contact: '+91-9812345678',
    linkedin: 'https://linkedin.com/in/sahilbhardwaj',
    github: 'https://github.com/sahilbhardwaj',
    description: (
      <>
        <p className="mb-4">
          Sahil is a core AI/ML contributor to InvoiceAI, with strong expertise in data science and intelligent automation. He has worked on optimizing our machine learning models for speed and precision, particularly in training data classification models for document processing.
        </p>
        <p>
          His attention to detail and collaborative nature have led to highly efficient and scalable codebases, making him a key team member in ensuring system integrity. Outside development, Sahil enjoys diving deep into research papers and staying on the bleeding edge of tech innovation.
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

export default SahilPage;
