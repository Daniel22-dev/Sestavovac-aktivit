# Školní knihovna ACTIVA

Soubor `library.json` je statický katalog schválených školních materiálů.

## Publikační postup

1. Učitel v ACTIVA zvolí **Knihovna → Balíček pro správce**.
2. Správce zkontroluje věcnou správnost, autorská práva, osobní údaje a technickou platnost.
3. Schválený objekt `activa-library-entry-v1` vloží do pole `materials` v `library.json`.
4. Aktualizuje `updatedAt`, spustí `npm test` a publikuje repozitář.

Katalog je záměrně pouze pro čtení. Zápis bez školního serveru nebo autentizovaného backendu by nebyl bezpečný.
