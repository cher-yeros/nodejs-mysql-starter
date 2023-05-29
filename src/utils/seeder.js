const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

const { Role, User } = require("../models");
const { rolesString } = require("./constants");

const roles = [
  {
    key: "matrix-admin",
    label: "Matrix administrator",
    erp: "mefm",
  },
  {
    key: "system-admin",
    label: "System administrator",
    erp: "mefm",
  },
  {
    key: "admin",
    label: "Administrator",
    erp: "mefm",
  },

  {
    key: "finance",
    label: "Finance",
    erp: "mefm",
  },
  {
    key: "hr",
    longkey: "human-resource",
    label: "Human Resource",
    erp: "mefm",
  },
  {
    key: "service",
    label: "Service",
    erp: "mefm",
  },
  {
    key: "purchaser",
    label: "Purchaser",
    erp: "mefm",
  },
  {
    key: "cxo",
    longkey: "chief-experience-officer",
    label: "Chef Experience Officer",
    erp: "mefm",
  },
  {
    key: "crm",
    longkey: "customer-relashionship-management",
    label: "Customer Relationship Management",
    erp: "mefm",
  },

  {
    key: "cxo",
    longkey: "chief-experience-officer",
    label: "Chef Experience Officer",
    erp: "mep",
  },
  {
    key: "crm",
    longkey: "customer-relashionship-management",
    label: "Customer Relationship Management",
    erp: "mep",
  },
  {
    key: "matrix-admin",
    label: "Matrix administrator",
    erp: "mep",
  },
  {
    key: "system-admin",
    label: "System administrator",
    erp: "mep",
  },
  {
    key: "admin",
    label: "Administrator",
    erp: "mep",
  },
  {
    key: "hr",
    longkey: "human-resource",
    label: "Human Resource",
    erp: "mep",
  },
  {
    key: "fd",
    longkey: "factory-director",
    label: "Factory Director",
    erp: "mep",
  },
  {
    key: "lm",
    longkey: "logistic-manager",
    label: "Human Resource",
    erp: "mep",
  },
  {
    key: "pmm",
    longkey: "planning-and-maps-manager",
    label: "Planning & MAPS Manager",
    erp: "mep",
  },
  {
    key: "wm",
    longkey: "warehouse-manager",
    label: "Warehouse Manager",
    erp: "mep",
  },
  {
    key: "pm",
    longkey: "purchasing-manager",
    label: "Human Resource",
    erp: "mep",
  },
  {
    key: "im",
    longkey: "inspection manager",
    label: "Inspection Manager",
    erp: "mep",
  },
];

roles.forEach(async (role) => {
  await Role.create(role);
});

