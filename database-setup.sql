-- Script de criação do banco de dados Tinder Recruitment
-- Execute este script no MySQL para criar o banco de dados

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS tinder_recruitment CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar o banco criado
USE tinder_recruitment;

-- As tabelas serão criadas automaticamente pelo Sequelize
-- Este script apenas prepara o banco de dados

-- Verificar se o banco foi criado
SHOW DATABASES LIKE 'tinder_recruitment';

-- Comando para resetar o banco (descomente se necessário):
-- DROP DATABASE IF EXISTS tinder_recruitment;
-- CREATE DATABASE tinder_recruitment CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

