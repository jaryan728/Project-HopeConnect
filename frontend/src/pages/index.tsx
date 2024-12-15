import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../stores/hooks';
import LayoutGuest from '../layouts/Guest';
import WebSiteHeader from '../components/WebPageComponents/Header';
import WebSiteFooter from '../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FeaturesDesigns,
  AboutUsDesigns,
  TestimonialsDesigns,
  ContactFormDesigns,
} from '../components/WebPageComponents/designs';

import HeroSection from '../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../components/WebPageComponents/FeaturesComponent';

import AboutUsSection from '../components/WebPageComponents/AboutUsComponent';

import TestimonialsSection from '../components/WebPageComponents/TestimonialsComponent';

import ContactFormSection from '../components/WebPageComponents/ContactFormComponent';

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
      name: 'Geolocation Integration',
      description:
        'Find nearby NGOs easily with our geolocation feature, ensuring help is always within reach for those in need.',
      icon: 'mdiMapMarker',
    },
    {
      name: 'Volunteer Opportunities',
      description:
        'Connect with meaningful volunteer opportunities. Share your skills and make a difference in the lives of children and the elderly.',
      icon: 'mdiHandshake',
    },
    {
      name: 'Secure Donations',
      description:
        'Contribute securely with our donation platform. Support impactful projects and see the difference your generosity makes.',
      icon: 'mdiGift',
    },
  ];

  const testimonials = [
    {
      text: 'HopeConnect has transformed how we engage with our community. The platform is intuitive and has made volunteering more accessible than ever.',
      company: 'Community Builders Inc.',
      user_name: 'Jane Doe, Community Outreach Coordinator',
    },
    {
      text: 'Thanks to HopeConnect, our NGO has been able to reach more people in need. The geolocation feature is a game-changer for us.',
      company: 'Helping Hands Network',
      user_name: 'John Smith, Director',
    },
    {
      text: 'The secure donation process on HopeConnect gives us peace of mind. We can see the impact of our contributions firsthand.',
      company: 'Generous Hearts Foundation',
      user_name: 'Emily Johnson, Philanthropy Manager',
    },
    {
      text: 'Volunteering through HopeConnect has been a rewarding experience. The platform makes it easy to find opportunities that match my skills.',
      company: 'Volunteer Ventures',
      user_name: 'Michael Brown, Volunteer',
    },
    {
      text: "HopeConnect's mission aligns perfectly with our values. It's a powerful tool for making a real difference in the world.",
      company: 'Impact Innovators',
      user_name: 'Sarah Lee, CEO',
    },
    {
      text: 'The user-friendly interface of HopeConnect has made it simple for us to manage and track our community projects effectively.',
      company: 'Project Pioneers',
      user_name: 'David Wilson, Project Manager',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`HopeConnect - Empowering Communities Through Connection`}</title>
        <meta
          name='description'
          content={`Join HopeConnect to report, volunteer, and donate. Discover our mission to support children and the elderly, and see how you can make a difference.`}
        />
      </Head>
      <WebSiteHeader projectName={'HopeConnect'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'HopeConnect'}
          image={['Community support and empowerment']}
          mainText={`Empower Communities with ${projectName} Today`}
          subTitle={`Join ${projectName} to connect, volunteer, and make a difference. Help us support children and the elderly in need.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Get Involved Now`}
        />

        <FeaturesSection
          projectName={'HopeConnect'}
          image={['Empowering community connections']}
          withBg={1}
          features={features_points}
          mainText={`Discover Key Features of ${projectName}`}
          subTitle={`Explore how ${projectName} empowers communities through innovative features designed to connect, support, and inspire.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <AboutUsSection
          projectName={'HopeConnect'}
          image={['Community-driven mission and impact']}
          mainText={`Join the Mission of ${projectName}`}
          subTitle={`${projectName} is dedicated to connecting communities, empowering individuals, and fostering positive change. Learn more about our mission and how you can be a part of it.`}
          design={AboutUsDesigns.IMAGE_RIGHT || ''}
          buttonText={`Learn More`}
        />

        <TestimonialsSection
          projectName={'HopeConnect'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL || ''}
          testimonials={testimonials}
          mainText={`What People Say About ${projectName} `}
        />

        <ContactFormSection
          projectName={'HopeConnect'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Connecting communities through communication']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Reach out to us anytime. Our team at ${projectName} is here to assist you and will respond promptly to your inquiries.`}
        />
      </main>
      <WebSiteFooter projectName={'HopeConnect'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
