import { NextApiRequest, NextApiResponse } from "next"

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest,res: NextApiResponse) => {
    const {method} = req

    if (method === "GET"){
        return res.status(200).json("Obteniendo usuarios")
    } else if (method === "POST") {
        return res.status(200).json("Creando usuarios")
    } else if (method === "PUT") {
        return res.status(200).json("Actualizando usuarios")
    } else if (method === "DELETE") {
        return res.status(200).json("Borrando usuarios")
    } else {
        return res.status(400).json("Error")
    }
 }