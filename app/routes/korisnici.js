import express from 'express';
import { korisnici } from '../data/data.js'
const router = express.Router();



router.get('/', (req, res)=>{
    res.status(200).json(korisnici)
})


router.get('/:id', (req, res)=>{
    const id_korisnik=req.params.id

    const korisnik=korisnici.find(k => k.id == id_korisnik)

    if(!korisnik){
        return res.status(401).json({greska: 'Ne postoji korisnik kojeg pokušavate pronaći'})
    }

    return res.status(200).json(korisnik)
})

router.post('/', (req, res)=>{
    const novi_korisnik= req.body

    const dozvoljeni_kljucevi= ['ime', 'prezime', 'email']

    const kljucevi_korisnika=Object.keys(novi_korisnik)

    const krivi_kljucevi= kljucevi_korisnika.some(k => !dozvoljeni_kljucevi.includes(k))

    if(krivi_kljucevi){
        return res.status(400).json({greska: 'Nepravilan oblik korisnika'})
    }

    const novi_id= korisnici.at(-1)['id'] + 1 

    korisnici.push({id: novi_id, ... novi_korisnik})

    return res.status(201).json(korisnici)
})

router.delete('/:id', (req, res)=>{
    const id_korisnik= req.params.id

    const index= korisnici.findIndex(k => k.id == id_korisnik)

    if(index == -1){
        return res.status(404).json({greska: 'Ne postoji korisnik kojeg pokušavate obrisati'})
    }

    console.log(korisnici)

    korisnici.splice(index, 1)

    console.log(korisnici)

    return res.status(204).json({odgovor: 'Korisnik obrisan'})
})

export default router
