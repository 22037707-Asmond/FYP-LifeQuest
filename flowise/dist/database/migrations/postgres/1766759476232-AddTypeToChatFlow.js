"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTypeToChatFlow1766759476232 = void 0;
class AddTypeToChatFlow1766759476232 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_flow" ADD COLUMN IF NOT EXISTS "type" TEXT;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_flow" DROP COLUMN "type";`);
    }
}
exports.AddTypeToChatFlow1766759476232 = AddTypeToChatFlow1766759476232;
//# sourceMappingURL=1766759476232-AddTypeToChatFlow.js.map