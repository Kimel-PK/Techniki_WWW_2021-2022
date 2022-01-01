module.exports = (sequelize, DataTypes) => {
	
	const menu = sequelize.define("menu", {
		kolejność: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
	},
	{
		tableName: 'menu',
		timestamps: false
	})
	
	menu.associate = (models) => {
		menu.belongsTo(models.dania, {
			foreignKey: 'id_danie',
			as: 'danie'
		})
		menu.belongsTo(models.restauracje, {
			foreignKey: 'id_restauracja',
			as: 'restauracja'
		})
	}
	
	return menu
}