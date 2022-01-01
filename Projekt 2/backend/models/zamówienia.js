module.exports = (sequelize, DataTypes) => {
	
	const zamówienia = sequelize.define("zamówienia", {
		adres: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		cena: {
			type: DataTypes.DECIMAL (10, 2),
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM('złożone', 'w trakcie', 'zrealizowane', 'anulowane'),
			allowNull: false,
		},
	},
	{
		tableName: 'zamówienia',
		timestamps: false
	})
	
	zamówienia.associate = (models) => {
		zamówienia.hasMany(models.zamówienie_danie, {
			foreignKey: 'id_zamówienie'
		})
	}
	
	return zamówienia
}