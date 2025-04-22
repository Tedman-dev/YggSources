import express, { Application } from 'express';
import dataRoute from '../routes/dataRoutes';

const app: Application = express();
const port: number = 1337;
app.use(express.json());
app.use('/api', dataRoute);

// start api
export function startAPI(): void {
	app.listen(port, '0.0.0.0',() => {
		console.log(`API en cours d'exécution sur le port : ${port}`);
	});
}
