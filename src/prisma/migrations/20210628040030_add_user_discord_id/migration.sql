/*
  Warnings:

  - Added the required column `discord_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "discord_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "discord_id" ON "User"("discord_id");
