import prisma from "../db/db.config.js";
//crud
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const findUser = await prisma.user.findUnique({
    // unique for easier finding unique element
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.json({ status: 400, message: "Email already taken" });
  }

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  return res.json({ status: 200, message: "user created", data: newUser });
};

export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { userId } = req.params;

  await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      name,
      password,
      email,
    },
  });

  return res.json({
    status: 200,
    message: "User updated successfully",
  });
};

export const fetchUsers = async (req, res) => {
  const users = await prisma.user.findMany({});
  return res.json({ status: 200, data: users });
};

export const showUser = async (req, res) => {
  const { userId } = req.params;
  const user = await prisma.user.findFirst({
    // or use findunique
    where: {
      id: Number(userId),
    },
  });
  return res.json({ status: 200, data: user });
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  await prisma.user.delete({
    where: {
      id: Number(userId),
    },
  });
  return res.json({ status: 200, message: "user deleted" });
};
