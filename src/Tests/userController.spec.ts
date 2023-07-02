import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { UserController } from '../Controllers/User/userController';


describe('UserController', () => {
    // Declaração das variavel que sera ultilizado
    var userController: UserController; 
    var req: Request; 
    var res: Response; 
    var prisma: PrismaClient; 
  
    // Função executada antes de cada teste
    beforeEach(() => {
      userController = new UserController(); // Instanciando o UserController
      req = {} as Request; //Criando um objeto que realiza a requisição
      res = {} as Response; // Criando um objeto vazio que simula a resposta
      prisma = new PrismaClient(); // Inicializando o cliente do Prisma
    });
  
    // Função executada após todos os testes
    afterAll(async () => {
      await prisma.$disconnect(); // Desconectando o cliente do Prisma do banco de dados
    });
  
    // Descrição dos testes da função createUser do UserController
    describe('createUser', () => {
      it('should create a new user', async () => {
         // Definindo os dados do corpo da requisição
        req.body = {
          name: 'Test User',
          email: 'test@example.com',
          password: '123456',
        };
  
        res.status = jest.fn().mockReturnThis(); // Status da resposta com o uso do jest.fn()
        res.json = jest.fn(); //Resposta com o uso do jest.fn()
  
         // Chamando a função createUser do UserController
        await userController.createUser(req, res);
  
        // Verificando se a função status foi chamada com o código 201
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          message: 'User created successfully',
        });
      });
    });
  });
  
  
  
  
  
  
  
  