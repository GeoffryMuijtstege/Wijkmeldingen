# Wijkmeldingen

Kleine oefenapp in Angular om meldingen te bekijken, sorteren, filteren en indienen.
**Alle data is verzonnen.** Geen echte politiedata en geen code van een opdrachtgever.

Gemaakt als oefening voor de vacature DevOps frontend developer: elke eis uit de
vacature heb ik zo ver mogelijk in een eigen, klein project uitgeprobeerd.

## Starten

### Lokaal (dev)

```powershell
npm install
npx json-server src/app/meldingen/backend/db.json --port 3000
ng serve
```

### Docker Compose

```powershell
docker compose up --build
```

Open `http://localhost:8080`. nginx serveert de Angular-build en stuurt `/api/` door naar de
`json-server`-container.

### Kubernetes (Minikube)

```powershell
minikube start
docker compose build
minikube image load wijkmeldingen-frontend:latest
kubectl create configmap json-server-data --from-file=db.json=src/app/meldingen/backend/db.json
kubectl apply -f k8s/
minikube service frontend --url
```

### Tests

```powershell
ng test
npx playwright test
```

## Eis → plek in de code

| Eis            | Waar in de app                                                                                                                                                                              | Status                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| Angular        | Standalone components, signals en `computed`, router, HttpClient, `@for`/`@if`                                                                                                              | gedaan                        |
| REST/JSON      | json-server als nep-API, `MeldingenService` (GET, POST, centrale foutafhandeling)                                                                                                           | gedaan                        |
| Reactive forms | `MeldingIndienen`: validatie, foutmeldingen,                                                                                                                                                | gedaan                        |
| SCSS/Bootstrap | `styles.scss`, Bootstrap-componenten                                                                                                                                                        | gedaan                        |
| WCAG           | Tabel met `caption`/`scope`, sorteerknoppen met `aria-sort`, `aria-invalid` en `aria-describedby` bij fouten, `lang="nl"`. Geautomatiseerd gecontroleerd met axe, handmatig met toetsenbord | gedaan                        |
| Testen         | Unit-tests (service met `HttpTestingController`, componenten), Playwright-tests met axe op lijst en filter                                                                                  | gedaan, met gaten (zie onder) |
| Docker         | Multi-stage Dockerfile (Node build, nginx-unprivileged), Compose met json-server                                                                                                            | gedaan                        |
| Kubernetes     | `k8s/`: Deployments en Services voor frontend en json-server, ConfigMap als seed-data, PVC voor opslag                                                                                      | gedaan op Minikube            |
