import express from 'express';
import { recepti, korisnici, ocjene, komentari } from '../data/data.js'
const router = express.Router();



router.get('/', (req, res)=>{
    res.status(200).json(recepti)
})

router.get('/:id', (req, res)=>{
    const id_recept= req.params.id

    const recept= recepti.find(r => r.id== id_recept)

    if(!recept){
        return res.status(404).json({greska: 'Traženi recept ne postoji'})
    }

    return res.status(200).json(recept)
})

router.get('/korisnik/:id', (req, res)=>{
    const korisnik_id= req.params.id

    const korisnik= korisnici.find(k=> k.id== korisnik_id)

    if(!korisnik){
        return res.status(404).json({greska: 'Taj korisnik ne postoji'})
    }

    const korisnikovi_recepti= recepti.filter(r => r.id_korisnik==korisnik_id)

    if(korisnikovi_recepti.length==0){
        return res.status(200).json({korisnik, recepti: 'Korisnik još nema recepta'})
    }

    return res.status(200).json({korisnik, recepti: korisnikovi_recepti})
})

router.post('/', (req, res)=>{
    const novi_recept= req.body

    const dozvoljeni_kljucevi= ['id_korisnik', 'naziv', 'opis', 'sastojci', 'upute', 'kategorija']

    const kljucevi_recepta=Object.keys(novi_recept)

    const krivi_kljucevi=kljucevi_recepta.some(r => !dozvoljeni_kljucevi.includes(r))

    if(krivi_kljucevi){
        return res.status(400).json({greska: 'Krivi oblik recepta'})
    }

    const novi_id=recepti.at(-1)['id'] + 1

    recepti.push({id: novi_id, ...novi_recept})

    return res.status(201).json(recepti)
})

router.delete('/:id', (req, res)=>{
    const recept_id= req.params.id

    const index= recepti.findIndex(r => r.id == recept_id)

    if(index == -1){
        return res.status(404).json({greska: 'Recept koji ne postoji, ne može se obrisati'})
    }

    recepti.splice(index, 1)

    console.log(recepti) 

    const novi_komentari= komentari.filter(k => k.id_recept != recept_id)

    komentari.length=0

    komentari.push(...novi_komentari)


    console.log(komentari) 


    const nove_ocjene= ocjene.filter(o => o.id_recept != recept_id)

    ocjene.length=0

    ocjene.push(...nove_ocjene)


    console.log(ocjene)


    return res.status(204).json({odgovor: 'Recept izbrisan'})
})

export default router
