import { User } from "../modules/users/user.model.js";
import { Role } from "../modules/roles/role.model.js";
import { UserRole } from "../modules/userRole/userRole.model.js";

export function defineAssociations() {
    User.hasMany(UserRole, { foreignKey: "userId", as: "userRoles" });
    UserRole.belongsTo(User, { foreignKey: "userId", as: "user" });
    Role.hasMany(UserRole, { foreignKey: "roleId", as: "userRoles" });
    UserRole.belongsTo(Role, { foreignKey: "roleId", as: "role" });
    User.belongsToMany(Role, {through: UserRole, foreignKey: "userId", otherKey: "roleId"});
    Role.belongsToMany(User, {through: UserRole, foreignKey: "roleId", otherKey: "userId"});
}
