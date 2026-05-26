import { PartnerRepository }
from '../repositories/partner.repository';

import { sanitizePartner }
from '../utils/partner-sanitizer';

import { ApiError }
from '../utils/api-error';

const partnerRepository =
  new PartnerRepository();

export class PartnerService {

  async createPartner(
    data: any,
    actorId: string
  ) {

    const partner =
      await partnerRepository.create(
        data,
        actorId
      );

    return sanitizePartner(partner);
  }

  async getPartners() {

    const partners =
      await partnerRepository.findAllPartners();

    return partners.map(
      sanitizePartner
    );
  }

  async updatePartner(
    id: string,
    data: any,
    actorId: string
  ) {

    const partner =
      await partnerRepository.update(
        id,
        data,
        actorId
      );

    if (!partner) {
      throw new ApiError(
        'Partner not found',
        404
      );
    }

    return sanitizePartner(partner);
  }

  async deletePartner(
    id: string,
    actorId: string
  ) {

    await partnerRepository.softDelete(
      id,
      actorId
    );
  }
}