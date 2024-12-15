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
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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
      question: 'What is the main purpose of HopeConnect?',
      answer:
        'HopeConnect aims to empower communities by connecting individuals with NGOs, volunteer opportunities, and donation options. Our platform facilitates reporting, volunteering, and donating to make a positive impact.',
    },
    {
      question: 'How do I create an account on HopeConnect?',
      answer:
        "To create an account, click on the 'Register' button on the homepage. Fill in your details, verify your email, and you're ready to start using HopeConnect's features.",
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
    {
      question: 'How can I update my volunteer profile?',
      answer:
        "To update your volunteer profile, log in to your account, navigate to the 'Profile' section, and make the necessary changes. You can update your skills, availability, and contact information.",
    },
    {
      question: 'What types of donations can I make?',
      answer:
        'You can donate funds, food, clothes, and other essential items through HopeConnect. Our platform ensures that your contributions reach the right projects and make a meaningful impact.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}. Learn more about our services, features, and how we empower communities.`}
        />
      </Head>
      <WebSiteHeader projectName={'HopeConnect'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'HopeConnect'}
          image={['Answers to common questions']}
          mainText={`Your Questions Answered at ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your questions about ${projectName}. Learn how we connect and empower communities.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Find Out More`}
        />

        <FaqSection
          projectName={'HopeConnect'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Common Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'HopeConnect'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Connecting through communication']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`Have more questions? Contact us anytime. Our team at ${projectName} is ready to assist you and will respond promptly to your inquiries.`}
        />
      </main>
      <WebSiteFooter projectName={'HopeConnect'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
