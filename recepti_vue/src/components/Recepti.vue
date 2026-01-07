<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { RouterLink } from 'vue-router'


    const recepti = ref([])
    const korisnici = ref([])
  

    onMounted(async()=>{ 
        await Promise.all([
            fetchRecepti(),
            fetchKorisnici(),
        ])
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

    function autorRecepta(idKorisnik) {
        const korisnik = korisnici.value.find(k => k.id === idKorisnik)
        return korisnik ? `${korisnik.ime} ${korisnik.prezime}` : 'Nepoznat autor'
    }


</script>


<template>
    <div class="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-8">
        <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="recept in recepti" :key="recept.id" class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col">
                <p class="text-sm text-gray-400 mb-1">
                    {{ autorRecepta(recept.id_korisnik) }}
                </p>
                
                <h2 class="text-2xl font-bold text-orange-600 mb-2">
                    {{ recept.naziv }}
                </h2>

                <span class="inline-block w-fit mb-4 px-3 py-1 text-sm font-semibold text-orange-700 bg-orange-100 rounded-full">
                    {{ recept.kategorija }}
                </span>

                <p class="text-gray-700 mb-4">
                    {{ recept.opis }}
                </p>

                <div class="mb-4">
                    <h3 class="font-semibold text-gray-800 mb-2">
                        Sastojci:
                    </h3>
                    <ul class="list-disc list-inside space-y-1 text-gray-600">
                        <li v-for="sastojak in recept.sastojci" :key="sastojak">
                            {{ sastojak }}
                        </li>
                    </ul>
                </div>

                <div class="mt-auto pt-4 border-t">
                    <h3 class="font-semibold text-gray-800 mb-1">
                        Upute:
                    </h3>
                    <p class="text-gray-600 text-sm whitespace-pre-line">
                        {{ recept.upute }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

