import { ServiceRepository }
from '../repositories/service.repository';

import { sanitizeService }
from '../utils/service-sanitizer';

import { generateInitial }
from '../utils/generate-initial';

import { ApiError }
from '../utils/api-error';

const serviceRepository =
  new ServiceRepository();

export class ServiceService {

  async createService(
    data: any,
    actorId: string
  ) {

    let initial =
      generateInitial(data.name);

    const existing =
      await serviceRepository.findByInitial(
        initial
      );

    if (existing) {
      initial =
        `${initial}${Date.now()
          .toString()
          .slice(-2)}`;
    }

    const service =
      await serviceRepository.create(
        {
          ...data,
          initial,
        },
        actorId
      );

    return sanitizeService(service);
  }

  async getServices() {

    const services =
      await serviceRepository.findAllServices();

    return services.map(
      sanitizeService
    );
  }

  async updateService(
    id: string,
    data: any,
    actorId: string
  ) {

    const service =
      await serviceRepository.update(
        id,
        data,
        actorId
      );

    if (!service) {
      throw new ApiError(
        'Service not found',
        404
      );
    }

    return sanitizeService(service);
  }

  async deleteService(
    id: string,
    actorId: string
  ) {

    await serviceRepository.softDelete(
      id,
      actorId
    );
  }
}