const users = [
  {
    firstname: "Hirut",
    erp: "mefm",
    lastname: "Bekele",
    username: "admin123",
    email: "admin@mail.com",
    phone: "915245780",
    roles: ["admin"],
    password: "12345678",
  },
  {
    firstname: "Hirut",
    erp: "mefm",
    lastname: "Bekele",
    username: "finance123",
    email: "finance@mail.com",
    phone: "915245781",
    roles: ["finance"],
    password: "12345678",
  },
  {
    firstname: "Hirut",
    erp: "mefm",
    lastname: "Bekele",
    username: "hr_123",
    email: "hr@mail.com",
    phone: "915245782",
    roles: ["hr"],
    password: "12345678",
  },
  {
    firstname: "Hirut",
    erp: "mefm",
    lastname: "Bekele",
    username: "service123",
    email: "service@mail.com",
    phone: "915245783",
    roles: ["service"],
    password: "12345678",
  },
  {
    firstname: "Hirut",
    erp: "mefm",
    lastname: "Bekele",
    username: "cxo123",
    email: "cxo@mail.com",
    phone: "915245784",
    roles: ["cxo"],
    password: "12345678",
  },
  {
    firstname: "Hirut",
    erp: "mefm",
    lastname: "Bekele",
    username: "crm123",
    email: "crm@mail.com",
    phone: "915245785",
    roles: ["crm"],
    password: "12345678",
  },
  {
    firstname: "Hirut",
    erp: "mefm",
    lastname: "Bekele",
    username: "purchaser123",
    email: "purchaser@mail.com",
    phone: "915246786",
    roles: ["purchaser"],
    password: "12345678",
  },
  {
    firstname: "Hirut",
    erp: "mefm",
    lastname: "Bekele",
    username: "cxoadmin123",
    email: "cxoadmin@mail.com",
    phone: "915291786",
    roles: ["cxo", "admin"],
    password: "12345678",
  },
  {
    firstname: "Hirut",
    erp: "mefm",
    lastname: "Bekele",
    username: "cxohr123",
    email: "cxohr@mail.com",
    phone: "913241786",
    roles: ["cxo", "hr"],
    password: "12345678",
  },
  {
    firstname: "Hirut",
    erp: "mefm",
    lastname: "Bekele",
    username: "crmcxoservice123",
    email: "crmcxoservice@mail.com",
    phone: "910241786",
    roles: ["cxo", "crm", "service"],
    password: "12345678",
  },
  {
    firstname: "Hirut",
    erp: "mefm",
    lastname: "Bekele",
    username: "hrservice123",
    email: "hrservice@mail.com",
    phone: "915241286",
    roles: ["hr", "service"],
    password: "12345678",
  },
  {
    firstname: "Yerosen",
    lastname: "Diriba",
    username: "systemadmin",
    email: "systemadmin@mail.com",
    phone: "915241513",
    roles: ["system-admin"],
    password: "12345678",
    erp: "mep",
  },
  {
    firstname: "Yerosen",
    lastname: "Diriba",
    username: "matrixadmin",
    email: "matrixadmin@mail.com",
    phone: "915981513",
    roles: ["matrix-admin"],
    password: "12345678",
    erp: "mep",
  },

  {
    firstname: "Hirut",
    erp: "mep",
    lastname: "Bekele",
    username: "purchaser123",
    email: "purchaser@mail.com",
    phone: "915246786",
    roles: ["purchaser"],
    password: "12345678",
  },
  {
    firstname: "Hirut",
    erp: "mep",
    lastname: "Bekele",
    username: "cxoadmin123",
    email: "cxoadmin@mail.com",
    phone: "915291786",
    roles: ["cxo", "admin"],
    password: "12345678",
  },
  {
    firstname: "Hirut",
    erp: "mep",
    lastname: "Bekele",
    username: "cxohr123",
    email: "cxohr@mail.com",
    phone: "913241786",
    roles: ["cxo", "hr"],
    password: "12345678",
  },
  {
    firstname: "Hirut",
    erp: "mep",
    lastname: "Bekele",
    username: "crmcxoservice123",
    email: "crmcxoservice@mail.com",
    phone: "910241786",
    roles: ["cxo", "crm", "service"],
    password: "12345678",
  },
  {
    firstname: "Hirut",
    erp: "mep",
    lastname: "Bekele",
    username: "hrservice123",
    email: "hrservice@mail.com",
    phone: "915241286",
    roles: ["hr", "service"],
    password: "12345678",
  },
  {
    firstname: "Yerosen",
    lastname: "Diriba",
    username: "systemadmin",
    email: "systemadmin@mail.com",
    phone: "915241513",
    roles: ["system-admin"],
    password: "12345678",
    erp: "mep",
  },
];

users.forEach(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
  const newUser = await User.create(user);

  user.roles.forEach(async (role) => {
    const userRole = await Role.findOne({ where: { key: role } });
    await newUser.addRole(userRole, { through: { selfGranted: false } });
  });
});

Array(100)
  .fill()
  .forEach(async (_, i) => {
    let firstname = faker.name.firstName();
    const user = {
      firstname,
      lastname: faker.name.lastName(),
      username: faker.internet.userName(firstname),
      email: faker.internet.email(firstname, "matrix", "et.com"), // 'Jeanne_Doe88@example.fakerjs.dev'
      phone: faker.phone.number("9########"),
      erp: faker.helpers.arrayElement(["mefm", "mep"]),
      role: faker.helpers.arrayElement(rolesString),
      password: "12345678",
    };
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await User.create(user);

    const userRole = await Role.findOne({ where: { key: user.role } });
    await newUser.addRole(userRole, { through: { selfGranted: false } });
    // user.roles.forEach(async (role) => {

    // });
  });
