# Actions hotfix 2

Vizuální QA stub pro Access Guard nyní posílá CORS hlavičku. Tím je
odstraněn falešný `console.error` na stránce manuálu při izolovaném
headless testu. Diagnostika také nově vypisuje text první konzolové chyby.
