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
		kod: {
			type: DataTypes.STRING,
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