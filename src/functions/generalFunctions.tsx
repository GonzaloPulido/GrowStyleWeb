import { fetchImageById } from "../api/utils/imagenFunctions"

interface ImageObject {
    _id: string
    base64: string
}

export const base64topng = async (id: string) => {
    const imgObject: ImageObject = await fetchImageById(id)
    const {_id, base64} = imgObject
    const myResult = "data:image/png;base64,"+base64
    return myResult
}