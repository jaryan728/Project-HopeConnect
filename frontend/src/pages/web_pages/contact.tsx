import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'HopeConnect';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/about',
      label: 'about',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },

    {
      href: '/contact',
      label: 'contact',
    },
  ];

  const faqs = [
    {
      question: 'How do I create an account on HopeConnect?',
      answer:
        "To create an account, click on the 'Register' button on the homepage. Fill in your details, verify your email, and you're ready to start using HopeConnect's features.",
    },
    {
      question: 'What types of volunteer opportunities are available?',
      answer:
        'HopeConnect offers a variety of volunteer opportunities, ranging from teaching and mentoring to community support roles. You can filter opportunities based on your skills and interests to find the perfect match.',
    },
    {
      question: 'Is my donation secure on HopeConnect?',
      answer:
        'Yes, your donation is secure. We use encryption and secure payment gateways to protect your information. You can also track the impact of your donations through our platform.',
    },
    {
      question: 'How does the geolocation feature work?',
      answer:
        "The geolocation feature uses your device's location to show nearby NGOs and resources. This ensures that you can quickly find and connect with assistance in your area.",
    },
    {
      question: 'Can I track the status of a reported case?',
      answer:
        "Yes, once you report a case, you can track its status through your account dashboard. You'll receive updates as the case progresses, ensuring transparency and timely assistance.",
    },
    {
      question: 'Are there any fees for using HopeConnect?',
      answer:
        'HopeConnect is free to use for individuals and NGOs. We aim to provide a platform that facilitates community support without any financial barriers.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us - Get in Touch with ${projectName}`}</title>
        <meta
          name='description'
          content={`Reach out to ${projectName} for any inquiries or support. Our team is here to assist you with any questions you may have.`}
        />
      </Head>
      <WebSiteHeader projectName={'HopeConnect'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'HopeConnect'}
          image={['Connecting with our support team']}
          mainText={`Connect with ${projectName} Today`}
          subTitle={`Have questions or need assistance? Reach out to the ${projectName} team. We're here to help and look forward to hearing from you.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Contact Us Now`}
        />

        <FaqSection
          projectName={'HopeConnect'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'HopeConnect'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Direct communication with support']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`We're here to assist you with any questions or concerns. Contact us anytime, and the ${projectName} team will respond promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'HopeConnect'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
