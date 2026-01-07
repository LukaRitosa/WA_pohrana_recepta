import express from 'express';
import { komentari, ocjene, recepti } from '../data/data.js'
const router = express.Router();



router.get('/', (req, res)=>{
    res.status(200).json(ocjene)
})

router.get('/:id', (req, res)=>{
    const id_ocjena= req.params.id

    const ocjena= ocjene.find(o => o.id == id_ocjena)

    if(!ocjena){
        return res.status(404).json({greska: `Ocejna sa id-em ${id_ocjena} ne postoji`})
    }

    return res.status(200).json(ocjena)
})

router.get('/recept/:id', (req, res)=>{
    const id_recept= req.params.id

    const recept= recepti.find(r => r.id == id_recept)

    if(!recept){
        return res.status(404).json({greska: `Recept sa id-em ${id_recept} ne postoji`})
    }

    const ocjene_za_recept= ocjene.filter(o => o.id_recept == id_recept)

    if(ocjene_za_recept.length==0){
        return res.status(200).json({recept, ocjene: `Ovaj recept još nema ocjene`})
    }

    return res.status(200).json({recept, ocjene: ocjene_za_recept})
})

router.get('/recept/:id/avg', (req, res)=>{
    const id_recept= req.params.id

    const recept= recepti.find(r => r.id == id_recept)

    if(!recept){
        return res.status(404).json({greska: `Recept sa id-em ${id_recept} ne postoji`})
    }

    const ocjene_za_recept= ocjene.filter(o => o.id_recept == id_recept)

    if(ocjene_za_recept.length==0){
        return res.status(200).json({recept, prosjek: null, brojOcjena: 0})
    }

    const suma= ocjene_za_recept.reduce((ukupno, o)=> ukupno + o.zvjezdice, 0)

    const prosjek= Number((suma/ocjene_za_recept.length).toFixed(1))

    return res.status(200).json({recept, prosjek, brojOcjena: ocjene_za_recept.length})
})

router.post('/', (req, res)=>{
    const nova_ocjena=req.body

    const dozvoljeni_kljucevi= ['id_recept', 'id_korisnik', 'zvjezdice', 'komentar']

    const ocjena_kljucevi= Object.keys(nova_ocjena)

    const krivi_kljucevi= ocjena_kljucevi.some(k => !dozvoljeni_kljucevi.includes(k))

    if(krivi_kljucevi){
        return res.status(400).json({greska: 'Krivi oblik ocjene'})
    }

    if(nova_ocjena.zvjezdice<1 || nova_ocjena.zvjezdice>5){
        return res.status(404).json({greska: 'Ocjena mora biti u rasponu od 1 do 5 zvjezdica'})
    }

    const novi_id= ocjene.at(-1)['id'] + 1

    ocjene.push({id: novi_id, ...nova_ocjena})

    return res.status(201).json(ocjene)
})

export default router
