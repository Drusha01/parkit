
import { GuestLayout } from '../../Layout/GuestLayout.jsx';
import React, { useState } from 'react';

const AccordionItem = ({ question, answer, index, activeIndex, onToggle }) => {
  return (
    <div className="border-b">
      <button
        onClick={() => onToggle(index)}
        className="w-full text-left p-4 text-lg font-semibold text-main-color focus:outline-none focus:ring-2 focus:ring-blue-500 border-black border"
      >
        {question}
      </button>
      {activeIndex === index && (
        <div className="p-4 text-gray-700">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const DriverFAQ = (props) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: 'What are the requirements to rent a space?',
      answer: 'For you to be able to rent, you must be verified user and register in four (4) easy steps\n 1. Register your profile. \n 2. Register your license. \n 3. Register your vehicles. \n 4. Top up your balance and viola you\'re ready to rent parking spaces'
    },
    {
      question: 'How do I search place?',
      answer: 'You can go to the header browse panel and click the browse to look for spaces that you want to rent.'
    },
    {
      question: 'What should I do if I have an issue with a passenger?',
      answer: 'If you have an issue with a passenger, you should contact support through the app. The team will assist in resolving the issue appropriately.'
    },
    {
      question: 'How do I maintain my vehicle for the job?',
      answer: 'It is important to regularly maintain your vehicle by checking the tires, oil, brakes, and overall cleanliness to ensure safety and comfort for passengers.'
    },
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the active item
  };

  return (
    <>
        <GuestLayout props={props}>
            <main className="bg-gray-100">
                <div className="py-10">
                    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-center mb-6">Driver FAQ</h2>
                        <div className="space-y-4">
                            {faqData.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                index={index}
                                question={faq.question}
                                answer={faq.answer}
                                activeIndex={activeIndex}
                                onToggle={handleToggle}
                            />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </GuestLayout>
    </>
    
  );
};

export default DriverFAQ;
