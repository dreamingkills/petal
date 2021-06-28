/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `West` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Test";

-- DropTable
DROP TABLE "West";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "locale" TEXT NOT NULL DEFAULT E'en',

    PRIMARY KEY ("id")
);
