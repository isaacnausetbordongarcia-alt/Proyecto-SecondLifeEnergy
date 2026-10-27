import { Moderation } from "./moderation.model.js";
import { Question } from "../questions/question.model.js";
import { Answer } from "../answers/answer.model.js";

export class ModerationService {

  static async findAll() {
    return Moderation.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return Moderation.findByPk(id);
  }


  static async create(data: {
    moderatorId: number;
    questionId?: number | null;
    answerId?: number | null;
    action: string;
    reason?: string | null;
  }) {
    return Moderation.create(data);
  }


  static async update(
    moderation: Moderation,
    data: Partial<{
      moderatorId: number;
      questionId: number | null;
      answerId: number | null;
      action: string;
      reason: string | null;
    }>
  ) {
    return moderation.update(data);
  }


  static async delete(moderation: Moderation) {
    await moderation.destroy();
  }

  static async findEagerById(id: number) {
    return Moderation.findByPk(id, {
      include: [
        { model: Moderator, as: "moderator" },
        { model: Question, as: "question" },
        { model: Answer, as: "answer" },
      ],
    });
  }
}