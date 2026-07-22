# Budoucí připojení školního serveru

ACTIVA 0.5.0 je záměrně bezserverová. `src/js/35-persistence-adapter.js` deklaruje smlouvu pro projektové a knihovní úložiště. Budoucí serverová implementace musí řešit školní přihlášení, role, šifrovaný přenos, oddělení osobních a školních materiálů, audit bez obsahu žákovských dat, kvóty, zálohy a migraci lokálních projektů. Aktivace vyžaduje novou verzi aplikace a nesmí proběhnout pouhou změnou URL.
