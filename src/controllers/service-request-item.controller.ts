import { Response  }
from 'express';

import { AuthRequest }
from '../types/express';

import { ServiceRequestItemService }
from '../services/service-request-item.service';

import { asyncHandler }
from '../utils/async-handler';

import { successResponse }
from '../utils/response';

const service =
  new ServiceRequestItemService();

export class ServiceRequestItemController {

    create = asyncHandler(
        async (
            req: AuthRequest,
            res: Response
        ) => {

            try {

            const item =
                await service.create(
                req.body,
                req.user.id
                );

            return successResponse(
                res,
                item,
                'Item created successfully',
                201
            );

            } catch (error) {

            console.error(error);

            throw error;
            }
        }
    );

    createModification = asyncHandler(
        async (
            req: AuthRequest,
            res: Response
        ) => {

            const item =
            await service.createModification(
                req.body,
                req.user.id
            );

            return successResponse(
            res,
            item,
            'Modification created successfully',
            201
            );
        }
    );

    createCancellation = asyncHandler(
        async (
            req: AuthRequest,
            res: Response
        ) => {

            const item =
            await service.createCancellation(
                req.body,
                req.user.id
            );

            return successResponse(
            res,
            item,
            'Cancellation created successfully',
            201
            );
        }
    );

    update = asyncHandler(
    async (
        req: AuthRequest,
        res: Response
    ) => {

        const item =
        await service.update(
            req.params.id as string,
            req.body,
            req.user.id
        );

        return successResponse(
        res,
        item,
        'Item updated successfully'
        );
    }
    );

    delete = asyncHandler(
    async (
        req: AuthRequest,
        res: Response
    ) => {

        await service.delete(
        req.params.id as string,
        req.user.id
        );

        return successResponse(
        res,
        null,
        'Item deleted successfully'
        );
    }
    );

    findAll = asyncHandler(
    async (
        req: AuthRequest,
        res: Response
    ) => {

        const page =
        Number(req.query.page) || 1;

        const limit =
        Number(req.query.limit) || 10;

        const search =
        (req.query.search as string)
        || '';

        const requestReference =
        (req.query.request_reference as string)
        || '';

        const items =
        await service.findAll(
            page,
            limit,
            search,
            requestReference
        );

        return successResponse(
        res,
        items,
        'Items retrieved successfully'
        );
    }
    );

    getByRequest = asyncHandler(
        async (
            req: AuthRequest,
            res: Response
        ) => {

            const items =
            await service.findByRequestId(
                req.params.id as string
            );

            return successResponse(
            res,
            items,
            'Items retrieved successfully'
            );
        }
    );
}