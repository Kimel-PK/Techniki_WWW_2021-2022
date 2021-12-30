module.exports = (sequelize, DataTypes) => {
	
	const zamówienie_danie = sequelize.define("zamówienie_danie", {
		id_zamówienie: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		id_danie: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		ilość: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
	},
	{
		tableName: 'zamówienie_danie'
	})
	
	return zamówienie_danie
}