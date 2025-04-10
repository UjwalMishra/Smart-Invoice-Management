import React from 'react';
import { Button } from '../components/ui/button';

function ManviyaPage() {
  const member = {
    name: 'Manviya Sahni',
    img: '/Manviya_pic.jpeg',
    email: 'manviyasahni8504@gmail.com',
    contact: '+91-9876543210',
    linkedin: 'https://linkedin.com/in/manviya',
    github: 'https://github.com/manviyasahni',
    description:
      'Manviya is a highly proficient AI/ML developer and the driving force behind the engineering efforts at InvoiceAI. With a strong background in artificial intelligence, she has been instrumental in designing and implementing advanced OCR pipelines and intelligent document analysis systems. Her deep understanding of backend infrastructure, coupled with her innovative approach to problem-solving, has significantly enhanced the platform’s performance and reliability.As the lead architect, she has pioneered numerous features focused on automating invoice processing, reducing manual intervention, and increasing data accuracy across various formats. Her expertise spans from model training and data pre-processing to building scalable APIs and integrating machine learning into real-world enterprise workflows. Beyond her technical skills, Manviya is deeply motivated by a vision to empower businesses through smart automation tools. She consistently brings clarity and precision to complex challenges, making her an invaluable asset to the team. Always eager to explore the boundaries of what possible with AI, she continues to drive impact through experimentation, collaboration, and a deep sense of purpose in everything she builds.'
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans px-6 py-10">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl shadow-2xl border style={{ border: '4px solid rgba(0, 213, 190, 1)' }}">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src={member.img}
            alt={member.name}
            className="w-40 h-40 rounded-full object-cover shadow-lg" style={{ border: '4px solid rgba(0, 213, 190, 1)' }}
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
        <h2
  className="text-xl font-semibold mb-1 tracking-wide drop-shadow-md"
  style={{ color: 'rgba(0, 213, 190, 1)' }}
>
  {member.name}
</h2>
          <p className="text-gray-300 leading-relaxed">
            {member.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ManviyaPage;
