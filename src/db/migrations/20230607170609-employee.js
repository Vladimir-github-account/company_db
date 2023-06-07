module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable('Employees', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			position: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			password: {
				type: Sequelize.STRING,
			},
			bossId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Employees',
					key: 'id'
				},
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE',
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.dropTable('Employees');
	}
};
