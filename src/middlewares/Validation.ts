import { Request, Response, NextFunction } from 'express';
import CarModel from '../model/CarModel';

const Validation = async (req: Request, res: Response, next: NextFunction) => {
  const {
    marca,
    modelo,
    versao,
    ano,
    quilometragem,
    tipoCambio,
    precoVenda,
  } = req.body;

  // Crie um array de validações a serem aplicadas em cada campo
  const validations = [
    { field: 'marca', message: 'Você deve informar a marca do carro' },
    { field: 'modelo', message: 'Você deve informar o modelo do carro' },
    // Adicione mais validações aqui para outros campos, se necessário
  ];

  // Verifique cada validação
  for (const validation of validations) {
    const { field, message } = validation;

    if (!req.body[field] || req.body[field].trim() === '') {
      return res.status(400).json({ error: message });
    }
  }

  next();
};

export default Validation;
