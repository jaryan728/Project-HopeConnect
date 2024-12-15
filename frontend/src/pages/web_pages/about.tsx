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
  AboutUsDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

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
      name: 'Impactful Donations',
      description:
        'Securely donate to support impactful projects. See the difference your contributions make in real-time.',
      icon: 'mdiHeart',
    },
  ];

  const testimonials = [
    {
      text: "Using HopeConnect has been a transformative experience for our organization. The platform's ease of use and powerful features have significantly increased our outreach.",
      company: 'Community Impact Solutions',
      user_name: 'Alice Thompson, Outreach Director',
    },
    {
      text: 'HopeConnect has made volunteering more accessible and rewarding. The ability to match my skills with opportunities has been invaluable.',
      company: 'Volunteer Connectors',
      user_name: 'Robert Green, Volunteer Coordinator',
    },
    {
      text: 'The secure donation process on HopeConnect gives us confidence that our contributions are making a real difference.',
      company: 'Generosity Partners',
      user_name: 'Linda White, Philanthropy Officer',
    },
    {
      text: "HopeConnect's geolocation feature has been a game-changer for us, allowing us to quickly find and assist those in need.",
      company: 'Helping Hands Initiative',
      user_name: 'James Brown, Field Coordinator',
    },
    {
      text: "The platform's user-friendly interface has made it simple for us to manage and track our community projects effectively.",
      company: 'Project Pioneers',
      user_name: 'Emma Wilson, Project Manager',
    },
    {
      text: "HopeConnect aligns perfectly with our mission to empower communities. It's a powerful tool for creating positive change.",
      company: 'Impact Innovators',
      user_name: 'Michael Davis, CEO',
    },
  ];

  const faqs = [
    {
      question: 'How does HopeConnect help communities?',
      answer:
        'HopeConnect connects individuals with nearby NGOs, volunteer opportunities, and donation options. Our platform empowers users to report cases, volunteer, and donate, making a positive impact in their communities.',
    },
    {
      question: 'Is it safe to donate through HopeConnect?',
      answer:
        'Yes, HopeConnect ensures a secure donation process. We use encryption and secure payment gateways to protect your information and ensure your contributions reach the intended projects.',
    },
    {
      question: 'How can I volunteer through HopeConnect?',
      answer:
        'You can browse volunteer opportunities on HopeConnect by specifying your skills and interests. Our platform matches you with opportunities that align with your expertise, making it easy to get involved.',
    },
    {
      question: 'What types of cases can I report?',
      answer:
        'HopeConnect allows you to report cases involving children or elderly individuals in need of assistance. You can upload images and provide location details to ensure timely help from nearby NGOs.',
    },
    {
      question: 'How does the geolocation feature work?',
      answer:
        'Our geolocation feature uses your location to show nearby NGOs and opportunities. This ensures that you can quickly find and connect with resources in your area, making assistance more accessible.',
    },
    {
      question: 'Can I track the impact of my donations?',
      answer:
        'Yes, HopeConnect provides updates on the projects you support. You can see how your contributions are making a difference, with testimonials and success stories from the community.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`About HopeConnect - Our Mission and Vision`}</title>
        <meta
          name='description'
          content={`Learn more about HopeConnect, our mission to empower communities, and how we connect individuals to make a positive impact.`}
        />
      </Head>
      <WebSiteHeader projectName={'HopeConnect'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'HopeConnect'}
          image={['Inspiring community connections and impact']}
          mainText={`Discover the Heart of ${projectName}`}
          subTitle={`Explore the mission and values that drive ${projectName}. Learn how we connect communities to create lasting change.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Join Our Journey`}
        />

        <AboutUsSection
          projectName={'HopeConnect'}
          image={['Empowering communities through connection']}
          mainText={`Our Mission at ${projectName}`}
          subTitle={`${projectName} is committed to fostering community connections and empowering individuals. Discover our story and the values that guide us.`}
          design={AboutUsDesigns.IMAGE_RIGHT || ''}
          buttonText={`Learn More About Us`}
        />

        <FeaturesSection
          projectName={'HopeConnect'}
          image={['Innovative community-driven features']}
          withBg={1}
          features={features_points}
          mainText={`Explore ${projectName} Core Features`}
          subTitle={`Discover how ${projectName} connects communities and empowers individuals through innovative features designed to make a difference.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'HopeConnect'}
          design={TestimonialsDesigns.MULTI_CARD_DISPLAY || ''}
          testimonials={testimonials}
          mainText={`Hear from Our ${projectName} Community `}
        />

        <FaqSection
          projectName={'HopeConnect'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'HopeConnect'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
