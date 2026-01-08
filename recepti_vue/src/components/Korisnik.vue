<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { RouterLink } from 'vue-router'
    import { useRoute } from 'vue-router'



    const route = useRoute()

    const korisnik_id= route.params.id
    const korisnik = ref(null)
    const ocjene= ref([])
    const recepti= ref([])

  

    onMounted(async()=>{ 
        await ucitajKorisnika()
        await fetchOcjene()
        await fetchRecepti()
    })


    async function ucitajKorisnika() {
        try {
            const response = await axios.get(`http://localhost:3000/korisnici/${korisnik_id}`); 
            korisnik.value = response.data; 
            console.log(korisnik.value); 
        } catch (error) {
            console.error('Greška pri dohvaćanju podataka o korisniku:', error);
        }
    }



    function zvjezdice(prosjek){
        if(prosjek===null) return 

        const pune= Math.floor(prosjek)
        const pola= prosjek - pune >= 0.5 ? 1:0
        const prazne= 5- pune - pola

        return '★'.repeat(pune) + (pola ? '⯪': '') + '☆'.repeat(prazne)
    }

    async function fetchOcjene(){
        try{
            const rez= await axios.get(`http://localhost:3000/ocjene/korisnik/${korisnik_id}`)
            ocjene.value=rez.data.ocjene
        }  catch (error) {
            console.error('Greška pri dohvaćanju podataka o ocjenama:', error);
        }
    }

    async function fetchRecepti() {
        try{
            const rez= await axios.get(`http://localhost:3000/recepti/korisnik/${korisnik_id}`)
            recepti.value= rez.data.recepti
        } catch(error){
            console.error('Greška pri dohvatu recepta korisnika')
        }
    }

</script>


<template>
    <div class="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
        
        <RouterLink to="/" class="self-start mb-4 text-green-600 hover:underline font-semibold">
            Recepti
        </RouterLink>

        <RouterLink to="/korisnici" class="self-start mb-4 text-green-600 hover:underline font-semibold">
            Natrag na korisnike
        </RouterLink>

        <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6" v-if="korisnik">
            <h1 class="text-3xl font-extrabold text-green-700">
                {{ korisnik.ime }} {{ korisnik.prezime }}
            </h1>    


            <h2 class="text-xl font-semibold text-green-600">
                Recepti:
            </h2>
            <div v-if="recepti.length>0">
                <div v-for="recept in recepti">
                    <h3 class="text-l font-semibold text-green-500">
                        {{ recept.naziv }}
                    </h3>
                    <span>
                        {{ zvjezdice(recept.id) }}
                    </span>
                </div>
            </div>
            <div v-if="recepti.length==0">
                <h3 class="text-l font-semibold text-green-500">
                    Korisnik nema vlastitih recepata.
                </h3>
            </div>



            <h2 class="text-xl font-semibold text-green-600">
                Ocjene:
            </h2>
            <div v-if="ocjene.length>0">
                <div v-for="ocjena in ocjene">
                    <h3 class="text-l font-semibold text-green-500">
                        {{ ocjena.komentar }}
                    </h3>
                    <span>
                        {{ zvjezdice(ocjena.zvjezdice) }}
                    </span>
                </div>
            </div>
            <div v-if="ocjene.length==0">
                <h3 class="text-l font-semibold text-green-500">
                    Korisnik nema vlastitih recenzija.
                </h3>
            </div>

        </div>
    </div>
</template>


