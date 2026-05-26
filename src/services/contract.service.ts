import { ContractRepository }
from '../repositories/contract.repository';

import { sanitizeContract }
from '../utils/contract-sanitizer';

import { ApiError }
from '../utils/api-error';

const contractRepository =
  new ContractRepository();

export class ContractService {

  async createContract(
    data: any,
    actorId: string
  ) {

    const contract =
      await contractRepository.create(
        data,
        actorId
      );

    return sanitizeContract(contract);
  }

  async getContracts(
    page: number,
    limit: number,
    search: string,
    status: string,
    contractType: string
    ) {

    const result =
        await contractRepository.findAllContracts(
            page,
            limit,
            search,
            status,
            contractType
        );

        return {
        ...result,

        data: result.data.map(
            sanitizeContract
        ),
    };
  }

  async updateContract(
    id: string,
    data: any,
    actorId: string
  ) {

    const contract =
      await contractRepository.update(
        id,
        data,
        actorId
      );

    if (!contract) {
      throw new ApiError(
        'Contract not found',
        404
      );
    }

    return sanitizeContract(contract);
  }

  async deleteContract(
    id: string,
    actorId: string
  ) {

    await contractRepository.softDelete(
      id,
      actorId
    );
  }
}