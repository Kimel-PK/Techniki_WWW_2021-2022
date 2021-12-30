module.exports = (sequelize, DataTypes) => {
	
	const menu_danie = sequelize.define("menu_danie", {
		id_menu: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		id_danie: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		kolejnosc: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
	},
	{
		tableName: 'menu_danie'
	})
	
	return menu_danie
}