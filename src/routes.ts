import express, { type Response, type Request, type Application } from 'express';

export const routesApp = (app: Application) => {
  const router = express.Router()

  app.use('/', router)
  router.get('/', (request: Request, response: Response) =>
    response.status(200).send('API OK')
  )

}