## Konzeption

### Ideenfindung
- Ticket website mit Login
- Unterseiten
    - Login (class: authController)
    - Tickets (class: ticketController)
    - Ticket (class: ticketController)
    - Profil (class: authController)
- Technologien
    - Webserver/Packetmanager/bundler: bun (https://bun.sh)
    - Database: redis (https://redis.io)
- Aufteilung:
    - 

### OWAS-Flaws
- SQL injection (SQL Injection)
- Login über GET => Parameter auslesbar (Insecure Design)
- Bei Ticket-Aufruf wird nicht auf Berechtigung gechecked (Insecure design)
- keine .htaccess => Files können ausgelsen werden (Security Misconfiguration)
- Passwort-ändern auch über GET (Insecure Design)
