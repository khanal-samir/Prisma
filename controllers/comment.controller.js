import prisma from "../db/db.config.js";
//crud
export const createComment = async (req, res) => {
  const { user_id, post_id, comment } = req.body;

  const newComment = await prisma.comment.create({
    data: {
      user_id: Number(user_id),
      post_id: Number(post_id),
      comment,
    },
  });
  //increment commentCount on post
  await prisma.post.update({
    where: {
      id: Number(post_id),
    },
    data: {
      comment_count: {
        increment: 1, // increase by one
      },
    },
  });

  return res.json({
    status: 200,
    message: "Comment created",
    data: newComment,
  });
};

export const updateComment = async (req, res) => {
  const { comment } = req.body;
  const { commentId } = req.params;

  await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      comment,
    },
  });

  return res.json({
    status: 200,
    message: "Comment updated successfully",
  });
};

export const fetchComments = async (req, res) => {
  const posts = await prisma.comment.findMany({
    select: {
      user: true,
      post: true,
    },
  });
  return res.json({ status: 200, data: posts });
};

export const showComment = async (req, res) => {
  const { commentId } = req.params;
  const post = await prisma.comment.findFirst({
    // or use findunique
    where: {
      id: commentId,
    },
  });
  return res.json({ status: 200, data: post });
};

export const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  await prisma.comment.delete({
    where: {
      id: Number(commentId),
    },
  });
  await prisma.post.update({
    where: {
      id: Number(post_id),
    },
    data: {
      comment_count: {
        decrement: 1, // decrease by one
      },
    },
  });
  return res.json({ status: 200, message: "Comment deleted" });
};
