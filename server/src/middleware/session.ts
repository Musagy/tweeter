// import { Users } from "@prisma/client";
import { NextFunction, Request, Response } from "express"
// import { RequestExt } from "../interfaces/req-ext";
import { verifyToken } from "../utils/jwtHandle"

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || ""
    const jwt = jwtByUser.split(" ").pop()
    const isUser = verifyToken(`${jwt}`) as { id: string }
    if (!isUser) {
      res.status(401)
      res.send("No tiene un JWT valido")
    } else {
      req.body.user = isUser.id
      next()
    }
  } catch (e) {
    res.status(400)
    res.send("Sección caducada o no valida")
  }
}

export { checkJwt }
