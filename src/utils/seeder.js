const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

const { Role, User } = require("../models");

const roles = [
  {
    name: "admin",
  },
  {
    name: "instructor",
  },
  {
    name: "student",
  },
];

roles.forEach(async (role) => {
  await Role.create(role);

  console.log("...");
});

Array(100)
  .fill()
  .forEach(async (_, i) => {
    let firstname = faker.person.firstName();
    const user = {
      firstname,
      lastname: faker.person.lastName(),
      username: faker.internet.userName({ firstName: firstname }),
      email: faker.internet.email({
        firstName: firstname,
        provider: "learn.com",
      }),
      phone: faker.phone.number("09########"),
      role: faker.helpers.arrayElement(roles).name,
      password: "password",
      accountNo: faker.finance.accountNumber(),
      institute: "faker",
      avatar: faker.image.avatar(),
    };

    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await User.create(user);

    const userRole = await Role.findOne({ where: { name: user.role } });
    await newUser.addRole(userRole, { through: { selfGranted: false } });

    console.log("...");
  });
