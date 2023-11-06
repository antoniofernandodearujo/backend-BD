// src/models/CarModel.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../db'; // Importe a instância do Sequelize

class CarModel extends Model {
  private id!: number;
  public marca!: string;
  public modelo!: string;
  public versao!: string;
  public ano!: number;
  public quilometragem!: number;
  public combustivel!: string;
  public tipoCambio!: string;
  public precoVenda!: number;
  public localizacao!: string;
  public imagem!: string;
  public descricao!: string;
  public qtdDonos!: string;
  public contato!: string;
}

CarModel.init(
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, // Isso faz com que o Sequelize gere automaticamente o valor do ID
        primaryKey: true, // Define essa coluna como chave primária
    },

    marca: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    versao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quilometragem: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipoCambio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precoVenda: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    localizacao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qtdDonos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contato: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Cars', // Nome da tabela no banco de dados
    timestamps: false, // Não cria colunas `createdAt` e `updatedAt`
  }
);

export default CarModel;
