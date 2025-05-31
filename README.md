# 🎬 Recruiting Laon - Catálogo de Filmes e Séries

<div align="center">
  
![GitHub repo size](https://img.shields.io/github/repo-size/ErickGCA/laon-projeto?color=00d4ff&style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/ErickGCA/laon-projeto?color=ff6b6b&style=for-the-badge)
![GitHub top language](https://img.shields.io/github/languages/top/ErickGCA/laon-projeto?color=4ecdc4&style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/ErickGCA/laon-projeto?color=ffd93d&style=for-the-badge)


</div>

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&duration=3000&pause=1000&color=00D4FF&background=0F0F2300&center=true&vCenter=true&width=600&lines=Plataforma+de+Cat%C3%A1logo+de+Filmes;Desenvolvido+para+Laon+Labs;Laravel+%2B+React+%2B+MySQL" alt="Typing SVG" />
</div>

---

## ✨ Visão Geral do Projeto

> **Uma plataforma completa de catálogo de filmes e séries desenvolvida como teste de recrutamento para [Laon Labs](https://laonlabs.com)**

A aplicação permite que usuários:
- 🔐 **Criem conta e façam login** com autenticação segura
- 🎥 **Naveguem pelo catálogo** de filmes e séries  
- 📝 **Visualizem detalhes completos** como sinopse, elenco e avaliações
- 👨‍💼 **Gerenciem conteúdo** (para administradores)

🔗 **[Figma Design Reference](https://www.figma.com/design/UNbd6QwutVcqiWoVEtBlCi/Recrutamento?node-id=2-9)** | 📋 **[Postman Collection](https://drive.google.com/file/d/1VzOATnBPGUXW26RavbBMc5rbIl5wsywL/view?usp=drive_link)**

---

## 🛠️ Stack Tecnológica

<div align="center">

### Backend
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

### Mobile (Opcional)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)

</div>

<details>
<summary>📦 <strong>Lista Completa de Tecnologias</strong></summary>

**Backend:**
- PHP 8+
- Laravel 8+ 
- MySQL 8
- Laravel Sanctum (autenticação API)

**Frontend:**
- Node.js
- Next.js / Create React App
- React
- Bootstrap 5  
- Font Awesome

**Mobile App (Opcional):**
- React Native
- Expo

**Ferramentas:**
- Git & GitHub
- Composer
- NPM / Yarn
- Postman
- MySQL Workbench

</details>

---

## 🚀 Estrutura do Projeto

```
recruiting-laon/
├── 📁 recruiting-laon-backend/    # API RESTful (Laravel)
├── 📁 recruiting-laon-frontend/   # Interface Web (Next.js/React)  
└── 📁 recruiting-laon-app/        # App Mobile (React Native)
```

---

## 💾 Modelagem do Banco de Dados

<div align="center">
  <img src="DER.PNG" alt="Modelo Entidade-Relacionamento" width="700"/>
  <p><em>Diagrama ER com foco em Usuários, Títulos, Gêneros e Diretores</em></p>
</div>

---

## ⚙️ Configuração do Backend

<details>
<summary>🔧 <strong>Pré-requisitos</strong></summary>

- PHP >= 8.0
- Composer
- MySQL 8
- Servidor Web (Apache/Nginx) ou `php artisan serve`

</details>

### 🚀 Instalação Rápida

```bash
# Clone o repositório
git clone https://github.com/ErickGCA/laon-projeto.git
cd laon-projeto/recruiting-laon-backend

# Instale dependências
composer install

# Configure ambiente
cp .env.example .env
# ⚠️ Configure as variáveis do banco no .env

# Gere chave e execute migrations
php artisan key:generate
php artisan migrate --seed

# Inicie o servidor
php artisan serve
```

> 🌐 **API disponível em:** `http://127.0.0.1:8000/api/`

---

## 🌐 Endpoints da API

<div align="center">

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `POST` | `/api/register` | Registro de usuário | ❌ |
| `POST` | `/api/login` | Login de usuário | ❌ |
| `GET` | `/api/user` | Dados do usuário logado | ✅ |
| `POST` | `/api/logout` | Logout do usuário | ✅ |
| `GET` | `/api/titulos` | Listar todos os títulos | ✅ |
| `GET` | `/api/titulos/{id}` | Detalhes de um título | ✅ |
| `POST` | `/api/titulos` | Criar novo título | 👑 Admin |
| `PUT` | `/api/titulos/{id}` | Atualizar título | 👑 Admin |
| `DELETE` | `/api/titulos/{id}` | Remover título | 👑 Admin |

</div>


---

## 🖥️ Configuração do Frontend

<details>
<summary>🔧 <strong>Pré-requisitos</strong></summary>

- Node.js >= 16.x
- NPM ou Yarn

</details>

### 🚀 Instalação Rápida

```bash
# Navegue para o frontend
cd recruiting-laon-frontend

# Instale dependências
npm install
# ou
yarn install

# Configure variáveis de ambiente
# Crie .env.local com:
echo "NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api" > .env.local

# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

> 🌐 **Aplicação disponível em:** `http://localhost:3000`

---

## 🖼️ Previews da Interface

<div align="center">

### 🔐 Tela de Login
<img src="URL_DA_IMAGEM_LOGIN_AQUI" alt="Tela de Login" width="400"/>

### 📱 Tela de Listagem  
<img src="URL_DA_IMAGEM_LISTAGEM_AQUI" alt="Tela de Listagem" width="600"/>

### 📄 Tela de Detalhes
<img src="URL_DA_IMAGEM_DETALHES_AQUI" alt="Tela de Detalhes" width="600"/>

</div>

---

## 📱 App Mobile (Opcional)

<details>
<summary>📱 <strong>Configuração React Native + Expo</strong></summary>

### Pré-requisitos
- Node.js >= 16.x
- NPM ou Yarn  
- Expo CLI
- Emulador Android/iOS ou Expo Go

### Instalação
```bash
# Navegue para o app
cd recruiting-laon-app

# Instale dependências
npm install

# Inicie o Metro Bundler
npm start
```

</details>

---

## 🚀 Deploy

<div align="center">

| Ambiente | Status | Link |
|----------|--------|------|
| 🔗 **API Backend** | ![Status](https://img.shields.io/badge/Status-Online-success?style=for-the-badge) | [Link para API](SEU_LINK_DEPLOY_API) |
| 🌐 **Frontend Web** | ![Status](https://img.shields.io/badge/Status-Online-success?style=for-the-badge) | [Link para Web App](SEU_LINK_DEPLOY_WEB) |
| 📱 **Mobile App** | ![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge) | Em breve |

</div>

---

## 🎯 Funcionalidades Implementadas

- [x] 🔐 **Sistema de Autenticação** (registro/login)
- [x] 🎥 **Catálogo de Filmes e Séries**
- [x] 📝 **Detalhes completos dos títulos**
- [x] 👨‍💼 **Painel administrativo**
- [x] 🔍 **API RESTful completa**
- [x] 📱 **Interface responsiva**
- [ ] 🔍 **Sistema de busca avançada**
- [ ] ⭐ **Sistema de avaliações**
- [ ] 📱 **App mobile**

---

## 🤔 Desafios e Aprendizados

Durante o desenvolvimento, enfrentei e superei diversos desafios:

> **🔧 Integração Laravel + React:** Configuração do CORS e autenticação via Sanctum
> 
> **📱 Design Responsivo:** Implementação fiel ao design do Figma
> 
> **🔐 Segurança:** Validação de dados e proteção de rotas
> 
> **📊 Performance:** Otimização de queries e carregamento de dados

**Principais aprendizados:**
- Aprofundamento em Laravel Sanctum
- Melhores práticas de estruturação de APIs
- Integração frontend/backend eficiente
- Implementação de interfaces responsivas

---

## 👨‍💻 Sobre o Desenvolvedor

<div align="center">
  <img src="https://github.com/ErickGCA" width="100" style="border-radius: 50%"/>
  
  **[Érick Gonçalves Cabral]**
  
  *Desenvolvedor Full Stack apaixonado por criar soluções inovadoras*
  
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ErickGCA)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/erick-cabralgca/)
  
</div>

---

## 🙏 Agradecimentos

<div align="center">
  
**Agradeço à equipe da [Laon Labs](https://laonlabs.com) pela oportunidade de participar deste processo seletivo!**

*Este projeto representa minha dedicação e paixão por desenvolvimento de software.*

---

⭐ **Se este projeto foi útil, considere dar uma estrela!**

</div>

## 📄 Licença

Este projeto foi desenvolvido para fins de avaliação técnica.

---

<div align="center">
  <img src="https://komarev.com/ghpvc/?username=ErickGCA_GITHUB&color=00d4ff&style=for-the-badge" alt="Profile Views"/>
</div>