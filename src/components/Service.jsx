import React from 'react';
import { Code, Layout, Smartphone, Cloud, PenTool, Zap } from 'lucide-react'; // Importing icons from lucide-react

// Main App component
const App = () => {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-gray-800 flex items-center justify-center py-12">
      <ServicesSection />
    </div>
  );
};

// Services Section Component
const ServicesSection = () => {
  // Define your services data
  const services = [
    {
      icon: <Code className="w-8 h-8 text-amber-600" />,
      title: "Custom Web Application Development",
      description: "Crafting bespoke web solutions tailored to your unique business needs, from complex platforms to intuitive dashboards. We build for scalability and performance."
    },
    {
      icon: <Layout className="w-8 h-8 text-amber-600" />,
      title: "Responsive UI/UX Design",
      description: "Designing engaging and user-friendly interfaces that look stunning and perform flawlessly across all devices, ensuring an exceptional user experience."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-amber-600" />,
      title: "Mobile-First Development",
      description: "Developing robust and performant mobile applications for iOS and Android, ensuring seamless experiences and native-like functionality."
    },
    {
      icon: <Cloud className="w-8 h-8 text-amber-600" />,
      title: "Cloud & API Integration",
      description: "Seamlessly integrating third-party APIs and leveraging cloud services (AWS, GCP, Azure) to enhance functionality, scalability, and data management."
    },
    {
      icon: <PenTool className="w-8 h-8 text-amber-600" />,
      title: "Digital Strategy & Consulting",
      description: "Providing expert guidance to define your digital roadmap, optimize workflows, and implement innovative solutions that drive business growth."
    },
    {
      icon: <Zap className="w-8 h-8 text-amber-600" />,
      title: "Performance Optimization",
      description: "Fine-tuning your applications for maximum speed and efficiency, ensuring lightning-fast load times and a smooth user journey."
    }
  ];

  return (
    <section 
    id='services'
    className="container mx-auto px-4 py-8 max-w-6xl">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12 leading-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-yellow-500">
          Service
        </span>
        <br />
        <span className="text-gray-600 text-2xl md:text-3xl font-semibold">
          Empowering Your Digital Vision
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-zinc-900 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out p-8 flex flex-col items-center text-center"
          >
            <div className="mb-6 p-4 bg-zinc-800 rounded-full inline-flex items-center justify-center shadow-md">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-amber-500 mb-3">{service.title}</h3>
            <p className="text-zinc-300 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default App;
