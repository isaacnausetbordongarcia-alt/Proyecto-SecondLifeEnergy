"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // Para que caduque en 7 días

    await queryInterface.bulkInsert("invitations", [
      { invited_by_id: 1, role_id: 1, email: "user1@example.com", token_hash: "hash-pendiente-user1", expires_at: expiresAt, used_at: null, created_at: now },
      { invited_by_id: 2, role_id: 2, email: "user2@example.com", token_hash: "hash-pendiente-user2", expires_at: expiresAt, used_at: null, created_at: now },
      { invited_by_id: 3, role_id: 3, email: "user3@example.com", token_hash: "hash-pendiente-user3", expires_at: expiresAt, used_at: null, created_at: now },
      { invited_by_id: 4, role_id: 4, email: "user4@example.com", token_hash: "hash-pendiente-user4", expires_at: expiresAt, used_at: null, created_at: now },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("invitations", null, {});
  },
};