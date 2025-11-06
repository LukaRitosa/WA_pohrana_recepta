import express from 'express';
import { recepti } from '../data/data.js'
const router = express.Router();



router.get('/', (req, res)=>{
    res.status(200).json(recepti)
})


export default router
