// TODO: create a controller to send the data of uploaded cat
// to the client
// data to send is described in UploadMessageResponse interface
import {Point} from 'geojson';
import {Request, Response, NextFunction} from 'express';
import CustomError from '../../classes/CustomError';

const catPost = async (
  req: Request<{}, {}, {}, {}, {coords: Point}>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      const err = new CustomError('file not valid', 400);
      throw err;
    }

    const response = {
      message: 'cat uploaded',
      data: {
        filename: req.file.filename,
        location: res.locals.coords,
      },
    };

    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 400));
  }
};

export {catPost};
