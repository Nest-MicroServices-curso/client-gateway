# Clients microservice

## Dev
1. Clonar repositorio
2. Instalar dependencias
3. Crear un archivo `.env` basado en `.env.template`
4. Ejecutar migración de primsma `npx prisma migrate dev`
5. Ejecutar `npm run start:dev`

# Prod
```bash
docker build -f dockerfile.prod -t clinets-gateway .
```