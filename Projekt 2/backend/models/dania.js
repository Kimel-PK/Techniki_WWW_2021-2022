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
	
	return dania
}