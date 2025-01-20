import prisma from "../db/db.config.js";
//crud
export const createPost = async (req, res) => {
  const { user_id, title, description } = req.body;

  const newPost = await prisma.post.create({
    data: {
      user_id: Number(user_id),
      title,
      description,
    },
  });

  return res.json({ status: 200, message: "Post created", data: newPost });
};

export const updatePost = async (req, res) => {
  const { title, description } = req.body;
  const { postId } = req.params;

  await prisma.post.update({
    where: {
      id: Number(postId),
    },
    data: {
      title,
      description,
    },
  });

  return res.json({
    status: 200,
    message: "Post updated successfully",
  });
};

export const fetchPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      comment: true,
    },
  });
  return res.json({ status: 200, data: posts });
};

export const showPost = async (req, res) => {
  const { postId } = req.params;
  const post = await prisma.post.findFirst({
    // or use findunique
    where: {
      id: Number(postId),
    },
    include: {
      comment: {
        select: {
          comment: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      _count: {
        select: {
          comment: true,
        },
      },
    },
  });
  return res.json({ status: 200, data: post });
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  await prisma.post.delete({
    where: {
      id: Number(postId),
    },
  });
  return res.json({ status: 200, message: "Post deleted" });
};
