const db = require('../models');
const Users = db.users;

const Donations = db.donations;

const Reports = db.reports;

const Volunteers = db.volunteers;

const DonationsData = [
  {
    // type code here for "relation_one" field

    item: 'Clothes',

    quantity: 50,

    location: 'Downtown',
  },

  {
    // type code here for "relation_one" field

    item: 'Books',

    quantity: 30,

    location: 'Central Park',
  },

  {
    // type code here for "relation_one" field

    item: 'Food',

    quantity: 100,

    location: 'East Side',
  },

  {
    // type code here for "relation_one" field

    item: 'Toys',

    quantity: 20,

    location: 'Riverbank',
  },

  {
    // type code here for "relation_one" field

    item: 'Blankets',

    quantity: 40,

    location: 'West End',
  },
];

const ReportsData = [
  {
    // type code here for "images" field

    description: 'Elderly person needing assistance in downtown area.',

    location: 'Downtown',

    status: 'resolved',

    // type code here for "relation_one" field
  },

  {
    // type code here for "images" field

    description: 'Child found wandering alone in the park.',

    location: 'Central Park',

    status: 'resolved',

    // type code here for "relation_one" field
  },

  {
    // type code here for "images" field

    description: 'Family in need of food supplies.',

    location: 'East Side',

    status: 'resolved',

    // type code here for "relation_one" field
  },

  {
    // type code here for "images" field

    description: 'Lost pet found near the river.',

    location: 'Riverbank',

    status: 'pending',

    // type code here for "relation_one" field
  },

  {
    // type code here for "images" field

    description: 'Homeless person requiring medical attention.',

    location: 'West End',

    status: 'resolved',

    // type code here for "relation_one" field
  },
];

const VolunteersData = [
  {
    // type code here for "relation_one" field

    skills: 'Teaching, First Aid',

    availability: 'Weekends',

    preferred_method: 'offline',
  },

  {
    // type code here for "relation_one" field

    skills: 'Cooking, Counseling',

    availability: 'Weekdays',

    preferred_method: 'offline',
  },

  {
    // type code here for "relation_one" field

    skills: 'Childcare, Tutoring',

    availability: 'Evenings',

    preferred_method: 'online',
  },

  {
    // type code here for "relation_one" field

    skills: 'Event Planning, Fundraising',

    availability: 'Flexible',

    preferred_method: 'online',
  },

  {
    // type code here for "relation_one" field

    skills: 'Mentoring, Public Speaking',

    availability: 'Mornings',

    preferred_method: 'online',
  },
];

// Similar logic for "relation_many"

async function associateDonationWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Donation0 = await Donations.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Donation0?.setUser) {
    await Donation0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Donation1 = await Donations.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Donation1?.setUser) {
    await Donation1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Donation2 = await Donations.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Donation2?.setUser) {
    await Donation2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Donation3 = await Donations.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Donation3?.setUser) {
    await Donation3.setUser(relatedUser3);
  }

  const relatedUser4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Donation4 = await Donations.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Donation4?.setUser) {
    await Donation4.setUser(relatedUser4);
  }
}

async function associateReportWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Report0 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Report0?.setUser) {
    await Report0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Report1 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Report1?.setUser) {
    await Report1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Report2 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Report2?.setUser) {
    await Report2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Report3 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Report3?.setUser) {
    await Report3.setUser(relatedUser3);
  }

  const relatedUser4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Report4 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Report4?.setUser) {
    await Report4.setUser(relatedUser4);
  }
}

async function associateVolunteerWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Volunteer0 = await Volunteers.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Volunteer0?.setUser) {
    await Volunteer0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Volunteer1 = await Volunteers.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Volunteer1?.setUser) {
    await Volunteer1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Volunteer2 = await Volunteers.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Volunteer2?.setUser) {
    await Volunteer2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Volunteer3 = await Volunteers.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Volunteer3?.setUser) {
    await Volunteer3.setUser(relatedUser3);
  }

  const relatedUser4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Volunteer4 = await Volunteers.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Volunteer4?.setUser) {
    await Volunteer4.setUser(relatedUser4);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Donations.bulkCreate(DonationsData);

    await Reports.bulkCreate(ReportsData);

    await Volunteers.bulkCreate(VolunteersData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateDonationWithUser(),

      await associateReportWithUser(),

      await associateVolunteerWithUser(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('donations', null, {});

    await queryInterface.bulkDelete('reports', null, {});

    await queryInterface.bulkDelete('volunteers', null, {});
  },
};
