import { ClientRepository } from '../repositories/client.repository';

import { sanitizeClient } from '../utils/client-sanitizer';

const clientRepository = new ClientRepository();

export class ClientService {

  async createClient(
    data: any,
    actorId: string
  ) {

    const client =
      await clientRepository.create(
        data,
        actorId
      );

    return sanitizeClient(client);
  }

  async getClients(
    page: number,
    limit: number,
    search: string,
    clientType: string
  ) {

    const result =
      await clientRepository.findAllClients(
        page,
        limit,
        search,
        clientType
      );

    return {
      ...result,

      data: result.data.map(
        sanitizeClient
      ),
    };
  }

  async updateClient(
    id: string,
    data: any,
    actorId: string
  ) {

    const client =
      await clientRepository.update(
        id,
        data,
        actorId
      );

    return sanitizeClient(client);
  }

  async deleteClient(
    id: string,
    actorId: string
  ) {

    await clientRepository.softDelete(
      id,
      actorId
    );
  }
}