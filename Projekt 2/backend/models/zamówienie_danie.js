module.exports = (sequelize, DataTypes) => {
	
	const zamówienie_danie = sequelize.define("zamówienie_danie", {
		ilość: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
	},
	{
		tableName: 'zamówienie_danie',
		timestamps: false
	})
	
	return zamówienie_danie
}