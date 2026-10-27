
import { ArticleCategory } from "../modules/articleCategories/articleCategory.model.js";
import { ArticleReview } from "../modules/articleReviews/articleReview.model.js";
import { Moderation } from "../modules/moderations/moderation.model.js";
import { Question } from "../modules/questions/question.model.js";
import { Answer } from "../modules/answers/answer.model.js";
import { SimulationResource } from "../modules/simulationResources/simulationResource.model.js";
import { ForumCategory } from "../modules/forumCategories/forumCategory.model.js";
import { Resource } from "../modules/resources/resource.model.js";
import { Simulation } from "../modules/simulations/simulation.model.js";

export function defineAssociations() {


    // ---------- (ArticleCategory) ----------
ArticleCategory.hasMany(Article, {
    foreignKey: "categoryId",
    as: "articles"
});

Article.belongsTo(ArticleCategory, {
    foreignKey: "categoryId",
    as: "category"
});

ArticleCategory.hasMany(ArticleCategory, {
    foreignKey: "parentCategoryId",
    as: "subcategories"
});

ArticleCategory.belongsTo(ArticleCategory, {
    foreignKey: "parentCategoryId",
    as: "parentCategory"
});


// ---------- (ArticleReview) ----------
Article.hasMany(ArticleReview, {
    foreignKey: "articleId",
    as: "reviews"
});

ArticleReview.belongsTo(Article, {
    foreignKey: "articleId",
    as: "article"
});

User.hasMany(ArticleReview, {
    foreignKey: "reviewerId",
    as: "articleReviews"
});

ArticleReview.belongsTo(User, {
    foreignKey: "reviewerId",
    as: "reviewer"
});


// ---------- (Question) ----------
ForumCategory.hasMany(Question, {
    foreignKey: "categoryId",
    as: "questions"
});

Question.belongsTo(ForumCategory, {
    foreignKey: "categoryId",
    as: "category"
});

User.hasMany(Question, {
    foreignKey: "authorId",
    as: "questions"
});

Question.belongsTo(User, {
    foreignKey: "authorId",
    as: "author"
});


// ---------- (Answer) ----------
Question.hasMany(Answer, {
    foreignKey: "questionId",
    as: "answers"
});

Answer.belongsTo(Question, {
    foreignKey: "questionId",
    as: "question"
});

User.hasMany(Answer, {
    foreignKey: "authorId",
    as: "answers"
});

Answer.belongsTo(User, {
    foreignKey: "authorId",
    as: "author"
});

// Respuesta aceptada de una pregunta
Question.belongsTo(Answer, {
    foreignKey: "acceptedAnswerId",
    as: "acceptedAnswer"
});

Answer.hasMany(Question, {
    foreignKey: "acceptedAnswerId",
    as: "acceptedForQuestions"
});


// ---------- (Moderation) ----------
User.hasMany(Moderation, {
    foreignKey: "moderatorId",
    as: "moderations"
});

Moderation.belongsTo(User, {
    foreignKey: "moderatorId",
    as: "moderator"
});

Question.hasMany(Moderation, {
    foreignKey: "questionId",
    as: "moderations"
});

Moderation.belongsTo(Question, {
    foreignKey: "questionId",
    as: "question"
});

Answer.hasMany(Moderation, {
    foreignKey: "answerId",
    as: "moderations"
});

Moderation.belongsTo(Answer, {
    foreignKey: "answerId",
    as: "answer"
});


// ---------- (SimulationResource) ----------
Simulation.belongsToMany(Resource, {
    through: SimulationResource,
    foreignKey: "simulationId",
    otherKey: "resourceId",
    as: "resources"
});

Resource.belongsToMany(Simulation, {
    through: SimulationResource,
    foreignKey: "resourceId",
    otherKey: "simulationId",
    as: "simulations"
});

Simulation.hasMany(SimulationResource, {
    foreignKey: "simulationId",
    as: "simulationResources"
});

SimulationResource.belongsTo(Simulation, {
    foreignKey: "simulationId",
    as: "simulation"
});

Resource.hasMany(SimulationResource, {
    foreignKey: "resourceId",
    as: "simulationResources"
});

SimulationResource.belongsTo(Resource, {
    foreignKey: "resourceId",
    as: "resource"
});
}