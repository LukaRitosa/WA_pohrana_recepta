import express from 'express';
import { ocjene } from '../data/data.js'
const router = express.Router();



router.get('/', (req, res)=>{
    res.status(200).json(ocjene)
})


export default router
