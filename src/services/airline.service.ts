import { AirlineRepository }
from '../repositories/airline.repository';

import { sanitizeAirline }
from '../utils/airline-sanitizer';

import { ApiError }
from '../utils/api-error';

const airlineRepository =
  new AirlineRepository();

export class AirlineService {

  async createAirline(
    data: any,
    actorId: string
  ) {

    const existing =
      await airlineRepository.findByCode(
        data.code.toUpperCase()
      );

    if (existing) {
      throw new ApiError(
        'Airline code already exists',
        400
      );
    }

    const airline =
      await airlineRepository.create(
        data,
        actorId
      );

    return sanitizeAirline(airline);
  }

  async getAirlines() {

    const airlines =
      await airlineRepository.findAllAirlines();

    return airlines.map(
      sanitizeAirline
    );
  }

  async updateAirline(
    id: string,
    data: any,
    actorId: string
  ) {

    const airline =
      await airlineRepository.update(
        id,
        data,
        actorId
      );

    if (!airline) {
      throw new ApiError(
        'Airline not found',
        404
      );
    }

    return sanitizeAirline(airline);
  }

  async deleteAirline(
    id: string,
    actorId: string
  ) {

    await airlineRepository.softDelete(
      id,
      actorId
    );
  }
}