module.exports = (sequelize, DataTypes) => {
	
	const zamówienia = sequelize.define("zamówienia", {
		kod: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		miasto: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ulica: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		numer_mieszkania: {
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
		}
	},
	{
		tableName: 'zamówienia',
		timestamps: false
	})
	
	zamówienia.associate = (models) => {
		zamówienia.belongsTo(models.restauracje, {
			foreignKey: 'id_restauracja',
			as: 'restauracja'
		})
		zamówienia.belongsTo(models.użytkownicy, {
			foreignKey: 'id_kurier',
			as: 'kurier'
		})
	}
	
	return zamówienia
}