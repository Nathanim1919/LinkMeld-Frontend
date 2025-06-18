import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FiCheck, FiZap, FiBriefcase, FiGlobe } from "react-icons/fi";

export const PricingPage = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for individuals getting started",
      cta: "Get Started",
      featured: false,
      features: [
        "Up to 100 captures",
        "Basic organization",
        "1GB storage",
        "Community support"
      ],
      icon: <FiZap className="text-blue-500" />
    },
    {
      name: "Pro",
      price: "$9",
      period: "/month",
      description: "For professionals and power users",
      cta: "Upgrade Now",
      featured: true,
      features: [
        "Unlimited captures",
        "Advanced organization",
        "10GB storage",
        "Priority support",
        "Browser extension",
        "API access"
      ],
      icon: <FiBriefcase className="text-purple-500" />
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For teams and organizations",
      cta: "Contact Sales",
      featured: false,
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Unlimited storage",
        "Dedicated account manager",
        "SSO & SCIM",
        "Advanced security"
      ],
      icon: <FiGlobe className="text-green-500" />
    }
  ];

  return (
    <div className="bg-white text-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl mb-4"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Choose the plan that works best for your workflow. No hidden fees.
          </motion.p>
        </div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div className="bg-gray-100 p-1 rounded-lg inline-flex">
            <button className="px-4 py-2 text-sm font-medium rounded-md bg-white shadow-sm text-gray-900">
              Monthly billing
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900">
              Annual billing (save 20%)
            </button>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`relative rounded-2xl border border-gray-200 p-8 shadow-sm ${plan.featured ? 'ring-2 ring-purple-500' : ''}`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most popular
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-gray-50">
                  {plan.icon}
                </div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-2">{plan.description}</p>
                <p className="text-4xl font-bold mb-1">
                  {plan.price}
                  {plan.period && (
                    <span className="text-xl font-normal text-gray-500">{plan.period}</span>
                  )}
                </p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <FiCheck className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to="#"
                className={`block w-full text-center py-3 px-4 rounded-lg font-medium transition-colors ${
                  plan.featured
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-24 max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Frequently asked questions</h3>
          <div className="space-y-6">
            {[
              "Can I change plans later?",
              "Do you offer discounts for students?",
              "What payment methods do you accept?",
              "Is there a free trial?",
              "How do I cancel my subscription?"
            ].map((question) => (
              <div key={question} className="border-b border-gray-200 pb-6">
                <button className="flex justify-between items-center w-full text-left font-medium text-gray-900 hover:text-purple-600">
                  <span>{question}</span>
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};