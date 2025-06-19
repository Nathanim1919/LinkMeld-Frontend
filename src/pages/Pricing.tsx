import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiZap, FiBriefcase, FiGlobe, FiChevronDown } from "react-icons/fi";
import { useState } from "react";

export const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const plans = [
    {
      name: "Starter",
      monthlyPrice: "Free",
      annualPrice: "Free",
      description: "Perfect for individuals getting started",
      cta: "Get Started",
      featured: false,
      features: [
        "Up to 100 captures",
        "Basic organization",
        "1GB storage",
        "Community support"
      ],
      icon: <FiZap className="text-blue-400" />
    },
    {
      name: "Pro",
      monthlyPrice: "$9",
      annualPrice: "$7",
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
      icon: <FiBriefcase className="text-purple-400" />
    },
    {
      name: "Enterprise",
      monthlyPrice: "Custom",
      annualPrice: "Custom",
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
      icon: <FiGlobe className="text-green-400" />
    }
  ];

  const faqs = [
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated based on your billing cycle."
    },
    {
      question: "Do you offer discounts for students?",
      answer: "We offer a 50% discount for verified students. Contact our support team with your academic email for verification."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for enterprise plans."
    },
    {
      question: "Is there a free trial?",
      answer: "The Starter plan is completely free. For Pro features, we offer a 14-day free trial with no credit card required."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel anytime from your account settings. Cancellations take effect at the end of your billing period with no additional charges."
    }
  ];

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div className="bg-gray-900 text-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400"
          >
            Choose the plan that works best for your workflow. No hidden fees.
          </motion.p>
        </div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div className="bg-gray-800 p-1 rounded-lg inline-flex border border-gray-700">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                billingCycle === 'monthly' 
                  ? 'bg-gray-700 text-white shadow-sm' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly billing
            </button>
            <button 
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                billingCycle === 'annual' 
                  ? 'bg-gray-700 text-white shadow-sm' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
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
              className={`relative rounded-xl border border-gray-800 p-8 shadow-lg ${plan.featured ? 'ring-2 ring-purple-500 bg-gray-800' : 'bg-gray-850'}`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  Most popular
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-gray-800">
                  {plan.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-400 mb-2">{plan.description}</p>
                <p className="text-4xl font-bold text-white mb-1">
                  {billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                  {plan.period && (
                    <span className="text-xl font-normal text-gray-400">
                      {billingCycle === 'annual' ? '/month (billed annually)' : plan.period}
                    </span>
                  )}
                </p>
                {billingCycle === 'annual' && plan.name === 'Pro' && (
                  <p className="text-sm text-gray-400">$84 billed annually (save $24)</p>
                )}
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <FiCheck className="text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to="#"
                className={`block w-full text-center py-3 px-4 rounded-lg font-medium transition-all ${
                  plan.featured
                    ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg'
                    : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
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
          <h3 className="text-2xl font-bold text-center mb-8 text-white">Frequently asked questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-800">
                <button 
                  onClick={() => toggleQuestion(index)}
                  className="flex justify-between items-center w-full text-left py-6 font-medium text-gray-200 hover:text-purple-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: activeQuestion === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiChevronDown className="h-5 w-5 text-gray-500" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {activeQuestion === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 text-gray-400">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};