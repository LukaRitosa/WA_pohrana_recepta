import express from 'express';
import { komentari, recepti } from '../data/data.js'
const router = express.Router();



router.get('/', (req, res)=>{
    res.status(200).json(komentari)
})

router.get('/:id', (req, res)=>{
    const id_komentar=req.params.id

    const komentar= komentari.find(k => k.id== id_komentar)

    if(!komentar){
        return res.status(404).json({greska: 'Komentar ne postoji'})
    }

    return res.status(200).json(komentar)
})

router.get('/thread/:id', (req, res)=>{
    const id_komentar=req.params.id

    const komentar= komentari.find(k => k.id== id_komentar)

    if(!komentar){
        return res.status(404).json({greska: 'Komentar ne postoji'})
    }

    const stvoriThread= (komentar_id) =>{
        let odgovori= komentari.filter(k => k.odgovor==komentar_id)
        
        return odgovori.map(o => ({
            ...o,
            odgovori: stvoriThread(o.id)
        }))
    }

    const thread = {
        ...komentar,
        odgovori: stvoriThread(komentar.id)
    }

    return res.status(200).json(thread)
})

router.post('/', (req, res)=>{
    const komentar=req.body

    const dozvoljeni_kljucevi= ['id_recept', 'id_korisnik', 'tekst', 'odgovor']

    const kljucevi_komentar= Object.keys(komentar)

    const krivi_kljucevi= kljucevi_komentar.some(k => !dozvoljeni_kljucevi.includes(k))

    if(krivi_kljucevi){
        return res.status(400).json({greska: 'Krivi oblik komentara'})
    }

    const novi_id= komentari.at(-1)['id'] + 1

    komentari.push({id: novi_id, ...komentar})

    return res.status(201).json(komentari)
})

router.delete('/:id', (req, res)=>{
    const id_komentar= req.params.id

    const index= komentari.findIndex(k => k.id==id_komentar)

    if(index == -1){
        return res.status(404).json({greska: 'Ne možete obrisati ne postojeći komentar'})
    }

    let thread= komentari.filter(k => k.odgovor==id_komentar)


    komentari.splice(index, 1)
})


export default router
