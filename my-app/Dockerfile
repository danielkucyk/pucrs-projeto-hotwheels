# Etapa 1: Build da aplicação
FROM 23-alpine AS builder

WORKDIR /app

# Copia apenas os arquivos de dependências primeiro
COPY package*.json ./
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Gera a versão final da aplicação
RUN npm run build

# Etapa 2: Imagem final com NGINX
FROM stable-alpine

# Limpa o conteúdo padrão do NGINX
RUN rm -rf /usr/share/nginx/html/*

# Copia o build para o NGINX
COPY --from=builder /app/build /usr/share/nginx/html

# (Opcional) Configuração de rotas para SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]