import JOI from 'joi';
import 'text-encoding-polyfill'


// la librairie joi va permmettre d'effectuer des tests

export const schemaEtudiant = JOI.object({
    nom : JOI.string().min(3).max(255).required(),
    age: JOI.number().min(3).max(255).required(),
    email: JOI.string().email({ tlds: {allow : false} }).required(),
})
 