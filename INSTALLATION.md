# 🚀 Guia de Instalação Rápida

## Passo a Passo Completo

### 1️⃣ Instalar dependências

```bash
npm run install-all
```

Este comando instalará as dependências do projeto raiz, backend e frontend automaticamente.

### 2️⃣ Configurar MySQL

**a) Inicie o MySQL no seu computador:**
```bash
sudo systemctl start mysql
# ou
sudo service mysql start
```

**b) Conecte-se ao MySQL:**
```bash
mysql -u root -p
```

**c) Crie o banco de dados:**
```sql
CREATE DATABASE tinder_recruitment;
EXIT;
```

### 3️⃣ Configurar variáveis de ambiente

Edite o arquivo `server/.env` com suas credenciais do MySQL:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui      # <-- ALTERE ISSO
DB_NAME=tinder_recruitment
JWT_SECRET=seu_secret_aqui       # <-- ALTERE ISSO
NODE_ENV=development
```

### 4️⃣ Iniciar a aplicação

Para iniciar tudo de uma vez:
```bash
npm run dev
```

Você verá duas mensagens:
- ✅ Backend rodando em `http://localhost:5000`
- ✅ Frontend rodando em `http://localhost:3000`

### 5️⃣ Acessar a aplicação

Abra seu navegador em: **http://localhost:3000**

---

## 🐛 Solução de Problemas

### Erro de conexão com MySQL

**Problema:** `Error: connect ECONNREFUSED`

**Solução:**
1. Verifique se o MySQL está rodando:
   ```bash
   sudo systemctl status mysql
   ```
2. Verifique as credenciais no arquivo `.env`
3. Teste a conexão:
   ```bash
   mysql -u root -p
   ```

### Erro de porta já em uso

**Problema:** `Port 5000 already in use`

**Solução:**
1. Encontre o processo:
   ```bash
   lsof -i :5000
   ```
2. Mate o processo:
   ```bash
   kill -9 <PID>
   ```
3. Ou altere a porta no `.env`

### Erro ao instalar dependências

**Problema:** `npm ERR!`

**Solução:**
1. Limpe o cache:
   ```bash
   npm cache clean --force
   ```
2. Delete node_modules e reinstale:
   ```bash
   rm -rf node_modules
   npm install
   ```

### React Scripts não encontrado

**Problema:** `command not found: react-scripts`

**Solução:**
```bash
cd client
npm install
```

---

## ✅ Verificação de Instalação

Após instalar, você deve conseguir:

1. ✅ Ver a tela de login em `http://localhost:3000`
2. ✅ Criar uma conta
3. ✅ Fazer login
4. ✅ Ver o dashboard
5. ✅ Acessar todas as funcionalidades

---

## 📞 Precisa de ajuda?

Verifique:
- Logs do backend no terminal
- Console do navegador (F12)
- Logs do MySQL: `sudo tail -f /var/log/mysql/error.log`

