import { Request, Response, NextFunction } from 'express';
import db from '../database/connect';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const addPost = async (req: Request, res: Response, next: NextFunction) => {
    await db.client.post.create({ data: req.body }).then(data => {
        return res.status(200).json(data);
    }).catch(err => {
        return res.status(400).json(err)
    })
};

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    await db.client.post.findMany().then(data => {
        return res.status(200).json(data)
    }).catch(err => {
        return res.status(400).json(err)
    })
}

const getPost = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;

    await db.client.post.findFirst({
        where: { id: parseInt(id) }
    }).then((data) => {
        return res.status(200).json(data)
    }).catch(err => {
        return res.status(400).json(err)
    })
}

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;

    let title: string = req.body.title || undefined;
    let body: string = req.body.body || undefined;
    let userId: number = req.body.userId || undefined;

    await db.client.post.update({
        where: { id: parseInt(id) },
        data: {
            title: title,
            body: body,
            userId: userId
        }
    }).then(data => {
        return res.status(200).json(data);
    }).catch(err => {
        return res.status(400).json(err)
    })
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;

    await db.client.post.delete({
        where: {
            id: parseInt(id),
        }
    }).then(data => {
        return res.status(200).json(data);
    }).catch(err => {
        return res.status(400).json(err)
    })
};

export default { getPosts, getPost, updatePost, deletePost, addPost };