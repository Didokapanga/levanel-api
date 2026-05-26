import { StockRepository }
from '../repositories/stock.repository';

import { sanitizeStock }
from '../utils/stock-sanitizer';

import { ApiError }
from '../utils/api-error';
import { ContractRepository } from '../repositories/contract.repository';

const stockRepository =
  new StockRepository();

const contractRepository =
  new ContractRepository();

export class StockService {

  async createStock(
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
        !== 'caution_stock'
    ) {

        throw new ApiError(
        'Only caution_stock contracts can have stocks',
        400
        );
    }

    const stock =
        await stockRepository.create(
        data,
        actorId
        );

    return sanitizeStock(stock);
    }

  async getStocks(
    page: number,
    limit: number,
    search: string,
    contractType: string
  ) {

    const result =
      await stockRepository.findAllStocks(
        page,
        limit,
        search,
        contractType
      );

    return {
      ...result,

      data: result.data.map(
        sanitizeStock
      ),
    };
  }

  async updateStock(
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

    const stock =
      await stockRepository.update(
        id,
        data,
        actorId
      );

    if (!stock) {
      throw new ApiError(
        'Stock not found',
        404
      );
    }

    return sanitizeStock(stock);
  }

  async deleteStock(
    id: string,
    actorId: string
  ) {

    await stockRepository.softDelete(
      id,
      actorId
    );
  }
}