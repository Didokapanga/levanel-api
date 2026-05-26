import { SystemRepository }
from '../repositories/system.repository';

import { sanitizeSystem }
from '../utils/system-sanitizer';

import { ApiError }
from '../utils/api-error';

const systemRepository =
  new SystemRepository();

export class SystemService {

  async createSystem(
    data: any,
    actorId: string
  ) {

    const existing =
      await systemRepository.findByInitial(
        data.initial.toUpperCase()
      );

    if (existing) {
      throw new ApiError(
        'Initial already exists',
        400
      );
    }

    const system =
      await systemRepository.create(
        data,
        actorId
      );

    return sanitizeSystem(system);
  }

  async getSystems() {

    const systems =
      await systemRepository.findAllSystems();

    return systems.map(
      sanitizeSystem
    );
  }

  async updateSystem(
    id: string,
    data: any,
    actorId: string
  ) {

    const system =
      await systemRepository.update(
        id,
        data,
        actorId
      );

    if (!system) {
      throw new ApiError(
        'System not found',
        404
      );
    }

    return sanitizeSystem(system);
  }

  async deleteSystem(
    id: string,
    actorId: string
  ) {

    await systemRepository.softDelete(
      id,
      actorId
    );
  }
}