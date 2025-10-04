-- CreateEnum
CREATE TYPE "public"."TrackStatus" AS ENUM ('TRANSCODING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "public"."Tracks" ADD COLUMN     "status" "public"."TrackStatus";
