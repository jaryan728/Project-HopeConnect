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
  FeaturesDesigns,
  TestimonialsDesigns,
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

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

  const features_points = [
    {
      name: 'Community Reporting',
      description:
        'Easily report cases of children or elderly individuals needing assistance. Our platform ensures that help is just a click away.',
      icon: 'mdiAlertCircle',
    },
    {
      name: 'Volunteer Matching',
      description:
        'Connect with volunteer opportunities that match your skills and interests. Make a meaningful impact in your community.',
      icon: 'mdiAccountGroup',
    },
    {
      name: 'Secure Donations',
      description:
        'Contribute securely with our donation platform. Support impactful projects and see the difference your generosity makes.',
      icon: 'mdiGift',
    },
    {
      name: 'Geolocation Services',
      description:
        'Find nearby NGOs and resources with our geolocation feature, ensuring timely assistance and support for those in need.',
      icon: 'mdiMapMarker',
    },
    {
      name: 'Success Stories',
      description:
        'Stay updated with inspiring success stories from our community. See the real-world impact of your contributions and efforts.',
      icon: 'mdiBookOpen',
    },
    {
      name: 'Real-Time Updates',
      description:
        'Receive real-time updates on reported cases, volunteer opportunities, and donation impacts, keeping you informed and engaged.',
      icon: 'mdiClock',
    },
  ];

  const testimonials = [
    {
      text: "HopeConnect has revolutionized how we engage with our community. The platform's features are intuitive and have significantly increased our outreach.",
      company: 'Community Impact Solutions',
      user_name: 'Alice Thompson, Outreach Director',
    },
    {
      text: 'The volunteer matching service on HopeConnect is exceptional. It has allowed us to connect with passionate individuals who truly make a difference.',
      company: 'Volunteer Connectors',
      user_name: 'Robert Green, Volunteer Coordinator',
    },
    {
      text: 'Donating through HopeConnect is seamless and secure. We appreciate the transparency and the ability to track the impact of our contributions.',
      company: 'Generosity Partners',
      user_name: 'Linda White, Philanthropy Officer',
    },
    {
      text: 'The geolocation feature is a game-changer for us. It allows us to quickly find and assist those in need, making our efforts more effective.',
      company: 'Helping Hands Initiative',
      user_name: 'James Brown, Field Coordinator',
    },
    {
      text: "HopeConnect's user-friendly interface has made managing our community projects a breeze. We can focus more on making an impact.",
      company: 'Project Pioneers',
      user_name: 'Emma Wilson, Project Manager',
    },
    {
      text: 'The real-time updates keep us informed and engaged. HopeConnect aligns perfectly with our mission to empower communities.',
      company: 'Impact Innovators',
      user_name: 'Michael Davis, CEO',
    },
  ];

  const faqs = [
    {
      question: 'How can I report a case using HopeConnect?',
      answer:
        'To report a case, simply log in to your account, navigate to the reporting section, and fill out the necessary details. You can upload images and provide location information to ensure timely assistance.',
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
      question: 'Can I see the impact of my contributions?',
      answer:
        'Absolutely! HopeConnect provides updates on the projects you support, including success stories and testimonials from the community. This transparency allows you to see the real-world impact of your contributions.',
    },
    {
      question: 'How do I get started with volunteering?',
      answer:
        'To start volunteering, create an account on HopeConnect, browse available opportunities, and apply for the ones that match your skills and interests. Our platform will guide you through the process.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Our Services - Empowering Communities with ${projectName}`}</title>
        <meta
          name='description'
          content={`Explore the services offered by ${projectName}, including community reporting, volunteer matching, and secure donations. Learn how we connect and empower communities.`}
        />
      </Head>
      <WebSiteHeader projectName={'HopeConnect'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'HopeConnect'}
          image={['Empowering services for communities']}
          mainText={`Discover ${projectName} Services for Impact`}
          subTitle={`Explore how ${projectName} connects communities through innovative services. From reporting to volunteering, see how we empower individuals to make a difference.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore Our Services`}
        />

        <FeaturesSection
          projectName={'HopeConnect'}
          image={['Innovative community service features']}
          withBg={1}
          features={features_points}
          mainText={`Explore ${projectName} Core Services`}
          subTitle={`Discover the key services offered by ${projectName} that empower communities and foster positive change.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'HopeConnect'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL || ''}
          testimonials={testimonials}
          mainText={`What Our Users Say About ${projectName} `}
        />

        <FaqSection
          projectName={'HopeConnect'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} Services `}
        />

        <ContactFormSection
          projectName={'HopeConnect'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Connecting through communication']}
          mainText={`Connect with ${projectName} Support `}
          subTitle={`Reach out to us anytime for assistance or inquiries. Our team at ${projectName} is here to help and will respond promptly to your messages.`}
        />
      </main>
      <WebSiteFooter projectName={'HopeConnect'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
