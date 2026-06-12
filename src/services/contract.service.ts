import { ContractRepository }
from '../repositories/contract.repository';

import { sanitizeContract }
from '../utils/contract-sanitizer';

import { ApiError }
from '../utils/api-error';
import { db } from '../database/connection';

const contractRepository =
  new ContractRepository();

export class ContractService {

  async createContract(
    data: any,
    actorId: string
  ) {

    const client =
      await db.connect();

    try {

      await client.query(
        'BEGIN'
      );

      const contract =
        await contractRepository.create(
          data,
          actorId,
          client
        );

      await client.query(
        'COMMIT'
      );

      return sanitizeContract(
        contract
      );

    } catch (error) {

      await client.query(
        'ROLLBACK'
      );

      throw error;

    } finally {

      client.release();
    }
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

    const client =
      await db.connect();

    try {

      await client.query(
        'BEGIN'
      );

      const contract =
        await contractRepository.update(
          id,
          data,
          actorId,
          client
        );

      if (!contract) {

        throw new ApiError(
          'Contract not found',
          404
        );
      }

      await client.query(
        'COMMIT'
      );

      return sanitizeContract(
        contract
      );

    } catch (error) {

      await client.query(
        'ROLLBACK'
      );

      throw error;

    } finally {

      client.release();
    }
  }

  async deleteContract(
    id: string,
    actorId: string
  ) {

    const client =
      await db.connect();

    try {

      await client.query(
        'BEGIN'
      );

      const contract =
        await contractRepository.findById(
          id,
          client
        );

      if (!contract) {

        throw new ApiError(
          'Contract not found',
          404
        );
      }

      await contractRepository
        .softDelete(
          id,
          actorId,
          client
        );

      await client.query(
        'COMMIT'
      );

    } catch (error) {

      await client.query(
        'ROLLBACK'
      );

      throw error;

    } finally {

      client.release();
    }
  }
}