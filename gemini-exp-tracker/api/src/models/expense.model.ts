import { Table, Column, Model, DataType } from 'sequelize-typescript';

export enum ExpenseCategory {
  Food = 'Food',
  Travel = 'Travel',
  Utilities = 'Utilities',
  Others = 'Others',
}

@Table({
  tableName: 'expenses',
  timestamps: true,
})
export class Expense extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount!: number;

  @Column({
    type: DataType.ENUM(...Object.values(ExpenseCategory)),
    allowNull: false,
  })
  category!: ExpenseCategory;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'spent_on_date',
  })
  spentOnDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'created_at',
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'updated_at',
  })
  updatedAt!: Date;
}
