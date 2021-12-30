module.exports = (sequelize, DataTypes) => {
	
	const restauracje = sequelize.define("restauracje", {
		nazwa: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		opis: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		miasto: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		ulica: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		numer_lokalu: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		id_menu: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
	},
	{
		tableName: 'restauracje'
	})
	
	return restauracje
}