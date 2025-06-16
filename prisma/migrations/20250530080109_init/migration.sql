-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "priority" TEXT NOT NULL DEFAULT 'min';

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "priority" TEXT NOT NULL DEFAULT 'min';
