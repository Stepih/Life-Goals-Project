-- AlterTable
ALTER TABLE "Goal" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "description" TEXT;
