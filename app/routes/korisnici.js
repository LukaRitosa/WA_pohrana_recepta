import express from 'express';
import { korisnici } from '../data/data.js'
const router = express.Router();



router.get('/', (req, res)=>{
    res.status(200).json(korisnici)
})


export default router
