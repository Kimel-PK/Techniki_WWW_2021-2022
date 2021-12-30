module.exports = (sequelize, DataTypes) => {
	
	const menu = sequelize.define("menu", {
		
	},
	{
		tableName: 'menu'
	})
	
	return menu
}