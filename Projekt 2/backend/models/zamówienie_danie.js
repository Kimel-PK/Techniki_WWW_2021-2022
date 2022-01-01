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
		zamówienie_danie.belongsTo(models.dania, {
			foreignKey: 'id_danie',
			as: 'danie'
		})
		zamówienie_danie.belongsTo(models.zamówienia, {
			foreignKey: 'id_zamówienie',
			as: 'zamówienie'
		})
	}
	
	return zamówienie_danie
}