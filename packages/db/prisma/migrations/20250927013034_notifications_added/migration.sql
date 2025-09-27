/*
  Warnings:

  - Added the required column `subTitle` to the `Notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Notifications" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "subTitle" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
