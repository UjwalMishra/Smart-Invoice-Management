import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const team = [
  {
    name: "Manviya Sahni",
    img: "Manviya_pic.jpeg",
    desc: "manviyasahni8504@gmail.com",
    slug: "manviya",
  },
  {
    name: "Sahil",
    img: "Sahil pic.jpeg",
    desc: "sahilbhardwaj2903@gmail.com",
    slug: "sahil",
  },
  {
    name: "Soham",
    img: "soham new pic.jpg",
    desc: "sohamkalsi29@gmail.com",
    slug: "soham",
  },
  {
    name: "Ujwal Mishra",
    img: "Ujwal pic.jpg",
    desc: "Ujwalcse01@gmail.com",
    slug: "ujwal",
  },
];

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Header Section */}
      <div className="w-full h-96 bg-[url('/images/hero-invoice.jpg')] bg-cover bg-center flex items-center justify-center bg-blend-multiply">
        <h1 className="text-5xl sm:text-6xl text-center font-bold text-white">
          Meet the Minds Behind{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
            Smart Invoice
          </span>
        </h1>
      </div>

      {/* Team Section */}
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member) => (
          <Card
            key={member.name}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-emerald-700 rounded-2xl shadow-2xl hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <CardContent className="flex flex-col items-center p-6">
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-emerald-500"
              />
              <h2 className="text-xl font-semibold mb-1 tracking-wide text-emerald-400">
                {member.name}
              </h2>
              <p className="text-gray-200 text-sm text-center mb-3 italic">
                {member.desc}
              </p>
              <Button
                className="bg-gradient-to-r from-emerald-700 to-blue-700 text-white font-medium px-6 py-2 rounded-md hover:scale-105 transition-transform duration-200"
                onClick={() => navigate(`/team/${member.slug}`)}
              >
                Read More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mission Section */}
      <div className="bg-gray-900 border border-gray-800 p-10 text-center shadow-md mx-6 rounded-xl mt-16">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
          Our Mission
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          At SmartInvoice, our mission is to revolutionize finance operations by
          leveraging advanced technologies like AI, OCR, and RPA. We aim to
          eliminate manual inefficiencies and bring speed, intelligence, and
          accuracy to back-office processes. Built by passionate engineers,
          SmartInvoice is focused on solving real-world challenges and
          delivering automation that truly makes a difference.
        </p>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-center mt-16 py-6 text-gray-400 text-sm">
        <p>
          © 2025 <span className="font-bold text-emerald-500">BitBuilders</span>{" "}
          Hackathon Team. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default AboutUs;
