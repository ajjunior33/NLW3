import express from "express";

import routes from './routes';
/*FILES IMPORT  */
import "./database/connection";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);
