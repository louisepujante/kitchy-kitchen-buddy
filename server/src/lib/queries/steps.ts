import { Prisma } from "@prisma/client";

export const selectSteps = Prisma.validator<Prisma.StepsSelect>()({
    id: true,
    order: true,
    description: true,
    duration: true
})