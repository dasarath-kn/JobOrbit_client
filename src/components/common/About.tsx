import { Users, Shield, Layout, Rocket, Building2, Search } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2940"
          className="w-full h-full object-cover filter brightness-[0.3]"
          alt="Team collaboration"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center">
            Our Mission
          </h1>
          <p className="text-lg md:text-xl text-white max-w-3xl text-center leading-relaxed">
            At JobOrbit, our mission is to revolutionize the job search experience by seamlessly connecting talented individuals with thriving opportunities across the globe. We are committed to creating a dynamic platform that empowers job seekers to discover their dream careers and enables employers to find the perfect fit for their teams.
          </p>
        </div>
      </div>

      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-4">
          Why Choose JobOrbit
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Discover how we're transforming the job search experience with innovative features and a commitment to your success.
        </p>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group bg-white p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl border border-gray-100">
            <div className="mb-6">
              <Search className="w-12 h-12 text-black group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-bold text-black mb-4">
              Find Jobs Tailored to Your Skills
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our advanced search algorithm matches you with opportunities that align perfectly with your unique skills and experience. Find your ideal job faster and more efficiently.
            </p>
          </div>

          <div className="group bg-white p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl border border-gray-100">
            <div className="mb-6">
              <Rocket className="w-12 h-12 text-black group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-bold text-black mb-4">
              Stay Updated on Opportunities
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Get real-time notifications for new jobs and application updates. Stay ahead of the competition with instant alerts for positions matching your criteria.
            </p>
          </div>

          <div className="group bg-white p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl border border-gray-100">
            <div className="mb-6">
              <Shield className="w-12 h-12 text-black group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-bold text-black mb-4">
              Your Data is Safe with Us
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We prioritize your privacy with robust security measures. Your personal information and job search activities are protected with industry-leading encryption.
            </p>
          </div>

          <div className="group bg-white p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl border border-gray-100">
            <div className="mb-6">
              <Layout className="w-12 h-12 text-black group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-bold text-black mb-4">
              Easy to Navigate and Use
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our user-friendly interface makes job hunting simple and stress-free. Access everything you need with our clean, intuitive layout on any device.
            </p>
          </div>

          <div className="group bg-white p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl border border-gray-100">
            <div className="mb-6">
              <Building2 className="w-12 h-12 text-black group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-bold text-black mb-4">
              From Startups to Enterprises
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Find opportunities across all company sizes and industries. Whether you're targeting startups or global enterprises, we've got the right opportunities for you.
            </p>
          </div>

          <div className="group bg-white p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl border border-gray-100">
            <div className="mb-6">
              <Users className="w-12 h-12 text-black group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-bold text-black mb-4">
              Global Talent Network
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Connect with a diverse community of professionals and employers worldwide. Expand your horizons and discover opportunities across borders.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2 text-black">1M+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2 text-black">50K+</div>
            <div className="text-gray-600">Companies</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2 text-black">100K+</div>
            <div className="text-gray-600">Jobs Posted</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2 text-black">90%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;