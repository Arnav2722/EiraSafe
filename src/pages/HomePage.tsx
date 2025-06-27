import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, BookOpen, Heart, MapPin, AlertTriangle, Moon } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Hero section */}
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">
          EiraSafe
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your emotional safety net. A secure space for healing, support, and empowerment.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            to="/journal"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-300"
          >
            Start Journaling
          </Link>
          <Link
            to="/resources"
            className="px-6 py-3 bg-white text-purple-700 border border-purple-200 rounded-lg shadow-sm hover:bg-purple-50 transition-colors duration-300"
          >
            Find Resources
          </Link>
        </div>
      </section>

      {/* Safety Notice */}
      <section className="bg-red-50 border border-red-100 rounded-lg p-4 md:p-6 mb-12">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              Safety First
            </h2>
            <p className="text-red-700">
              If you're in immediate danger, please call your local emergency number or the
              domestic violence helpline at 100 (Toll Free). Your safety is the top priority.
            </p>
            <div className="mt-3">
              <p className="text-sm text-red-600">
                <strong>Quick Safety Tip:</strong> Use the "Panic Button" in the bottom right
                corner to quickly exit this site if needed. It will immediately redirect you to
                a neutral website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-center text-purple-800 mb-8">
          How EiraSafe Supports You
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<BookOpen className="w-8 h-8 text-purple-600" />}
            title="Private Journaling"
            description="Document your thoughts and feelings with AI-guided prompts to process emotions safely."
            link="/journal"
          />
          <FeatureCard 
            icon={<Shield className="w-8 h-8 text-blue-600" />}
            title="Safety Planning"
            description="Create personalized safety plans for different scenarios to stay prepared."
            link="/safety-plan"
          />
          <FeatureCard 
            icon={<MapPin className="w-8 h-8 text-red-600" />}
            title="Resource Directory"
            description="Access helplines, shelters, legal aid, and other support services near you."
            link="/resources"
          />
          <FeatureCard 
            icon={<Moon className="w-8 h-8 text-indigo-600" />}
            title="Mood Tracking"
            description="Monitor your emotional wellbeing and receive supportive affirmations."
            link="/mood"
          />
          <FeatureCard 
            icon={<Heart className="w-8 h-8 text-pink-600" />}
            title="Guided Healing"
            description="Access audio-guided techniques for trauma processing and emotional regulation."
            link="/journal"
          />
          <FeatureCard 
            icon={<AlertTriangle className="w-8 h-8 text-amber-600" />}
            title="Quick Disguise"
            description="Instantly transform the app to appear as a weather or notes app for privacy."
            link="/settings"
          />
        </div>
      </section>

      {/* Testimonials section */}
      <section className="mb-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center text-purple-800 mb-8">
          Stories of Strength
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <TestimonialCard 
            quote="This app became my safe space when I had nowhere else to turn. The journaling helped me process what was happening and build the courage to leave."
            author="Anonymous Survivor"
          />
          <TestimonialCard 
            quote="The disguise feature saved me many times. When he would check my phone, it just looked like I was checking the weather. This app was crucial in my journey to safety."
            author="Anonymous Survivor"
          />
        </div>
      </section>
    </div>
  );
};

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, link }) => {
  return (
    <Link to={link}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 h-full border border-gray-100">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

type TestimonialCardProps = {
  quote: string;
  author: string;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
      <p className="text-gray-600 italic mb-4">"{quote}"</p>
      <p className="text-purple-700 font-medium">{author}</p>
    </div>
  );
};

export default HomePage;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Shield, BookOpen, Heart, MapPin, AlertTriangle, Moon } from 'lucide-react';
// // Import the SelfAffirmationPage component
// import SelfAffirmationPage from './SelfAffirmation'; //

// const HomePage: React.FC = () => {
//   return (
//     <div className="space-y-10">
//       {/* Hero section */}
//       <section className="text-center mb-12">
//         <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">
//           EiraSafe
//         </h1>
//         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//           Your emotional safety net. A secure space for healing, support, and empowerment.
//         </p>
//         <div className="flex flex-wrap justify-center gap-4 mt-8">
//           <Link
//             to="/journal"
//             className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-300"
//           >
//             Start Journaling
//           </Link>
//           <Link
//             to="/resources"
//             className="px-6 py-3 bg-white text-purple-700 border border-purple-200 rounded-lg shadow-sm hover:bg-purple-50 transition-colors duration-300"
//           >
//             Find Resources
//           </Link>
//         </div>
//       </section>

