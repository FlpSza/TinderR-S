# 🎯 Tinder Recruitment - App de Recrutamento Estilo Tinder

Um aplicativo moderno de recrutamento e seleção com interface inspirada no Tinder, desenvolvido com React, Node.js e MySQL.

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** com Express
- **MySQL** com Sequelize ORM
- **Socket.io** para chat em tempo real
- **JWT** para autenticação
- **bcryptjs** para hash de senhas

### Frontend
- **React** com hooks modernos
- **Material-UI** para componentes visuais
- **React Router** para navegação
- **react-tinder-card** para efeito de swipe
- **Axios** para requisições HTTP
- **Socket.io-client** para chat em tempo real

## ✨ Funcionalidades

### Para Candidatos 👨‍💼
- ✅ Cadastro e login
- ✅ Swipe em vagas de emprego
- ✅ Ver matches com empresas
- ✅ Chat em tempo real com recrutadores
- ✅ Perfil personalizado com bio e foto

### Para Empresas 🏢
- ✅ Cadastro e login
- ✅ Criar e gerenciar vagas
- ✅ Avaliar candidatos com swipe
- ✅ Ver matches com candidatos
- ✅ Chat em tempo real com candidatos
- ✅ Dashboard de gerenciamento

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- MySQL instalado e rodando
- npm ou yarn

## 🔧 Instalação

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd TinderR&S
```

### 2. Instale as dependências
```bash
npm run install-all
```

### 3. Configure o banco de dados MySQL

Crie um banco de dados chamado `tinder_recruitment`:
```sql
CREATE DATABASE tinder_recruitment;
```

### 4. Configure as variáveis de ambiente

No diretório `server`, crie um arquivo `.env` baseado no `.env.example`:

```bash
cd server
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_NAME=tinder_recruitment
JWT_SECRET=seu_jwt_secret_aqui_mude_isso
NODE_ENV=development
```

### 5. Inicie o servidor

Para iniciar tanto o backend quanto o frontend simultaneamente:
```bash
npm run dev
```

Ou se preferir iniciar separadamente:

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

## 🌐 Acessar a aplicação

Abra seu navegador em: `http://localhost:3000`

## 📱 Como usar

### Primeiro acesso

1. **Cadastre-se** como candidato ou empresa
2. Preencha seus dados no **perfil**
3. Comece a explorar!

### Para Candidatos
- Acesse **Explorar Vagas** para deslizar em oportunidades
- Marque com ❤️ as vagas que gostou
- Quando houver match, aparecerá em **Matches**
- Converse com recrutadores no **Chat**

### Para Empresas
- Crie **vagas** pelo seu perfil
- Acesse **Avaliar Candidatos** para ver candidatos interessados
- Faça match com os talentos
- Converse com candidatos no **Chat**

## 🗂️ Estrutura do Projeto

```
TinderR&S/
├── server/                 # Backend Node.js
│   ├── config/            # Configurações do banco
│   ├── models/            # Modelos Sequelize
│   ├── routes/            # Rotas da API
│   ├── middleware/        # Middlewares (auth, etc)
│   └── index.js           # Servidor principal
├── client/                # Frontend React
│   ├── public/            # Arquivos públicos
│   └── src/
│       ├── pages/         # Páginas da aplicação
│       ├── context/       # Context API
│       └── App.js         # Componente principal
└── package.json           # Scripts principais
```

## 🔐 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Cadastro
- `POST /api/auth/login` - Login

### Usuários
- `GET /api/users/me` - Obter usuário atual
- `PUT /api/users/me` - Atualizar perfil

### Vagas
- `GET /api/jobs` - Listar vagas
- `GET /api/jobs/:id` - Detalhes da vaga
- `POST /api/jobs` - Criar vaga (empresas)
- `PUT /api/jobs/:id` - Atualizar vaga
- `DELETE /api/jobs/:id` - Deletar vaga

### Matches
- `POST /api/matches/swipe` - Fazer swipe
- `GET /api/matches` - Listar matches

### Mensagens
- `GET /api/messages/match/:matchId` - Listar mensagens
- `POST /api/messages` - Enviar mensagem

## 🎨 Customização

Você pode personalizar:
- Cores no tema Material-UI em `client/src/App.js`
- Portas em `server/.env`
- Estrutura do banco de dados em `server/models/`

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests

## 📝 Licença

Este projeto está sob a licença MIT.

## 💡 Sugestões de Melhorias Futuras

- [ ] Upload de fotos de perfil
- [ ] Notificações push
- [ ] Sistema de recomendações baseado em ML
- [ ] Filtros avançados de busca
- [ ] Analytics para empresas
- [ ] Integração com LinkedIn
- [ ] Modo escuro
- [ ] App mobile (React Native)

## 👨‍💻 Desenvolvido com ❤️

Criado especialmente para atrair jovens ao mercado de trabalho de forma divertida e moderna!

---

**Aproveite e encontre sua oportunidade perfeita! 🚀**

