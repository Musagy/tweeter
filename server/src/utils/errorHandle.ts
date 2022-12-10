import { Response } from "express";

// Esta función es para que evitar los errores del servidor
const handleHttp = (res: Response, error: string, errorRaw?: any) => {
  console.log(errorRaw);
  res.status(500);
  res.send({ error });
};

export { handleHttp };