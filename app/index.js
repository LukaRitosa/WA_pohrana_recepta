import object from 'module'
import express from 'express'
import receptiRouter from './routes/recepti.js'
import korisniciRouter from './routes/korisnici.js'
import komentariRouter from './routes/komentari.js'
import ocjeneRouter from './routes/ocjene.js'



let port = 3000
let app= express()

app.use(express.json())
app.use('/recepti', receptiRouter)
app.use('/korisnici', korisniciRouter)
app.use('/komentari', komentariRouter)
app.use('/ocjene', ocjeneRouter)


app.listen(port, (error)=>{
    if(error){
        console.error('Ne radi startanje')
    }
    else{
        console.error(`Posložitelj sluša na ${port}`)
    }
})

console.log(app)