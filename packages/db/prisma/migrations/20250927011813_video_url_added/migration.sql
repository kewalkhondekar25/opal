/*
  Warnings:

  - Added the required column `url` to the `Videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Videos" ADD COLUMN     "url" TEXT NOT NULL;
