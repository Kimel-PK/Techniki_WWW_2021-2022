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
	
	dania.associate = (models) => {
		dania.hasMany(models.menu, {
			foreignKey: 'id_danie'
		})
		models.menu.belongsTo(dania, {
			foreignKey: 'id_danie',
			as: 'danie'
		})
		dania.hasMany(models.zamówienie_danie, {
			foreignKey: 'id_danie'
		})
	}
	
	return dania
}