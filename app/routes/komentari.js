import express from 'express';
import { komentari } from '../data/data.js'
const router = express.Router();



router.get('/', (req, res)=>{
    res.status(200).json(komentari)
})


export default router
