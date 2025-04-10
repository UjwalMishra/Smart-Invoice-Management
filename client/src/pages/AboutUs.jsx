
// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const team = [
  {
    name: 'Manviya Sahni',
    img: 'Manviya_pic.jpeg',
    desc: 'manviyasahni8504@gmail.com',
    slug: 'manviya'
  },
  {
    name: 'Sahil',
    img: 'Sahil pic.jpeg',
    desc: 'sahilbhardwaj2903@gmail.com',
    slug: 'sahil'
  },
  {
    name: 'Soham',
    img: 'soham new pic.jpg',
    desc: 'sohamkalsi29@gmail.com',
    slug: 'soham'
  },
  {
    name: 'Ujwal Mishra',
    img: 'Ujwal pic.jpg',
    desc: 'Ujwalcse01@gmail.com',
    slug: 'ujwal'
  }
];

function AboutUs() {
  const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');

  

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 shadow-md">
        <div className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
          SmartInvoice
        </div>
        <Input
          placeholder="Search anything..."
          className="w-1/3 px-4 py-2 rounded-md bg-gradient-to-r from-gray-800 to-gray-900 text-white placeholder-emerald-300 border border-emerald-600 shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
          
        />
      </nav>

      {/* Hero Section */}
      <div className="w-full h-85 bg-[url('/images/hero-invoice.jpg')] bg-cover bg-center flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">
          Meet the Minds Behind <span className="bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">Smart Invoice</span>
        </h1>
      </div>

      {/* Team Section */}
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map(member => (
          <Card key={member.name} className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-emerald-700 rounded-2xl shadow-2xl hover:shadow-emerald-400/60 transition duration-300">
            <CardContent className="flex flex-col items-center p-6">
              <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full object-cover mb-4 border-4" style={{ border: '4px solid rgba(0, 213, 190, 1)' }} />
              <h2 className=" text-xl font-semibold mb-1 tracking-wide drop-shadow-md">{member.name}</h2>
              <p className="text-gray-200 text-sm text-center mb-3 italic">{member.desc}</p>
              <Button className="bg-gradient-to-r from-emerald-700 to-blue-700 text-white font-medium px-4 py-2 rounded-md hover:scale-105 transition-transform duration-200" onClick={() => navigate(`/team/${member.slug}`)}>
                  Read More
              </Button>

            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional About Section */}
      <div className="bg-gray-900 border border-gray-800 p-10 text-center shadow-md mx-6 rounded-xl mt-10">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">Our Mission</h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
        Our Goal
        At SmartInvoice, our mission is to revolutionize finance operations by leveraging advanced technologies like AI, OCR, and RPA. We aim to eliminate manual inefficiencies and bring speed, intelligence, and accuracy to back-office processes. Built by passionate engineers, SmartInvoice is focused on solving real-world challenges and delivering automation that truly makes a difference.
        </p>
      </div>

      <footer className="text-center mt-10 py-4 text-gray-500 text-sm">
        © 2025 BitBuilders Hackathon Team. All rights reserved.
      </footer>
    </div>
  );
}

export default AboutUs;

