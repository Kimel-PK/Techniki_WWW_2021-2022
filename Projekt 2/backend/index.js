const express = require('express')
const app = express()
const cors = require('cors')

// naprawianie problemów z wysyłaniem formularzy
app.use(express.json())
// akceptowanie zapatań pochodzących z tego samego adresu
app.use(cors());

const db = require ('./models')

// routery
const restauracjeRouter = require ('./routes/restauracje')
app.use("/restauracje", restauracjeRouter);
const zamówieniaRouter = require ('./routes/zamowienia')
app.use("/zamowienia", zamówieniaRouter);

// jeśli nie istnieją utwórz wymagane tabele w bazie danych
db.sequelize.sync().then(() => {
	// uruchom serwer na porcie 3001
	app.listen(3001, () => {
		console.log("Uruchomiono serwer na porcie 3001");
	})
})