import { Request, Response } from "express";
import { getRepository } from "typeorm";

import Orphanages from "../models/Orphanage";
export default {
  async index(request: Request, response: Response) {
    try {
      const orphanagesRepository = getRepository(Orphanages);
      const orphanages = await orphanagesRepository.find();
      return response.json(orphanages);
    } catch (err) {
      return response.status(400).json({
        message: "Houve um erro ao usar a rota",
      });
    }
  },
  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const orphanagesRepository = getRepository(Orphanages);
      const orphanages = await orphanagesRepository.findOneOrFail(id);
      return response.json(orphanages);
    } catch (err) {
      return response.status(400).json({
        message: "Houve um erro ao usar a rota",
      });
    }
  },
  async create(request: Request, response: Response) {
    try {
      const {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
      } = request.body;

      const orphanagesRepository = getRepository(Orphanages);

      const requestImages = request.files as Express.Multer.File[];
      const images = requestImages.map((image) => {
        return { path: image.filename };
      });

      const data = {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
        images,
      };

      const orphange = orphanagesRepository.create(data);

      await orphanagesRepository.save(orphange);

      return response.status(200).json(data);
    } catch (err) {
      console.log(err);
      return response.json("error");
    }
  },
};
