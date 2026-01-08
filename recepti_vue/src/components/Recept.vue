<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { RouterLink } from 'vue-router'
    import { useRoute } from 'vue-router'



    const route = useRoute()

    const recept_id= route.params.id
    const recept = ref(null)
    const korisnik = ref(null)
    const avg = ref(null)
    const brojOcjena = ref(null)

  

    onMounted(async()=>{ 
        await ucitajRecept()
        await ucitajKorisnika()
        await fetchAvg()
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


    async function ucitajKorisnika() {
        try {
            const response = await axios.get(`http://localhost:3000/korisnici/${recept.value.id_korisnik}`); 
            korisnik.value = response.data; 
            console.log(korisnik.value); 
        } catch (error) {
            console.error('Greška pri dohvaćanju podataka o korisniku:', error);
        }
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


</script>


<template>
    <div class="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-8">
        
        <RouterLink to="/" class="self-start mb-4 text-orange-600 hover:underline font-semibold">
            Natrag na popis
        </RouterLink>

        <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6" v-if="recept">
            <p v-if="korisnik" class="text-sm text-gray-500 italic">
                Autor: <span class="font-medium text-gray-700">{{ korisnik.ime }} {{ korisnik.prezime }}</span>
            </p>

            <div class="flex items-center gap-3 text-yellow-500 text-lg">
            <span>{{ zvjezdice(avg) }}</span>
                <span class="text-gray-500 text-sm">
                    {{ avg !== null ? `${avg}/5 (${brojOcjena} ocjena)` : 'Nema ocjena' }}
                </span>
            </div>

            <h1 class="text-3xl font-extrabold text-orange-700">{{ recept.naziv }}</h1>

            <span class="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-800 font-semibold text-sm w-max">
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
        </div>
    </div>
</template>


