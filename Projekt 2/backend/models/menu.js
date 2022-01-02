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
		models.restauracje.belongsToMany(models.dania, {
			through: menu,
			foreignKey: 'id_restauracja'
		});
		models.dania.belongsToMany(models.restauracje, {
			through: menu,
			foreignKey: 'id_danie'
		});
	}
	
	return menu
}