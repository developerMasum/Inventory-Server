-- AlterTable
ALTER TABLE "houses" ADD COLUMN     "numberOfFreeRooms" INTEGER;

-- AlterTable
ALTER TABLE "nidinfo" ALTER COLUMN "nidFrontImage" DROP NOT NULL,
ALTER COLUMN "nidBackImage" DROP NOT NULL;
