# Etapa 1: Build (compila o TypeScript)
FROM node:latest AS builder

# Define diretório de trabalho
WORKDIR /app

# Copia e instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Compila o projeto TypeScript → JavaScript
RUN npm run build


# Etapa 2: Runtime (só o essencial para rodar)
FROM node:latest AS runner

WORKDIR /app

# Copia apenas o package.json e instala dependências de produção
COPY package*.json ./
RUN npm install --only=production

# Copia o build da etapa anterior
COPY --from=builder /app/dist ./dist

# Expõe a porta da API
EXPOSE 8080

# Comando final
CMD ["node", "dist/index.js"]
