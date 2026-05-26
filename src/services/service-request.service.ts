import { ServiceRequestRepository }
from '../repositories/service-request.repository';

import { sanitizeServiceRequest }
from '../utils/service-request-sanitizer';

import { generateRequestReference }
from '../utils/generate-request-reference';

import { ApiError }
from '../utils/api-error';

const repository =
  new ServiceRequestRepository();

export class ServiceRequestService {

  async create(
    data: any,
    actorId: string
  ) {

    data.request_reference =
      generateRequestReference();

    const request =
      await repository.create(
        data,
        actorId
      );

    return sanitizeServiceRequest(
      request
    );
  }

  async findAll(
    page: number,
    limit: number,
    search: string,
    status: string,
    serviceId: string
  ) {

    const result =
      await repository.findAllRequest(
        page,
        limit,
        search,
        status,
        serviceId
      );

    return {

      ...result,

      data: result.data.map(
        sanitizeServiceRequest
      ),
    };
  }

  async update(
    id: string,
    data: any,
    actorId: string
  ) {

    const existingRequest =
      await repository.findById(id);

    if (!existingRequest) {

      throw new ApiError(
        'Request not found',
        404
      );
    }

    /*
      Empêcher l'annulation
      d'un dossier déjà soldé
    */

    if (
      data.status === 'cancelled'
    ) {

      if (
        existingRequest.status
        === 'completed'
      ) {

        throw new ApiError(

          'Completed request cannot be cancelled',

          400
        );
      }

      if (
        Number(
          existingRequest.remaining_amount
        ) <= 0
      ) {

        throw new ApiError(

          'Paid request cannot be cancelled',

          400
        );
      }
    }

    const request =
      await repository.update(
        id,
        data,
        actorId
      );

    return sanitizeServiceRequest(
      request
    );
  }

  async delete(
    id: string,
    actorId: string
  ) {

    await repository.softDelete(
      id,
      actorId
    );
  }
}