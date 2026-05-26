import { CautionRepository }
from '../repositories/caution.repository';

import { ContractRepository }
from '../repositories/contract.repository';

import { sanitizeCaution }
from '../utils/caution-sanitizer';

import { ApiError }
from '../utils/api-error';

const cautionRepository =
  new CautionRepository();

const contractRepository =
  new ContractRepository();

export class CautionService {

  async createCaution(
    data: any,
    actorId: string
  ) {

    const contract =
      await contractRepository.findById(
        data.contract_id
      );

    if (!contract) {

      throw new ApiError(
        'Contract not found',
        404
      );
    }

    if (
      contract.contract_type
      !== 'caution_only'
      &&
      contract.contract_type
      !== 'caution_stock'
    ) {

      throw new ApiError(
        'Only caution_only and caution_stock contracts can have cautions',
        400
      );
    }

    const caution =
      await cautionRepository.create(
        data,
        actorId
      );

    return sanitizeCaution(caution);
  }

  async getCautions(
    page: number,
    limit: number,
    search: string,
    contractType: string
  ) {

    const result =
      await cautionRepository.findAllCautions(
        page,
        limit,
        search,
        contractType
      );

    return {
      ...result,

      data: result.data.map(
        sanitizeCaution
      ),
    };
  }

  async updateCaution(
    id: string,
    data: any,
    actorId: string
  ) {

    if (
      data.amount_remaining !== undefined
      &&
      data.amount_remaining <= 0
    ) {

      data.is_active = false;

      data.amount_remaining = 0;
    }

    const caution =
      await cautionRepository.update(
        id,
        data,
        actorId
      );

    if (!caution) {

      throw new ApiError(
        'Caution not found',
        404
      );
    }

    return sanitizeCaution(caution);
  }

  async deleteCaution(
    id: string,
    actorId: string
  ) {

    await cautionRepository.softDelete(
      id,
      actorId
    );
  }
}