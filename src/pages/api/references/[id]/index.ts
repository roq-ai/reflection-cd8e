import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { referenceValidationSchema } from 'validationSchema/references';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.reference
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getReferenceById();
    case 'PUT':
      return updateReferenceById();
    case 'DELETE':
      return deleteReferenceById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getReferenceById() {
    const data = await prisma.reference.findFirst(convertQueryToPrismaUtil(req.query, 'reference'));
    return res.status(200).json(data);
  }

  async function updateReferenceById() {
    await referenceValidationSchema.validate(req.body);
    const data = await prisma.reference.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteReferenceById() {
    const data = await prisma.reference.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
