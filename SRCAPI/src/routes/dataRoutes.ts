import { Router, Request, Response} from 'express';
import dotenv from 'dotenv';
import { fetchQueryTorrent} from '../tools';

dotenv.config();
const router: Router = Router();
const passKey: string  = process.env.PASSKEY ?? "";

// fetch list of content
router.get('/fetchContent', async (req: Request, res: Response) => {
	try {
		const page: number = parseInt(req.query.page as string) || 1;
		const name: string = req.query.name as string || '';

		const content = await fetchQueryTorrent(page, name) || [];
		console.log(`✅ ${content.length.toString()} éléments trouvé pour la page ${page.toString()} et le nom ${name}`)
		res.json(content);
	} catch (err) {
		console.error('Erreur /fetchContent :', err);
		res.json([]);
	}
});

// dl .torrent
router.get('/downloadUrl', (req: Request, res: Response) => {
	try {
		const id: string = req.query.id as string || '';
		const result: { url: string } = { url: 'none' };

		if (id && passKey && passKey.length > 10) {
			result.url = `https://yggapi.eu/torrent/${id}/download?passkey=${passKey}`;
			console.log(`✅ url trouvé : ${result.url}`)
		} else {
			console.warn('❌ ID ou passkey invalide ou manquante');
		}
		res.json(result);
	} catch (err) {
		console.error('Erreur /downloadUrl :', err);
		res.json({ url: 'none' });
	}
});

export default router;