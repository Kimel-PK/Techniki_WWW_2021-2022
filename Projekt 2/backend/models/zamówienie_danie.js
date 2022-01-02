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
	
	zamówienie_danie.associate = (models) => {
		models.zamówienia.belongsToMany(models.dania, {
			through: zamówienie_danie,
			foreignKey: 'id_zamówienie'
		});
		models.dania.belongsToMany(models.zamówienia, {
			through: zamówienie_danie,
			foreignKey: 'id_danie'
		});
	}
	
	return zamówienie_danie
}