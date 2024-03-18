# Use a imagem oficial do Nginx como base
FROM nginx:latest

# Remova a configuração padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copie os arquivos do seu aplicativo Angular para o diretório padrão do Nginx
COPY dist/view /usr/share/nginx/html

# Exponha a porta 80 (a porta padrão do Nginx)
EXPOSE 80

# Inicie o Nginx quando o contêiner for iniciado
CMD ["nginx", "-g", "daemon off;"]
