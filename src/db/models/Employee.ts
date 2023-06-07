import {
	Table,
	Model,
	Column,
	PrimaryKey,
	AutoIncrement,
	HasOne,
	DataType,
	AllowNull,
	ForeignKey,
} from 'sequelize-typescript';

@Table({
	timestamps: true
})
export default class Employee extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.NUMBER)
	id!: number;
	@AllowNull(false)
	@Column(DataType.STRING)
	name!: string;
	@AllowNull(false)
	@Column(DataType.STRING)
	position!: string;
	@Column(DataType.STRING)
	password!: string;
	@ForeignKey(() => Employee)
	@Column
	bossId!: number;
	@HasOne(() => Employee)
	boss!: Employee;
}