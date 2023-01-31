import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import db from '../database/connect';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    const posts = await db.post.findMany();
    return res.status(200).json(posts)
}

const getPost = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    const post = await db.post.findFirst({
        where: { id: parseInt(id) }
    })
    return res.status(200).json(post)
}

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;

    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    let userId: number = req.body.userId ?? 0;

    let data = {}

    if (title !== null) {
        console.log(title);
    }

    if (body !== null) {
        console.log(body);
    }

    if (userId !== 0) {
        console.log(userId);
    }

    const post = await db.post.update({
        where: { id: parseInt(id) },
        data: {
            title: title,
            body: body,
            userId: userId
        }
    })

    return res.status(200).json(post);
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};

const addPost = async (req: Request, res: Response, next: NextFunction) => {
    const post = await db.post.create({ data: req.body });
    return res.status(200).json(post);
};

export default { getPosts, getPost, updatePost, deletePost, addPost };