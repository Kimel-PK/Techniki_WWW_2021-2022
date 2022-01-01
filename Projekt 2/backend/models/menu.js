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
	
	return menu
}