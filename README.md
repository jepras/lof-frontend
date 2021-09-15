# Dokumentation for Løfbergs og Fennings Fonden

## Forklaring

Frontend:
På **Netlify** ligger hjemmesiden & admin systemet deployet.
Backend:
På **Firebase** lagres alle formularer, brugere og de filer de har uploadet.
Under henholdsvis Firestore, Authentication, Storage & Functions.

Content Management System (CMS):
På **Strapi** kan teksten på hjemmesiden ændres. Alt bortset fra "Ansøgningsskema". Ansøgningsskema teksten ændres direkte i React app'en.
På **Heroku** ligger Strapi app'en deployet.

![System Tegning](./src/config/readme/lof-system.png 'Sammenhæng')

## Nødvendige links

- Database - Firebase db: https://console.firebase.google.com/u/0/project/lof-fond/firestore/data~2Fforms~2FgWocfPsdXxfX49sCnZgL
- CMS - Strapi: https://github.com/jepras/lof-strapi & https://loffond.herokuapp.com/admin/
- Hosting
  - Hosting backend - Heroku: https://dashboard.heroku.com/apps
  - Hosting frontend - Netlify:
- URL deployed til: https://lof-fond.netlify.app/

## Ved overførsel af system

Overfør admin rights af Firebase db
https://console.firebase.google.com/u/0/project/lof-fond/settings/iam

### CMS: Heroku/Strapi

Fonden skal enten overføre Strapi til egen server fra Heroku eller blive ved med at hoste det på Heroku.

Hvis egen:

- Opsætte en database et sted.
- Deploy'e STRAPI selv.
- Ændre .env.production key til at pege på ny URL
  Alternativt: Fonden skal overtage Heroku projektet, betale årligt for at servicen altid er på. Maintaine og opdatere selv.

- Niels skal tage stilling til om både frontend og backend skal lagres på Heroku/Netlify hvor der så skal betales, eller om den skal serviceres fra Any.Cloud.

### Frontend: Netlify/Github

Repository skal clones og hostes et valgfrit sted.
https://github.com/jepras/lof-frontend

### Web app

Opret admin bruger til Emil & Niels.

## Frontend (det der kan ses i web applikationen)

### Start app

npm run start

### Admin system

Når du har en bruger med "role = admin", så kan du se et link til /oversigt i øverste bar på hjemmesiden (til højre for Log af)

## CMS

### Start app

yarn develop

## Backend

Simpel backend bestående af en Cloud Function der automatisk sender mails ved bekræftelse og afslag gennem SendGrid.

### Admin system

For at oprette en admin bruger skal du:

1. Gå ind på https://console.firebase.google.com/u/0/project/lof-fond/firestore/data~2Fforms
2. Lokaliser den ønsket bruger under users/form-id.
3. Add field: role = admin.
   ![Admin bruger](./src/config/readme/admin-bruger.png)

### Slet bruger og al relateret data

For at slette al data skal der gøres følgende 2 ting.

#### På app'en

Vælg "Slet" og bekræft under den ønskede bruger.

#### I Firebase Authentication

1. Find brugeren under [Authentication på Firebase](https://console.firebase.google.com/u/0/project/lof-fond/authentication/users). Scroll eller brug søgefunktionen.
2. Lokaliser de 3 prikker i højre side.
   ![Authentication](./src/config/readme/authenticate-delete.png)
3. Vælg Delete account.

### Database opbygning (Firestore)

Når brugeren opretter sig, så skabes der et dokument under /users.
Når brugeren begynder at udfylde ansøgningen og gemmer, så lagres denne information under brugerens dokument under /users.
Når brugeren indsender ansøgningen, så skabes der et endeligt dokument under /forms.
Dette dokument bliver derefter opdateret med en beslutning når en admin foretager en beslutning.
