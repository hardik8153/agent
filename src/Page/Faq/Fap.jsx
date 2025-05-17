import React, { useState } from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';
import AddFap from './Addfap';
import ViewFaq from './Viewfap';
import EditFaq from './Editfao';
import Topbar from '../../components/Topbar';
const sampleFaqs = [
  { id: 1, title: 'Important: Must Read', question: '25 April 2025', introduction: "We have created this category and FAQs in it to get you acquainted with the FAQ feature and help you get started straightaway. These are just for illustration purpose. Do not set this category or any of these FAQs as visible by unchecking the 'Save as Draft'.", },
  { id: 2, title: 'How to setup FAQ categories?', question: '25 April 2025', introduction: "We have created this category and FAQs in it to get you acquainted with the FAQ feature and help you get started straightaway. These are just for illustration purpose. Do not set this category or any of these FAQs as visible by unchecking the 'Save as Draft'.", },
  { id: 3, title: 'How to create an FAQ?', question: '25 April 2025', introduction: "We have created this category and FAQs in it to get you acquainted with the FAQ feature and help you get started straightaway. These are just for illustration purpose. Do not set this category or any of these FAQs as visible by unchecking the 'Save as Draft'.", },
  { id: 4, title: 'Example: Preparing your package for return.', question: '25 April 2025', introduction: "We have created this category and FAQs in it to get you acquainted with the FAQ feature and help you get started straightaway. These are just for illustration purpose. Do not set this category or any of these FAQs as visible by unchecking the 'Save as Draft'.", },
];

const totalFaqCount = 22;

const Faq = () => {
  const [fapaddpopup, setFapaddpopup] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [editFaq, setEditFaq] = useState(false);

  const topbadrdata =
  {
    // title: 'FAQ',
    title: 'Manage Frequently Asked Questions'
  }
  return (
    <>
      <div className="p-6 md:p-8 bg-[#F6F8FA] min-h-screen w-full">
        <Topbar topbadrdata={topbadrdata} />
        <div className="bg-white p-6 mt-6 rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                name="search-faq"
                id="search-faq"
                className="block w-full sm:w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search FAQ"
              />
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center px-[20px] py-3 border border-transparent text-[14px] leading-[14px] tracking-[0] font-Poppins font-bold rounded-lg shadow-sm text-white bg-[#2A85FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-auto"
              onClick={() => {
                setFapaddpopup(true);
              }}
            >
              +Add FAQ
            </button>

          </div>

          <hr className="mb-6 border-gray-200" />

          <h2 className="text-[16px] leading-[16px] tracking-[0] font-Poppins font-medium text-[#667085] mb-8 align-middle">
            Total FAQ ({totalFaqCount})
          </h2>


          <div className="space-y-6">
            {sampleFaqs.map((faq) => (
              <div
                key={faq.id}
                className="p-6 border border-gray-200 cursor-pointer rounded-lg bg-white"
                onClick={() => {
                  setSelectedFaq(faq);
                }}
              >
                <p className="text-[16px] leading-[16px] tracking-[0] font-Poppins font-normal text-black align-middle">
                  {faq.id}. {faq.title}
                  <span className="text-[#2A85FF] font-Poppins ml-2 align-middle">
                    ( Sample )
                  </span>
                </p>
              </div>
            ))}
          </div>


          {
            fapaddpopup && <AddFap
              onClose={() => setFapaddpopup(false)}
            />
          }
          {
            selectedFaq && <ViewFaq
              faq={selectedFaq}
              onClose={() => setSelectedFaq(null)}
              onEdit={() => setEditFaq(true)}
              onSave={() => console.log('Save clicked')}
            />
          }
          {
            editFaq && <EditFaq
              faq={selectedFaq}
              onClose={() => setEditFaq(false)}
            />
          }
        </div>
      </div>
    </>
  );
};

export default Faq;