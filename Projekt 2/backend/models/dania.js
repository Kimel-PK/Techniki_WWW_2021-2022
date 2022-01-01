module.exports = (sequelize, DataTypes) => {
	
	const dania = sequelize.define("dania", {
		nazwa: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		cena: {
			type: DataTypes.DECIMAL(10,2),
			allowNull: false,
		}
	},
	{
		tableName: 'dania',
		timestamps: false
	})
	
	/*
	dania.associate = (models) => {
		models.dania.belongsToMany(models.zamówienia, { through: 'zamówienie_danie' })
		models.zamówienia.belongsToMany(models.dania, { through: 'zamówienie_danie' })
	}
	*/
	
	return dania
}