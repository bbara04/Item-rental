// src/pages/AboutUs.tsx
export default function AboutUsPanel() {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">About Us</h1>
          <p className="text-gray-600 mb-6">
            Welcome to RentTech! We’re a small team passionate about connecting people with the
            perfect tech gear—for work, school, or play. Since 2023 we’ve been on a mission to make
            renting laptops, tablets, and other devices as simple and stress-free as possible.
          </p>
  
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            To empower everyone—students, freelancers, entrepreneurs—to access top-of-the-line
            technology without the upfront cost. We believe in flexibility, affordability, and
            outstanding customer service.
          </p>
  
          <h2 className="text-xl font-semibold text-gray-800 mb-2">What We Value</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li><strong>Quality:</strong> Every device in our fleet is hand-checked, maintained, and ready to go.</li>
            <li><strong>Transparency:</strong> No hidden fees—what you see is what you pay.</li>
            <li><strong>Support:</strong> 24/7 helpdesk and easy returns.</li>
          </ul>
  
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-md p-4 text-center">
              <div className="h-24 w-24 bg-gray-200 rounded-full mx-auto mb-3" />
              <p className="font-medium text-gray-800">Alex Johnson</p>
              <p className="text-sm text-gray-600">Founder & CEO</p>
            </div>
            <div className="bg-gray-50 rounded-md p-4 text-center">
              <div className="h-24 w-24 bg-gray-200 rounded-full mx-auto mb-3" />
              <p className="font-medium text-gray-800">Maria Rodriguez</p>
              <p className="text-sm text-gray-600">Head of Operations</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  