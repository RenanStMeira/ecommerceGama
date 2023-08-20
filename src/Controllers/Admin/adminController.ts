import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
<<<<<<< HEAD
import  Jwt from "jsonwebtoken";
import { generateToken } from "../../Utils/jwtUtils";


=======
>>>>>>> main

const prisma = new PrismaClient();

export class AdminController {
    async createAdmin(req: Request, res: Response) {
        const { name, email, password, isAdmin } = req.body;

        const hash = await bcrypt.hash(password, 10);

        try{
            if (!isAdmin) {
                throw new Error('Sem permição')
            }//Criando um admin no banco de dados
            const newAdmin = await prisma.admin.create({
                data: {
                    name,
                    email,
                    password: hash,
                    isAdmin: true,
                }
            });

            const {password: _, ...user} = newAdmin

<<<<<<< HEAD
            res.status(201).json({ message: 'Admin criado com sucesso' });

        } catch (err) {
            res.status(500).json({ message: `Você não tem autorização para criar este usuário` })
        }
    }


    async loginAdmin(req: Request, res: Response) {
        const { email, password } = req.body;
      
        try {
          // Busca o admin com email fornecido
          const admins = await prisma.admin.findMany({
            where: { email: { equals: email } },
            select: { id: true, name: true, email: true, password: true, isAdmin: true },
          });
      
          // Verificando se o admin foi encontrado
          if (!admins || admins.length === 0) {
            return res.status(404).json({ message: 'Admin não encontrado' });
          }
      
          const admin = admins[0]; // Acessa o primeiro elemento
      
          // Comparando a senha fornecida com a senha armazenada do admin no banco
          const isPasswordValid = await bcrypt.compare(password, admin.password);
      
          // Verificando se a senha é valida
          if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha incorreta' });
          }

        // const token = Jwt.sign({ id: admin.id }, process.env.JWT_PASS, { expiresIn: '2h' })
        //JWT
        const token = generateToken({ id: admin.id });

        //Desestrutura o password para ignorar o password
         const { password:_, ...adminlogin } = admin;

         return res.json({
            admin: adminlogin,
            token: token,
         })
    
    
        } catch (error) {
          console.error('Erro ao fazer login do admin:', error);
          res.status(500).json({ message: 'Erro ao fazer login do admin' });
        }
      }

      async listAdmin(req: Request, res: Response) {
        const { id } = req.params;
        try {
          const admin = await prisma.admin.findUnique({
            where: {
              id: id,
            },
          });
      
          if (admin) {
            return res.status(201).json(admin);
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Error retrieving admin" });
        }
      }
      

=======
            return res.json(newAdmin)

        } catch (err) {
            res.status(400).json({ message: `Você não tem autorização para criar este usuário` })
        }
    };


    async listAdmin(req: Request, res: Response){
        const { id } = req.params;
        try{
            const admin = await prisma.admin.findUnique({
                where: {
                    id: id, 
                }
            });

            if (admin){
                res.json(admin);

            }else {
                 res.status(404).json({ message: 'Admin não encontrado' })
            }
               } catch {
            res.status(400).json({ message: 'Erro do Servidor Interno' })
        }
    }

>>>>>>> main
   

    async deleteAdmin(req: Request, res: Response){
        const { id } = req.params;

        try{
            await prisma.admin.delete({
                where: {
                    id: String(id),
                }
            })
            res.status(201).json({ message: 'Usuario deletado com sucesso' })

        } catch {
<<<<<<< HEAD
            res.status(500).json({ message: 'Usuario nao encontrado' })
            
        }
    }
=======
            res.status(400).json({ message: 'Usuario nao encontrado' })
            
        }
    }

    async updateAdmin(req: Request, res: Response){
        const { id } = req.params;
        const { name, email, password } = req.body;

        try{
            const newAdminUpdate = await prisma.admin.update({
                where: { id },
                data: {
                    name: name,
                    email: email,
                    password: password
                },
            })

            return res.status(200).json({ message: "ADMIN atualizado com sucesso" });

        } catch {
            return res.status(400).json({ message: "Erro ao atualizar ADMIN" });
        }
    }
>>>>>>> main
}