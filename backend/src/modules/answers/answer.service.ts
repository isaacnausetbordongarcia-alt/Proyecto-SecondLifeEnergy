import { Answer } from "./answer.model.js";
import { Question } from "../questions/question.model.js";
import { User } from "../users/user.model.js";

export class AnswerService {

  static async findAll() {
    return Answer.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return Answer.findByPk(id);
  }


  static async create(data: {
    questionId: number;
    authorId: number;
    content: string;
    status: string;
  }) {
    return Answer.create(data);
  }


  static async update(
    answer: Answer,
    data: Partial<{
      questionId: number;
      authorId: number;
      content: string;
      status: string;
    }>
  ) {
    return answer.update(data);
  }


  static async delete(answer: Answer) {
    await answer.destroy();
  }

  static async findEagerById(id: number) {
    return Answer.findByPk(id, {
      include: [
        { model: Question, as: "question" },
        { model: User, as: "author" },
      ],
    });
  }
}