# Wijkmeldingen

Kleine oefenapp in Angular om meldingen te bekijken en toe te voegen.
**Alle data is verzonnen.** Geen echte politiedata en geen code van een opdrachtgever.

## Starten

npm install -> Dependencies installeren
npx json-server db.json --port 3000 -> DB starten
ng serve -> Anguler 'watcher' starten

## Eis → plek in de code

| Eis            | Waar in de app                                           | Status      |
| -------------- | -------------------------------------------------------- | ----------- |
| Angular        | Standalone components, signals, router, HttpClient       | gedaan      |
| REST/JSON      | json-server, `MeldingenService`                          | gedaan      |
| SCSS/Bootstrap | `styles.scss`                                            | gedaan      |
| WCAG           | Tabel met caption/scope, `aria-sort`, knoppen in headers | deels       |
| Testen         |                                                          | nog te doen |
| Docker         |                                                          | nog te doen |
| Kubernetes     |                                                          | nog te doen |
