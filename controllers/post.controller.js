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
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  if (page <= 0) page = 1;
  if (limit <= 0 || limit > 100) limit = 10;
  const skip = (page - 1) * limit; // how many data to skip
  const posts = await prisma.post.findMany({
    skip: skip,
    take: limit,
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
        orderBy: {
          created_at: "desc",
        },
      },
      _count: {
        select: {
          comment: true,
        },
      },
    },
    where: {
      title: {
        // startsWith: "a",
        equals: "Post 1",
      },
      comment_count: {
        gte: 1,
      },
    },
  });

  // to get the total postCount
  const totalPosts = await prisma.post.count();
  const totalPages = Math.ceil(totalPosts / limit);
  return res.json({
    status: 200,
    data: posts,
    meta: {
      totalPages,
      currentPage: page,
      limit,
    },
  });
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
    orderBy: {
      id: "desc",
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

// searching

export const searchPost = async (req, res) => {
  const query = req.query.q;
  const posts = await prisma.post.findMany({
    where: {
      description: {
        search: query, // searches that includes query text
      },
    },
  });
  return res.json({
    status: 200,
    data: posts,
  });
};
