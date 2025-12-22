"use client";
import { useState } from "react";

export default function FaqHTML({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-20">
      <h2 className="text-3xl font-bold mb-6 text-center">FAQs</h2>

      {/* No FAQ Items */}
      {items.length === 0 && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md text-center">
          No FAQs available at the moment.
        </div>
      )}

      {/* FAQ List */}
      <div className="space-y-4">
        {items.map((faq, index) => (
          <div
            key={faq.id}
            className="border rounded-xl bg-white shadow-sm"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-4 py-3 text-left"
            >
              <span className="font-medium text-gray-900">{faq.question}</span>

              <span className="text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
