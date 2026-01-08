<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { RouterLink } from 'vue-router'


    const recepti = ref([])
    const korisnici = ref([])
    const ocjene= ref([])

  

    onMounted(async()=>{ 
        await fetchRecepti()
        await fetchKorisnici()
        await fetchOcjene()
    })


    async function fetchRecepti() {
        try {
            const response = await axios.get('http://localhost:3000/recepti'); 
            recepti.value = response.data; 
            console.log(recepti.value); 
        } catch (error) {
            console.error('Greška pri dohvaćanju podataka o receptima:', error);
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

    function brojReceptaKorisnika(id_korisnik) {
        return recepti.value.filter(r => r.id_korisnik === id_korisnik).length
    }

    async function fetchOcjene(){
        try{
            const rez= await axios.get(`http://localhost:3000/ocjene`)
            ocjene.value=rez.data
        }  catch (error) {
            console.error('Greška pri dohvaćanju podataka o ocjenama:', error);
        }
    }

    function brojOcjenaKorisnika(id_korisnik){
        return ocjene.value.filter(o=>o.id_korisnik==id_korisnik).length
    }




</script>


<template>
    <div class="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
        <RouterLink to="/" class="self-start mb-4 text-green-600 hover:underline font-semibold">
            Recepti
        </RouterLink>
        <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="korisnik in korisnici" :key="korisnik.id" class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col">
                <RouterLink :to="`/korisnik/${korisnik.id}`" class="text-2xl font-bold text-green-600 mb-2 hover:text-green-300">
                    {{ korisnik.ime }} {{ korisnik.prezime }}
                </RouterLink>
                <p class="text-xs text-gray-500">
                    Broj recepata: {{ brojReceptaKorisnika(korisnik.id) }}
                </p>
                <p class="text-xs text-gray-500">
                    Broj ocjena: {{ brojOcjenaKorisnika(korisnik.id) }}
                </p>
            </div>
        </div>
    </div>
</template>

