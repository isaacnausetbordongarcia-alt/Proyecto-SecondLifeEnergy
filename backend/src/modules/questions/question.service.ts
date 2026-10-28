import { Question } from "./question.model.js";
import { Category } from "../categories/category.model";
import { User } from "../users/user.model.js";
import { Answer } from "../answers/answer.model.js";

export class QuestionService {

  static async findAll() {
    return Question.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return Question.findByPk(id);
  }


  static async create(data: {
    categoryId: number;
    authorId: number;
    acceptedAnswerId?: number | null;
    title: string;
    content: string;
    status: string;
  }) {
    return Question.create(data);
  }


  static async update(
    question: Question,
    data: Partial<{
      categoryId: number;
      authorId: number;
      acceptedAnswerId: number | null;
      title: string;
      content: string;
      status: string;
    }>
  ) {
    return question.update(data);
  }


  static async delete(question: Question) {
    await question.destroy();
  }

  static async findEagerById(id: number) {
    return Question.findByPk(id, {
      include: [
        { model: Category, as: "category" },
        { model: User, as: "author" },
        { model: Answer, as: "acceptedAnswer" },
      ],
    });
  }
}