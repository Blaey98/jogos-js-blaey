# Dockerfile para servidor de damas otimizado
FROM python:3.10-slim

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    make \
    && rm -rf /var/lib/apt/lists/*

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos do projeto
COPY src/ ./src/
COPY requirements.txt .
COPY optimized_server.py .
COPY compile_engine.sh .

# Instalar dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# Compilar motor C
RUN chmod +x compile_engine.sh && ./compile_engine.sh

# Expor porta
EXPOSE 8081

# Configurar variáveis de ambiente
ENV PYTHONPATH=/app/src/python
ENV ENGINE_POOL_SIZE=4
ENV MAX_DEPTH=20
ENV MAX_TIME=10.0

# Comando de inicialização
CMD ["python3", "optimized_server.py", "--port", "8081", "--pool-size", "4"]

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8081/api/health || exit 1
