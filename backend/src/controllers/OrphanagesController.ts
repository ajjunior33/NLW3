import { Request, Response } from "express";
import { getRepository } from "typeorm";

import Orphanages from "../models/Orphanage";
import orphanageView from "../views/Orphanages_view";

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanages);
    const orphanages = await orphanagesRepository.find({
      relations: ["images"],
    });

    return response.json(orphanageView.renderMany(orphanages));
  },
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const orphanagesRepository = getRepository(Orphanages);
    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ["images"],
    });
    return response.json(orphanageView.render(orphanage));
  },
  async create(request: Request, response: Response) {
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
  },
};