//       {/* Safety Notice */}
//       <section className="bg-red-50 border border-red-100 rounded-lg p-4 md:p-6 mb-12">
//         <div className="flex items-start">
//           <AlertTriangle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
//           <div>
//             <h2 className="text-lg font-semibold text-red-800 mb-2">
//               Safety First
//             </h2>
//             <p className="text-red-700">
//               If you're in immediate danger, please call your local emergency number or the
//               domestic violence helpline at 100 (Toll Free). Your safety is the top priority.
//             </p>
//             <div className="mt-3">
//               <p className="text-sm text-red-600">
//                 <strong>Quick Safety Tip:</strong> Use the "Panic Button" in the bottom right
//                 corner to quickly exit this site if needed. It will immediately redirect you to
//                 a neutral website.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features section */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-bold text-center text-purple-800 mb-8">
//           How EiraSafe Supports You
//         </h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <FeatureCard
//             icon={<BookOpen className="w-8 h-8 text-purple-600" />}
//             title="Private Journaling"
//             description="Document your thoughts and feelings with AI-guided prompts to process emotions safely."
//             link="/journal"
//           />
//           <FeatureCard
//             icon={<Shield className="w-8 h-8 text-blue-600" />}
//             title="Safety Planning"
//             description="Create personalized safety plans for different scenarios to stay prepared."
//             link="/safety-plan"
//           />
//           <FeatureCard
//             icon={<MapPin className="w-8 h-8 text-red-600" />}
//             title="Resource Directory"
//             description="Access helplines, shelters, legal aid, and other support services near you."
//             link="/resources"
//           />
//           <FeatureCard
//             icon={<Moon className="w-8 h-8 text-indigo-600" />}
//             title="Mood Tracking"
//             description="Monitor your emotional wellbeing and receive supportive affirmations."
//             link="/mood"
//           />
//           <FeatureCard
//             icon={<Heart className="w-8 h-8 text-pink-600" />}
//             title="Guided Healing"
//             description="Access audio-guided techniques for trauma processing and emotional regulation."
//             link="/journal"
//           />
//           <FeatureCard
//             icon={<AlertTriangle className="w-8 h-8 text-amber-600" />}
//             title="Quick Disguise"
//             description="Instantly transform the app to appear as a weather or notes app for privacy."
//             link="/settings"
//           />
//         </div>
//       </section>

//       {/* Self-Affirmation Section - NEWLY ADDED */}
//       <section className="mb-12">
//         <SelfAffirmationPage /> {/* */}
//       </section>

//       {/* Testimonials section */}
//       <section className="mb-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
//         <h2 className="text-2xl font-bold text-center text-purple-800 mb-8">
//           Stories of Strength
//         </h2>
//         <div className="grid md:grid-cols-2 gap-6">
//           <TestimonialCard
//             quote="This app became my safe space when I had nowhere else to turn. The journaling helped me process what was happening and build the courage to leave."
//             author="Anonymous Survivor"
//           />
//           <TestimonialCard
//             quote="The disguise feature saved me many times. When he would check my phone, it just looked like I was checking the weather. This app was crucial in my journey to safety."
//             author="Anonymous Survivor"
//           />
//         </div>
//       </section>
//     </div>
//   );
// };

// type FeatureCardProps = {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   link: string;
// };

// const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, link }) => {
//   return (
//     <Link to={link}>
//       <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 h-full border border-gray-100">
//         <div className="mb-4">{icon}</div>
//         <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
//         <p className="text-gray-600">{description}</p>
//       </div>
//     </Link>
//   );
// };

// type TestimonialCardProps = {
//   quote: string;
//   author: string;
// };

// const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
//       <p className="text-gray-600 italic mb-4">"{quote}"</p>
//       <p className="text-purple-700 font-medium">{author}</p>
//     </div>
//   );
// };

// export default HomePage;