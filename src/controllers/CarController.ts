import { Request, Response } from 'express';
import CarModel from '../model/CarModel';
import { Op } from 'sequelize';
import sequelize from '../db';

class CarController {
  async index(req: Request, res: Response): Promise<Response> {
    try {
      const cars = await CarModel.findAll()
      return res.json(cars);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar carros' });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const car = await CarModel.findByPk(id);
      if (!car) {
        return res.status(404).json({ error: 'Carro não encontrado' });
      }
      return res.json(car);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar carro' });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    const transaction = await sequelize.transaction();
  
    try {
      const car = await CarModel.create(req.body, { transaction });
      await transaction.commit();
      console.log('Carro criado com sucesso:', car.toJSON()); // Adicione este log
      return res.json(car);
    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao criar carro:', error); // Adicione este log
      return res.status(500).json({ error: 'Erro ao criar carro' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const car = await CarModel.findByPk(id);
      if (!car) {
        return res.status(404).json({ error: 'Carro não encontrado' });
      }
      await car.update(req.body);
      return res.json(car);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar carro' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const car = await CarModel.findByPk(id);
      if (!car) {
        return res.status(404).json({ error: 'Carro não encontrado' });
      }
      await car.destroy();
      return res.json(car);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir carro' });
    }
  }

  async searchByName(req: Request, res: Response): Promise<Response> {
    const name = req.query.name as string | undefined; // Assegure que 'name' seja uma string ou 'undefined'
  
    if (name === undefined) {
      return res.status(400).json({ error: 'Nome não fornecido na consulta' });
    }
  
    try {
      const cleanedName = name.trim(); // Remova espaços em branco no início e no final
      const cars = await CarModel.findAll({
        where: {
          marca: {
            [Op.iLike]: `%${cleanedName}%`, // Realiza pesquisa case-insensitive com espaços extras
          },
        },
      });
  
      if (cars.length === 0) {
        return res.status(404).json({ error: 'Nenhum carro encontrado com o nome especificado' });
      }
  
      return res.json(cars);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar carros por nome' });
    }
  }

}

export default new CarController();