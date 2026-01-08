<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { RouterLink } from 'vue-router'
    import { useRoute } from 'vue-router'



    const route = useRoute()

    const recept_id= route.params.id
    const recept = ref(null)
    const korisnici = ref([])
    const avg = ref(null)
    const brojOcjena = ref(null)
    const komentari= ref([])
    const aktivniThreadovi= ref({})
    const zvjezdiceDetalji= ref(false)
    const ocjene=ref([])

  

    onMounted(async()=>{ 
        await ucitajRecept()
        await fetchKorisnici()
        await fetchAvg()
        await fetchKomentari()
        await fetchOcjene()
    })


    async function ucitajRecept() {
        try {
            const response = await axios.get(`http://localhost:3000/recepti/${recept_id}`); 
            recept.value = response.data; 
            console.log(recept.value); 
        } catch (error) {
            console.error('Greška pri dohvaćanju podataka o receptu:', error);
        }
    }


    async function fetchKorisnici() {
        try {
            const response = await axios.get('http://localhost:3000/korisnici'); 
            korisnici.value = response.data; 
            console.log(korisnici.value); 
        } catch (error) {
            console.error('Greška pri dohvaćanju podataka o korisnika:', error);
        }
    }

    function imeKorisnika(idKorisnik) {
        const korisnik = korisnici.value.find(k => k.id === idKorisnik)
        return korisnik ? `${korisnik.ime} ${korisnik.prezime}` : 'Nepoznat autor'
    }

    async function fetchAvg(){
        const rez= await axios.get(
            `http://localhost:3000/ocjene/recept/${recept.value.id}/avg`
        )

        avg.value= rez.data.prosjek
        brojOcjena.value= rez.data.brojOcjena
    }

    function zvjezdice(prosjek){
        if(prosjek===null) return 

        const pune= Math.floor(prosjek)
        const pola= prosjek - pune >= 0.5 ? 1:0
        const prazne= 5- pune - pola

        return '★'.repeat(pune) + (pola ? '⯪': '') + '☆'.repeat(prazne)
    }

    async function fetchKomentari() {
        try{
            const rez= await axios.get('http://localhost:3000/komentari')
            komentari.value= rez.data.filter(k=> k.id_recept== recept_id && k.odgovor===null)
        } catch(error){
            console.log('Greška pri dohvaćanju komentara:', error)
        }
    }

    async function prikaziThread(id_komentar){
        if(aktivniThreadovi.value[id_komentar]){
            aktivniThreadovi.value[id_komentar]=null
        } else{
            try{
                const rez= await axios.get(`http://localhost:3000/komentari/thread/${id_komentar}`)
                aktivniThreadovi.value[id_komentar]= rez.data.odgovori
            } catch(error){
                console.log('Greška pri dohvaćanju thread odgovora')
            }
        }
    }

    async function fetchOcjene(){
        try{
            const rez= await axios.get(`http://localhost:3000/ocjene/recept/${recept_id}`)
            ocjene.value=rez.data.ocjene
        }  catch (error) {
            console.error('Greška pri dohvaćanju podataka o ocjenama:', error);
        }
    }

</script>


<template>
    <div class="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
        
        <RouterLink to="/" class="self-start mb-4 text-green-600 hover:underline font-semibold">
            Natrag na popis
        </RouterLink>

        <RouterLink to="/korisnici" class="self-start mb-4 text-green-600 hover:underline font-semibold">
            Korisnici
        </RouterLink>

        <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6" v-if="recept && !zvjezdiceDetalji">
            <p v-if="korisnici" class="text-sm text-gray-500 italic">
                Autor: <span class="font-medium text-gray-700">{{ imeKorisnika(recept.id) }}</span>
            </p>

            <div class="flex items-center gap-3 text-green-500 text-lg">
                Ocjene: <span>{{ zvjezdice(avg) }}</span>
                <span class="text-gray-500 text-sm">
                    {{ avg !== null ? `${avg}/5 (${brojOcjena} ocjena)` : 'Nema ocjena' }}
                </span>
                <button @click="zvjezdiceDetalji=true" class="text-green-600 hover:underline font-semibold">
                    Prikaži/dodaj
                </button>
            </div>

            <h1 class="text-3xl font-extrabold text-green-700">{{ recept.naziv }}</h1>

            <span class="inline-block px-4 py-1 rounded-full bg-green-100 text-green-800 font-semibold text-sm w-max">
                {{ recept.kategorija }}
            </span>

            <p class="text-gray-700 leading-relaxed mt-4">
                {{ recept.opis }}
            </p>

            <div>
                <h2 class="text-xl font-semibold text-gray-800 mb-2">Sastojci</h2>
                <ul class="list-disc list-inside text-gray-600 space-y-1">
                    <li v-for="sastojak in recept.sastojci" :key="sastojak">{{ sastojak }}</li>
                </ul>
            </div>

            <div class="mt-6 border-t pt-4">
                <h2 class="text-xl font-semibold text-gray-800 mb-2">Upute</h2>
                <p class="text-gray-600 whitespace-pre-line leading-relaxed">{{ recept.upute }}</p>
            </div>


            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8">
                <h2 class="text-2xl font-semibold mb-4">Komentari</h2>

                <div v-if="komentari.length === 0" class="text-gray-500 italic">
                    Još nema komentara za ovaj recept.
                </div>

                <ul>
                    <li v-for="komentar in komentari" :key="komentar.id" class="mb-4 border-b border-gray-200 pb-4">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-semibold text-gray-700">{{ imeKorisnika(komentar.id_korisnik) }}</p>
                                <p class="text-gray-600">{{ komentar.tekst }}</p>
                            </div>
                            <button v-if="komentar.odgovor === null" @click="prikaziThread(komentar.id)"
                            class="text-green-500 hover:text-green-700 font-bold">
                                <span v-if="aktivniThreadovi[komentar.id]">^ Sakrij odgovore</span>
                                <span v-else>v Prikaži odgovore</span>
                            </button>
                        </div>

                        <ul v-if="aktivniThreadovi[komentar.id]" class="mt-2 ml-6 border-l-2 border-green-300 pl-4 space-y-2">
                            <li v-for="odgovor in aktivniThreadovi[komentar.id]" :key="odgovor.id" class="bg-green-50 p-3 rounded-lg">
                                <p class="font-semibold text-gray-700">{{ imeKorisnika(odgovor.id_korisnik) }}</p>
                                <p class="text-gray-600">{{ odgovor.tekst }}</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

        </div>
        <div v-else-if="zvjezdiceDetalji" class="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
            <div class="flex items-center gap-3 text-green-500 text-lg">
                Ocjene:
                <button @click="zvjezdiceDetalji=false" class="text-green-600 hover:underline font-semibold">
                    Sakrij ocjene
                </button>
            </div>
            <div v-for="ocjena in ocjene">
                <p class="text-sm text-gray-400 mb-1">
                    {{ imeKorisnika(ocjena.id_korisnik) }}
                </p>
                <span>{{ zvjezdice(ocjena.zvjezdice) }}</span>
                <span>{{ ocjena.komentar }}</span>
            </div>
        </div>
    </div>
</template>


