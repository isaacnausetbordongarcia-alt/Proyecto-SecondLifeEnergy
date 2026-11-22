import { ExamAudit } from "./examaudit.model.js";
import { User } from "../users/user.model.js";

type Operation = "CREATE" | "MODIFY" | "READ" | null;

export class ExamAuditService {

  static async findAll() {
    return ExamAudit.findAll({ order: [["id", "ASC"]] });
  }


  static async findById(id: number) {
    return ExamAudit.findByPk(id);
  }


  static async create(data: {
    description: string;
    operation?: Operation;
    userId: number;
  }) {
    return ExamAudit.create(data);
  }


  static async update(
    examAudit: ExamAudit,
    data: Partial<{
      description: string;
      operation: Operation;
      userId: number;
    }>
  ) {
    return examAudit.update(data);
  }


  static async delete(examAudit: ExamAudit) {
    await examAudit.destroy();
  }


  static async findEagerById(id: number) {
    return ExamAudit.findByPk(id, {
      include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }],
    });
  }


  static async findOperationCreate() {
    return ExamAudit.findAll({
      where: { operation: "CREATE" },
      order: [["id", "ASC"]],
    });
  }
}