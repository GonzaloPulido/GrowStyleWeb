import { NextApiRequest, NextApiResponse } from "next"

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest,res: NextApiResponse) => {
    res.json("Hola que tal ID")
    const {method} = req

    if (method === "GET"){
        return res.status(200).json("Obteniendo usuario")
    } else if (method === "PUT") {
        return res.status(200).json("Actualizando usuario")
    } else if (method === "DELETE") {
        return res.status(200).json("Borrando usuario")
    } else {
        return res.status(400).json("Error")
    }
 }